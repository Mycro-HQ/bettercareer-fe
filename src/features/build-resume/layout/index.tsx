import React, { useCallback, useEffect, useMemo } from 'react';
import { DropdownMenu } from '@radix-ui/themes';
import Link from 'next/link';
import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import Router, { useRouter } from 'next/router';

import { BuildResumePreview } from '../view/build-resume-preview/';
import { BuildResumePane } from '../view/build-resume-pane';
import { Modal } from '@labs/components/modal';
import { Field } from '@labs/components/field';
import { templatesConfig } from '../view/build-resume-preview/view/resume-blocks/utils';

import {
	CallToAction,
	Flex,
	Heading,
	Text,
	useFeedback,
} from '@labs/components';
import { MODULES, useBuildStore } from '@/store/z-store/builder';
import {
	downloadResume,
	isEmpty,
	slugify,
	truncateText,
	useDebounce,
} from '@labs/utils';
import Sparkles from '@labs/icons/misc/sparkels.svg';
import ArrowDown from '@labs/icons/dashboard/down.svg';
import FileIcon from '@labs/icons/dashboard/file.svg';
import Logo from '@labs/icons/logo.svg';
import More from '@labs/icons/misc/more.svg';
import {
	useCreateOrEditResumeMutation,
	useDeleteResumeMutation,
	useDuplicateResumeMutation,
} from '@/queries/resume';
import { ProgressLoader } from '@/components/misc/loader';
import { ResumeAnalysis } from '@/features/dashboard';

import styles from './layout.module.scss';

