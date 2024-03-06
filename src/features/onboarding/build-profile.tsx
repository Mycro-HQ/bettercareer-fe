import React, { useEffect, useState } from 'react';
import * as Progress from '@radix-ui/react-progress';
import Router from 'next/router';
import { AnimatePresence, motion } from 'framer-motion';

import { useInterval } from '@labs/utils/hooks/useInterval';

import { OnboardingLayout } from '.';
import { CallToAction, Flex, Heading, Text } from '@labs/components';

import LogoMark from '@labs/icons/logo-mark.svg';
import styles from './onboarding.module.scss';

import DragAndDrop from '@/components/DragAndDrop';
import { getSizeFormat } from '@labs/utils';
import { FileWithKey } from '@labs/utils/types/utility';

import DocumentImage from '@labs/icons/document.svg';
import DeleteImage from '@labs/icons/delete.svg';

export const BuildProfile = () => {
	const [isLinkedin, setIsLinkedin] = useState(false);

	useEffect(() => {
		if (Router.query?.linkedin) {
			setIsLinkedin(true);
		}
	}, []);

	return (
		<OnboardingLayout
			title="Upload Resume"
			adjacentContent={isLinkedin ? null : <OnboardCards />}
		>
			{isLinkedin ? <LinkedinFlow /> : <UploadResumeFlow />}
		</OnboardingLayout>
	);
};

const LinkedinFlow = () => {
	return (
		<Flex.Column
			gap={24}
			alignItems="center"
			className="min-h-[60vh]"
			justifyContent="center"
		>
			<img src="/images/misc/loading.gif" alt="placeholder" width={45} />
			<Heading.h5 weight={700}>Connecting Linkedin</Heading.h5>
			<ProgressDemo />
		</Flex.Column>
	);
};

const UploadResumeFlow = () => {
	const [files, setFiles] = useState<FileWithKey[]>([]);
	const multiple: boolean = true;
	const maxSize = 10;

	function handleDeleteClick(indexToRemove: number) {
		setFiles((prev) => {
			const newFiles = [...prev];
			newFiles.splice(indexToRemove, 1);
			return newFiles;
		});
	}

	function handleFileSubmit() {
		// check if the files const contains files
		if (files.length !== 0) {
			// move those files to the zustand store
			// or extract the data immediately?
		}
	}

	return (
		<AnimatePresence>
			<div className={styles.AuthLayout}>
				<motion.div
					initial={{ opacity: 0, y: 15 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: 15 }}
				>
					<Flex.Column gap={14}>
						<Heading.h3>Upload Your Resume</Heading.h3>
						<Heading.h6>
							Seamlessly integrate your professional journey by uploading your
							resume.
						</Heading.h6>
						{(!files || files.length !== 1) && (
							<DragAndDrop
								accept="application/pdf"
								multiple={multiple}
								setFiles={setFiles}
								onDrop={(files) => {}}
								onDragOver={() => {}}
								maxSize={10}
							/>
						)}
						{files &&
							files.map((file, index) => {
								return (
									<Flex
										direction="row"
										alignItems="center"
										justifyContent="space-between"
										key={file.key}
										className={styles.FileListItem}
									>
										<Flex>
											<DocumentImage className={styles.FileListDocumentIcon} />
											<Flex.Column gap={4}>
												<Text className={styles.FileListItemTitle}>
													{file.blob.name}
												</Text>
												{file.status.length === 0 ? (
													<Text color="var(--text-gray)" size="sm">
														{getSizeFormat(file.blob.size)}
													</Text>
												) : (
													<Text color="var(--primary-error)" size="sm">
														{file.status.map((status) => status + '\n')}
													</Text>
												)}
											</Flex.Column>
										</Flex>
										<button onClick={() => handleDeleteClick(index)}>
											<DeleteImage />
										</button>
									</Flex>
								);
							})}
						<Flex gap={8} className="mt-[24px]">
							<CallToAction.a href="/dashboard" onClick={handleFileSubmit}>
								Continue
							</CallToAction.a>
							<CallToAction.a href="/login" outline>
								Skip
							</CallToAction.a>
						</Flex>
					</Flex.Column>
				</motion.div>
			</div>
		</AnimatePresence>
	);
};

const sliderVariant = {
	hidden: { opacity: 0.4, scale: 0.9, y: 8 },
	visible: { opacity: 1, scale: 1, y: 0 },
	exit: { opacity: 0, scale: 0.95, y: -8 },
};

const MESSAGE = [
	{
		message:
			'"BetterCareer.me is a game-changer! The AI tools analyzed my skills and matched me with jobs I never thought I could qualify for. The expert guidance helped me write a killer resume and ace my interviews. I landed my dream job in just a few months!"',
		author: {
			name: 'John Doe',
			title: 'Software Engineer',
			image: 'https://picsum.photos/200',
		},
	},
	{
		message:
			'I was skeptical at first, but BetterCareer.me helped me land my dream job in just a few months! The AI tools analyzed my skills and matched me with jobs I never thought I could qualify for. The expert guidance helped me write a killer resume and ace my interviews.',
		author: {
			name: 'Jane Doe',
			title: 'Software Engineer',
			image: 'https://picsum.photos/400',
		},
	},
];

const OnboardCards = () => {
	const [activeMessage, setActiveMessage] = useState(0);
	const currentMessage = MESSAGE[activeMessage];
	useInterval(() => {
		setActiveMessage((activeMessage + 1) % MESSAGE.length);
	}, 4000);

	return (
		<AnimatePresence mode="wait">
			<motion.div className={styles.OnboardCardWrap}>
				<motion.div
					initial={{ opacity: 0, scale: 0.9 }}
					animate={{ opacity: 1, scale: 1 }}
					exit={{ opacity: 0, scale: 0.95 }}
					key={`${activeMessage}-1`}
					className={styles.OnboardCardStack}
				/>

				<motion.div
					className={styles.OnboardCard}
					variants={sliderVariant}
					initial="hidden"
					animate="visible"
					exit="exit"
					transition={{ duration: 0.5 }}
					key={activeMessage}
				>
					<LogoMark />
					<Heading.h4 fontSize="18px" lineHeight="110%" weight={700}>
						{currentMessage.message}
					</Heading.h4>
					<Flex className={styles.AuthWrapAuthor}>
						<img
							src={currentMessage.author.image}
							alt={currentMessage.author.name}
						/>
						<Flex.Column gap={1} className="mt-[10px]">
							<Text weight={800}>{currentMessage.author.name}</Text>
							<Text size="sm">{currentMessage.author.title}</Text>
						</Flex.Column>
					</Flex>
				</motion.div>
			</motion.div>
		</AnimatePresence>
	);
};

const ProgressDemo = () => {
	const router = Router;
	const [progress, setProgress] = React.useState(0);

	React.useEffect(() => {
		const timer = setInterval(
			() => setProgress((prev) => (prev + Math.random() * 10) % 100),
			500
		);

		if (progress > 90) {
			router.push('/dashboard');
		}

		return () => clearInterval(timer);
	}, [progress, router]);

	return (
		<Progress.Root
			className="relative overflow-hidden bg-[#F3F4F4] rounded-full w-[300px] h-[8px]"
			style={{
				transform: 'translateZ(0)',
			}}
			value={progress}
		>
			<Progress.Indicator
				className="bg-[#1388F2] w-full h-full transition-transform duration-[660ms] ease-[cubic-bezier(0.65, 0, 0.35, 1)]"
				style={{ transform: `translateX(-${100 - progress}%)` }}
			/>
		</Progress.Root>
	);
};
