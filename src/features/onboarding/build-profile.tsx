import React, { useEffect, useState } from 'react';
import * as Progress from '@radix-ui/react-progress';
import Router from 'next/router';
import { AnimatePresence, motion } from 'framer-motion';

import { useInterval } from '@labs/utils/hooks/useInterval';
import { CallToAction, Flex, Heading, Text } from '@labs/components';
import LogoMark from '@labs/icons/logo-mark.svg';
import DragAndDrop from '@/components/drag-and-drop';

import { OnboardingLayout } from '.';

import styles from './onboarding.module.scss';

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
						<DragAndDrop
							className="mt-9 mb-4"
							accept="application/pdf"
							multiple={false}
							onDrop={(files) => {}}
							onDragOver={() => {}}
							maxSize={10}
						/>
						<Flex gap={8} className="mt-[24px]">
							<CallToAction.a href="/dashboard">Continue</CallToAction.a>
							<CallToAction.a href="/dashboard" outline>
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