export const BuildResumeLayout = ({ resume }: { resume: any }) => {
	const router = useRouter();
	const previewRef = React.useRef(null);
	const slug = useMemo(
		() => (router.query.slug as string[])?.[1],
		[router.query.slug]
	);

	const { createDisclosure, createToast } = useFeedback();
	const {
		resumeBlob,
		setModules,
		setTemplate,
		modules: blocks,
		template,
	} = useBuildStore();

	const { mutateAsync: deleteResume } = useDeleteResumeMutation();
	const {
		mutateAsync: createOrUpdateResume,
		isPending,
		isError,
	} = useCreateOrEditResumeMutation();
	const { mutateAsync: duplicateResume } = useDuplicateResumeMutation();
	const [showAnalysis, setShowAnalysis] = React.useState(false);
	const [showPreview, setShowPreview] = React.useState(false);
	const [showSidebar, setShowSidebar] = React.useState(false);
	const [isSettingInitialData, setIsSettingInitialData] = React.useState(false);
	const [showRename, setShowRename] = React.useState(false);
	const [isGettingAnalysis, setIsGettingAnalysis] = React.useState(false);
	const [resumeName, setResumeName] = React.useState(
		resume?.name || 'Untitled Resume'
	);

	const handleDelete = async () => {
		await createDisclosure({
			message: 'Are you sure you want to delete this resume?',
			title: 'Delete Resume',
		});
		try {
			await deleteResume(slug);
			router.push('/dashboard');
		} catch (error) {
			createToast({
				message: 'An error occurred while deleting the resume',
				variant: 'error',
			});
		}
	};

	const handleShowAnalysisHistory = useCallback(() => {
		setShowAnalysis(true);
	}, []);

	const handleDuplicate = async () => {
		await createDisclosure({
			message: 'Duplicating this resume will create a new copy of the resume',
			title: 'Duplicate Resume',
			confirmText: 'Duplicate',
		});
		try {
			const res = await duplicateResume(slug);

			window.location.replace(`/dashboard/resume/b/${res.data.id}`);
			createToast({
				message: 'Resume duplicated successfully',
				variant: 'primary',
			});
		} catch (error) {
			createToast({
				message: 'An error occurred while duplicating the resume',
				variant: 'error',
			});
		}
	};

	const handleDefault = async () => {
		await createDisclosure({
			message: 'This resume will be the default for all applications',
			title: 'Set as Default Resume',
			confirmText: 'Confirm',
		});
		try {
			await handleDoc({ default: true });

			createToast({
				message: 'Resume set as default successfully',
				variant: 'primary',
			});
		} catch (error) {
			createToast({
				message: 'An error occurred while setting the default resume',
				variant: 'error',
			});
		}
	};

	const convertDataToModules = useCallback(async () => {
		const defaultData = MODULES;
		setIsSettingInitialData(true);

		const initialData = await Object.keys(resume || {})?.reduce(
			(acc: any, curr: any) => {
				if (acc?.find((item: any) => item.key === curr)) {
					acc = acc.map((item: any) =>
						item.key === curr
							? {
									...item,
									data: resume[curr],
								}
							: item
					);
				}

				if (curr === 'extras') {
					acc.push(...resume[curr]);
				}

				if (curr === 'heading') {
					if (
						typeof resume[curr]?.subHeading === 'object' &&
						!Array.isArray(resume[curr]?.subHeading)
					) {
						acc.push({
							key: 'heading',
							data: {
								...resume[curr],
								subHeading: Object.values(resume[curr]?.subHeading || []).map(
									(i) => ({
										value: i,
									})
								),
							},
						});
					}
				}

				return acc;
			},
			defaultData
		);

		setModules(initialData);
		if (resume?.template) {
			setTemplate(resume?.template);
		}
		setIsSettingInitialData(false);
	}, [resume, setModules, setTemplate]);

	React.useEffect(() => {
		if (router.query.analysis === 'true') {
			setShowAnalysis(true);
		}
	}, [router.query.analysis]);

	React.useEffect(() => {
		if (resume?.id) {
			convertDataToModules();
		}

		return () => {
			setModules(MODULES);
			setTemplate(templatesConfig[0]);
		};
	}, []);

	const hasData = useMemo(() => {
		return blocks.find(
			(module: any) =>
				!isEmpty(module.data) &&
				Object.values(module.data || {}).reduce(
					(a: any, b: any) => a?.toString() + b?.toString(),
					''
				)
		);
	}, [blocks]);

	const handleDoc = useCallback(
		async (innerData?: any) => {
			// prevent saving if there is no data

			if (isSettingInitialData) return;
			if (hasData) {
				const extras: any = [];
				const convertBackToData = blocks.reduce((acc, block) => {
					// make sure any key that starts with new_section is removed and added to the extras array
					if (block.key.startsWith('new_section')) {
						extras.push({
							key: block.key,
							title: block.title,
							data: block.data,
						});

						return acc;
					}

					// run a recursive check to see if the block has any nested data.value and convert it to [key]: value
					const recursiveCheck = (
						data: any,
						key: string
					):
						| string
						| number
						| boolean
						| null
						| Record<string, any>
						| Array<any> => {
						if (typeof data?.value !== 'undefined') {
							if (data.value === null) {
								return null;
							}
							return data.value.toString();
						}

						if (Array.isArray(data)) {
							return data.map((item) => {
								if (Array.isArray(item?.value) || key === 'skills') {
									return {
										...item,
										value: Array.isArray(item.value)
											? item.value.map(
													(i: { value: string | number | boolean | null }) => {
														if (i?.value) {
															return i.value.toString();
														}

														return i;
													}
												)
											: [item.value],
									};
								}

								return recursiveCheck(item, key);
							});
						}

						const isDate = data instanceof Date;

						if (typeof data === 'object' && !isDate) {
							if (isEmpty(data)) return null;

							return Object.keys(data).reduce((a: any, b) => {
								a[b as keyof typeof a] = recursiveCheck(data[b], key);
								return a;
							}, {});
						}

						return data;
					};

					return {
						...acc,
						extras,
						[block.key]: recursiveCheck(block.data, block.key),
					};
				}, {});

				const res = await createOrUpdateResume({
					...((slug !== 'new' && { id: slug }) || {}),
					...convertBackToData,
					...innerData,
					...(resumeBlob?.thumbnail && { thumbnail: resumeBlob?.thumbnail }),
					template,
				});

				if (res?.data && slug === 'new') {
					Router.replace(`/dashboard/resume/b/${res?.data?.id}`);
				}
			}
		},
		[
			blocks,
			createOrUpdateResume,
			hasData,
			resumeBlob,
			slug,
			template,
			isSettingInitialData,
		]
	);

	const handleSave = useCallback(() => {
		createToast({
			message: 'Saving resume...',
			variant: 'primary',
			lifespan: 1000,
		});
		handleDoc();
	}, [handleDoc]);

	React.useEffect(() => {
		const handleKeyboardControls = (e: KeyboardEvent) => {
			if ((e.ctrlKey && e.key === 's') || (e.metaKey && e.key === 's')) {
				e.preventDefault();
				handleSave();
			}
		};

		window.addEventListener('keydown', handleKeyboardControls);

		return () => {
			window.removeEventListener('keydown', handleKeyboardControls);
		};
	}, [handleSave]);

	const isLoading = useDebounce(isPending, 500);

	useDebounce(handleDoc, slug === 'new' ? 500 : 1000);

	return (
		<div className={styles.BuildResumeLayout}>
			<nav className={styles.BuildResumeLayout__nav}>
				<Flex alignItems="center" gap={8} flex="0 1 15%">
					<Link href="/dashboard">
						<Logo
							className={classNames([styles.BuildResumeLayout__nav__logo])}
						/>
					</Link>
					<Link href="/upgrade">
						<Text
							fontSize="12px"
							color="var(--primary-blue)"
							casing="uppercase"
							weight={800}
						>
							Upgrade
						</Text>
					</Link>
				</Flex>
				<div className="hidden xl:flex">
					<Flex alignItems="center" gap={10}>
						<DropdownMenu.Root>
							<DropdownMenu.Trigger>
								<span className={styles.DashboardHeaderProfile}>
									<Flex alignItems="center" gap={8}>
										<FileIcon />

										<Text className="cursor-pointer" noOfLines={1}>
											{truncateText(resumeName || 'Untitled Resume', 50)}
										</Text>

										<ArrowDown />
									</Flex>
								</span>
							</DropdownMenu.Trigger>
							<DropdownMenu.Content>
								<ResumeDetailsAction
									handleDuplicate={handleDuplicate}
									handleSave={handleSave}
									handleDelete={handleDelete}
									handleShowAnalysisHistory={handleShowAnalysisHistory}
									handleDefault={handleDefault}
									setShowRename={setShowRename}
									resume={resume}
								/>
							</DropdownMenu.Content>
						</DropdownMenu.Root>
					</Flex>
				</div>
				<div className="hidden xl:flex basis-auto md:basis-[21%] justify-end md:whitespace-nowrap whitespace-normal">
					<Flex gap={8}>
						<DropdownMenu.Root>
							<DropdownMenu.Trigger>
								<CallToAction
									size="sm"
									className="p-[10px]"
									outline
									disabled={
										!!resumeBlob?.score && resumeBlob?.score < 50 ? true : false
									}
									leadingIcon={<Sparkles width={14} />}
								>
									Resume Analysis
								</CallToAction>
							</DropdownMenu.Trigger>
							<DropdownMenu.Content>
								<ResumeAnalysisAction
									setShowAnalysis={setShowAnalysis}
									setIsGettingAnalysis={setIsGettingAnalysis}
								/>
							</DropdownMenu.Content>
						</DropdownMenu.Root>

						<DropdownMenu.Root>
							<DropdownMenu.Trigger>
								<CallToAction size="sm" className="p-[10px]">
									Download Resume
								</CallToAction>
							</DropdownMenu.Trigger>
							<DropdownMenu.Content>
								<ResumeDownloadAction
									resumeName={resumeName}
									resumeBlob={resumeBlob}
								/>
							</DropdownMenu.Content>
						</DropdownMenu.Root>
					</Flex>
				</div>
				<div className="flex xl:hidden gap-4">
					<CallToAction
						size="sm"
						variant={showPreview ? 'secondary' : 'primary'}
						onClick={() => setShowPreview(!showPreview)}
					>
						{showPreview ? 'Close Preview' : 'Preview Resume'}
					</CallToAction>
					<button onClick={() => setShowSidebar(!showSidebar)}>
						{!showSidebar ? (
							<More height={28} width={28} />
						) : (
							<Text fontSize="28px">&times;</Text>
						)}
					</button>
				</div>
			</nav>
			<div className={styles.ContentWrap}>
				<AnimatePresence>
					{showSidebar && (
						<>
							<motion.div
								className={styles.BuildResumeLayout__sidebar}
								initial={{ x: '100%' }}
								animate={{ x: 0 }}
								exit={{ x: '-100%' }}
							>
								<Flex.Column gap={18} alignItems="flex-start">
									<Text
										casing="uppercase"
										fontSize="11px"
										style={{
											fontWeight: 800,
											letterSpacing: '1px',
											color: 'var(--primary-blue)',
										}}
										className="-mb-1"
									>
										YOUR RESUME
									</Text>
									<Flex alignItems="center" gap={8}>
										<FileIcon />

										<Text className="cursor-pointer" noOfLines={1}>
											{truncateText(resumeName, 50)}
										</Text>
									</Flex>
									<ResumeDetailsAction
										handleDuplicate={handleDuplicate}
										handleSave={handleSave}
										handleDelete={handleDelete}
										handleShowAnalysisHistory={handleShowAnalysisHistory}
										setShowRename={setShowRename}
										handleDefault={handleDefault}
										resume={resume}
										bare={true}
									/>
								</Flex.Column>
								<Flex.Column gap={18} alignItems="flex-start">
									<Text
										casing="uppercase"
										fontSize="11px"
										style={{
											fontWeight: 800,
											letterSpacing: '1px',
											color: 'var(--primary-blue)',
										}}
										className="-mb-1"
									>
										RESUME Analysis
									</Text>
									<ResumeAnalysisAction
										setShowAnalysis={setShowAnalysis}
										setIsGettingAnalysis={setIsGettingAnalysis}
										bare={true}
									/>
								</Flex.Column>
								<Flex.Column gap={18} alignItems="flex-start">
									<Text
										casing="uppercase"
										fontSize="11px"
										style={{
											fontWeight: 800,
											letterSpacing: '1px',
											color: 'var(--primary-blue)',
										}}
										className="-mb-1"
									>
										RESUME Download
									</Text>
									<ResumeDownloadAction
										resumeName={resumeName}
										resumeBlob={resumeBlob}
										bare={true}
									/>
								</Flex.Column>
							</motion.div>
						</>
					)}
				</AnimatePresence>

				<aside
					className={classNames([
						styles.BuildResumeLayout__aside,
						showPreview && styles.open,
					])}
					ref={previewRef}
				>
					<BuildResumePreview previewRef={previewRef} />
				</aside>
				<main className={styles.BuildResumeLayout__main}>
					<BuildResumePane
						isError={isError}
						isLoading={isLoading}
						hasData={!!hasData}
					/>
				</main>
			</div>
			<RenameResume
				resumeName={resumeName}
				setResumeName={setResumeName}
				show={showRename}
				onClose={() => setShowRename(false)}
				handleDoc={handleDoc}
			/>

			<ResumeAnalysis
				show={showAnalysis}
				onClose={() => {
					setShowAnalysis(false);
					setIsGettingAnalysis(false);
				}}
				isAnalysis={isGettingAnalysis}
			/>
		</div>
	);
};

