import React from 'react';
import { DropdownMenu } from '@radix-ui/themes';
import Link from 'next/link';
import classNames from 'classnames';

import { BuildResumePreview } from '../view/build-resume-preview/';
import { BuildResumePane } from '../view/build-resume-pane';

import { CallToAction, Flex, Text } from '@labs/components';
import { useBuildStore } from '@/store/z-store/builder';
import { downloadResume, truncateText } from '@labs/utils';
import Sparkles from '@labs/icons/misc/sparkels.svg';
import ArrowDown from '@labs/icons/dashboard/down.svg';
import FileIcon from '@labs/icons/dashboard/file.svg';
import Logo from '@labs/icons/logo.svg';
import LogoMark from '@labs/icons/logo-mark.svg';
import More from '@labs/icons/misc/more.svg';

import styles from './layout.module.scss';

export const BuildResumeLayout = () => {
	const { resumeBlob } = useBuildStore();
	const previewRef = React.useRef(null);
	const [showPreview, setShowPreview] = React.useState(false);
	return (
		<div className={styles.BuildResumeLayout}>
			<nav className={styles.BuildResumeLayout__nav}>
				<div className="hidden xl:block">
					<Flex alignItems="center" gap={10}>
						<DropdownMenu.Root>
							<DropdownMenu.Trigger>
								<span className={styles.DashboardHeaderProfile}>
									<Flex alignItems="center" gap={8}>
										<FileIcon />
										<Text
											contentEditable="true"
											role="button"
											tabIndex={0}
											aria-label="Resume Name"
											suppressContentEditableWarning={true}
											onBlur={(e) => {
												e.stopPropagation();
												e.currentTarget.textContent = truncateText(
													e.currentTarget.textContent!,
													20
												);
											}}
											onKeyDown={(e) => {
												e.stopPropagation();
												if (['Enter', 'Escape'].includes(e.key)) {
													e.currentTarget.blur();
												}
											}}
										>
											New Resume Adenekan
										</Text>
										<ArrowDown />
									</Flex>
								</span>
							</DropdownMenu.Trigger>
							<DropdownMenu.Content>
								<DropdownMenu.Item>
									<button>Duplicate Resume</button>
								</DropdownMenu.Item>
								<DropdownMenu.Item>
									<button>Delete</button>
								</DropdownMenu.Item>
								<DropdownMenu.Item>
									<button>Save Resume</button>
								</DropdownMenu.Item>
								<DropdownMenu.Item color="red">
									<button>Get Free Analysis</button>
								</DropdownMenu.Item>
							</DropdownMenu.Content>
						</DropdownMenu.Root>
						<Link href="/upgrade">
							<Text
								fontSize="12px"
								color="var(--primary-blue)"
								casing="uppercase"
								weight={800}
							>
								Upgrade to Pro
							</Text>
						</Link>
					</Flex>
				</div>
				<Logo
					className={classNames([
						styles.BuildResumeLayout__nav__logo,
						'hidden xl:block',
					])}
				/>
				<div className="flex xl:hidden items-center gap-2">
					<LogoMark
						className={classNames([styles.BuildResumeLayout__nav__logo, ''])}
						width={24}
					/>
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
				</div>

				<div className="hidden xl:block">
					<Flex gap={8}>
						<CallToAction
							size="sm"
							className="p-[10px]"
							outline
							disabled={
								resumeBlob?.score && resumeBlob?.score < 50 ? true : false
							}
							leadingIcon={<Sparkles width={14} />}
						>
							Get Resume Analysis
						</CallToAction>

						<DropdownMenu.Root>
							<DropdownMenu.Trigger>
								<CallToAction size="sm" className="p-[10px]">
									Download Resume
								</CallToAction>
							</DropdownMenu.Trigger>
							<DropdownMenu.Content>
								<DropdownMenu.Item
									onClick={() =>
										downloadResume(resumeBlob?.blob!, 'resume', 'pdf')
									}
									className="cursor-pointer"
								>
									Download as PDF
								</DropdownMenu.Item>
								<DropdownMenu.Item
									className="cursor-pointer"
									onClick={() =>
										downloadResume(resumeBlob?.raw!, 'resume', 'docx')
									}
								>
									Download as DOCX
								</DropdownMenu.Item>
								<DropdownMenu.Item
									onClick={() =>
										downloadResume(resumeBlob?.raw!, 'resume', 'txt')
									}
									className="cursor-pointer"
								>
									Download as TXT
								</DropdownMenu.Item>
								<DropdownMenu.Item>
									<button>Save Resume</button>
								</DropdownMenu.Item>
							</DropdownMenu.Content>
						</DropdownMenu.Root>
					</Flex>
				</div>
				<div className="flex xl:hidden gap-4">
					<CallToAction size="sm" onClick={() => setShowPreview(!showPreview)}>
						{showPreview ? 'Close Preview' : 'Preview Resume'}
					</CallToAction>
					<button>
						<More height={28} width={28} />
					</button>
				</div>
			</nav>
			<div className={styles.ContentWrap}>
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
					<BuildResumePane />
				</main>
			</div>
		</div>
	);
};
