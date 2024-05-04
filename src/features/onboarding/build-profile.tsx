import React, { useEffect, useState } from 'react';

import Router from 'next/router';
import { AnimatePresence, motion } from 'framer-motion';

import { useInterval } from '@labs/utils/hooks/useInterval';
import { CallToAction, Flex, Heading, Text, useToast } from '@labs/components';
import LogoMark from '@labs/icons/logo-mark.svg';
import DragAndDrop from '@/components/drag-and-drop';

import { OnboardingLayout } from '.';

import styles from './onboarding.module.scss';
import { useUploadResumeMutation } from '@/queries/resume';
import { formDataAppender } from '@labs/utils';
import { ProgressLoader } from '@/components/misc/loader';
import { useBuildStore } from '@/store/z-store/builder';

export const BuildProfile = () => {
	useEffect(() => {}, []);

	return (
		<OnboardingLayout title="Upload Resume" adjacentContent={<OnboardCards />}>
			<UploadResumeFlow />
		</OnboardingLayout>
	);
};

const UploadingFlow = () => {
	return (
		<Flex.Column
			gap={24}
			alignItems="center"
			className="min-h-[60vh]"
			justifyContent="center"
		>
			<img src="/images/misc/loading.gif" alt="placeholder" width={45} />
			<Flex.Column gap={8} alignItems="center">
				<Heading.h5 weight={700}>Building and analyzing your resume</Heading.h5>
				<Text size="sm" color="var(--text-gray)">
					Please do not close the window. This may take a few seconds...
				</Text>
			</Flex.Column>
			<ProgressLoader />
		</Flex.Column>
	);
};

export const UploadResumeFlow = ({ isOwnPage }: { isOwnPage?: boolean }) => {
	const { createToast } = useToast();
	const [isUploading, setIsUploading] = useState(false);
	const { setAnalysisData } = useBuildStore();
	const { mutateAsync: uploadResume, isPending } = useUploadResumeMutation();
	const [files, setFiles] = React.useState<any>([]);

	const handleUpload = React.useCallback(async () => {
		const file = files[0]?.file;
		if (!file) return;

		try {
			const res = await uploadResume(formDataAppender({ resume: file }));

			setAnalysisData(res.data.analysis);
			Router.push(`/dashboard/resume/b/${res.data.resume.id}?analysis=true`);
		} catch (error) {
			createToast({
				variant: 'error',
				message: 'An error occurred while uploading your resume',
			});
		} finally {
			setIsUploading(false);
		}
	}, [files[0]?.file, uploadResume]);

	return (
		<AnimatePresence>
			{!(isUploading || isPending) ? (
				<div
					className={styles.AuthLayout}
					{...(isOwnPage
						? {
								style: {
									margin: 'auto',
									maxWidth: '580px',
									padding: '48px',
									backgroundColor: 'white',
									borderRadius: '16px',
									boxShadow: '0 12px 15px -10px hsla(0, 0%, 75%, .22)',
								},
							}
						: {})}
				>
					<motion.div
						initial={{ opacity: 0, y: 15 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: 15 }}
					>
						<Flex.Column
							gap={14}
							{...(isOwnPage
								? {
										justifyContent: 'center',
									}
								: {})}
						>
							<Heading.h3>Upload Your Resume</Heading.h3>
							<Heading.h6>
								Seamlessly integrate your professional journey by uploading your
								current resume.
							</Heading.h6>

							<DragAndDrop
								className="mt-9 mb-4 w-full"
								accept="application/pdf"
								multiple={false}
								files={files}
								setFiles={setFiles}
								onDragOver={() => {}}
								maxSize={10}
							/>
							<Flex gap={8} className="mt-[24px]">
								<CallToAction.button
									onClick={handleUpload}
									disabled={!files.length || isPending}
								>
									{isOwnPage ? 'Upload Resume' : 'Continue'}
								</CallToAction.button>
								{!isOwnPage && (
									<CallToAction.a href="/dashboard" outline>
										Skip
									</CallToAction.a>
								)}
							</Flex>
						</Flex.Column>
					</motion.div>
				</div>
			) : (
				<UploadingFlow />
			)}
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
					<Heading.h4 fontSize="18px" lineHeight="1.6" weight={500}>
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