const ResumeDetailsAction = ({
	handleDuplicate,
	handleSave,
	handleDefault,
	handleDelete,
	setShowRename,
	handleShowAnalysisHistory,
	bare,
}: {
	handleDuplicate: () => void;
	handleSave: () => void;
	handleDelete: () => void;
	handleShowAnalysisHistory: () => void;
	handleDefault: () => void;
	setShowRename: (data: any) => void;
	resume: any;
	bare?: boolean;
}) => {
	const Component = bare ? 'button' : DropdownMenu.Item;

	return (
		<>
			<Component
				onClick={() => {
					setShowRename(true);
				}}
			>
				Rename
			</Component>
			<Component onClick={handleDuplicate}>Duplicate Resume</Component>

			<Component onClick={handleSave}>Save Resume</Component>
			<Component onClick={handleDefault}>Set as Default</Component>
			<Component
				color="blue"
				onClick={() => {
					handleShowAnalysisHistory();
				}}
			>
				Analysis History
			</Component>

			<Component color="red" onClick={handleDelete}>
				Delete
			</Component>
			{!bare && <DropdownMenu.Separator />}
			<Component
				onClick={() => {
					Router.push('/dashboard');
				}}
			>
				Go to Dashboard
			</Component>
		</>
	);
};

const RenameResume = ({
	resumeName,
	setResumeName,
	show,
	onClose,
	handleDoc = () => {},
}: {
	resumeName: string;
	setResumeName: (data: any) => void;
	show: boolean;
	onClose: () => void;
	handleDoc?: (data: any) => void;
}) => {
	const { createToast } = useFeedback();

	return (
		<Modal in={show} onClose={onClose}>
			<Field.Form
				onSubmit={async (e) => {
					e.preventDefault();
					await handleDoc({ name: resumeName });
					onClose();
					createToast({
						message: 'Resume renamed successfully',
					});
				}}
			>
				<Field
					label="Rename Resume"
					value={resumeName}
					onChange={(e) => setResumeName(e.target.value)}
				/>
				<CallToAction.button>Save</CallToAction.button>
			</Field.Form>
		</Modal>
	);
};

const ResumeDownloadAction = ({
	resumeBlob,
	resumeName,
	bare,
}: {
	resumeBlob: any;
	resumeName: string;
	bare?: boolean;
}) => {
	const Component = bare ? 'button' : DropdownMenu.Item;

	return (
		<>
			<Component
				onClick={() =>
					downloadResume(
						resumeBlob?.blob!,
						slugify(resumeName || 'Untitled Resume'),
						'pdf'
					)
				}
				className="cursor-pointer"
			>
				Download as PDF
			</Component>
			<Component
				className="cursor-pointer"
				onClick={() =>
					downloadResume(
						resumeBlob?.raw!,
						slugify(resumeName || 'Untitled Resume'),
						'docx'
					)
				}
			>
				Download as DOCX
			</Component>
			<Component
				onClick={() =>
					downloadResume(
						resumeBlob?.raw!,
						slugify(resumeName || 'Untitled Resume'),
						'txt'
					)
				}
				className="cursor-pointer"
			>
				Download as TXT
			</Component>
		</>
	);
};

const ResumeAnalysisAction = ({
	bare,
	setShowAnalysis,
	setIsGettingAnalysis,
}: {
	bare?: boolean;
	setIsGettingAnalysis: (data: any) => void;
	setShowAnalysis: (data: any) => void;
}) => {
	const Component = bare ? 'button' : DropdownMenu.Item;
	return (
		<>
			<Component
				onClick={() => {
					setIsGettingAnalysis(true);
					setShowAnalysis(true);
				}}
			>
				Get New Analysis
			</Component>
			<Component onClick={() => setShowAnalysis(true)}>
				View Previous Analysis
			</Component>
		</>
	);
};
