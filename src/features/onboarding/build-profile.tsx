import React, { useState } from 'react';
import * as RadioGroup from '@radix-ui/react-radio-group';

import { OnboardingLayout } from '.';
import { CallToAction, Flex, Heading, Text } from '@labs/components';

import LinkedInIcon from '@labs/icons/socials/linkedin.svg';
import GoogleIcon from '@labs/icons/socials/google.svg';
import LogoMark from '@labs/icons/logo-mark.svg';
import styles from './onboarding.module.scss';

import { AnimatePresence, motion } from 'framer-motion';
import { useInterval } from '@labs/utils/hooks/useInterval';

export const BuildProfile = () => {
	return (
		<OnboardingLayout
			title="Build your Profile"
			adjacentContent={<OnboardCards />}
		>
			<AnimatePresence>
				<div className={styles.AuthLayout}>
					<motion.div
						initial={{ opacity: 0, y: 15 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: 15 }}
					>
						<Flex.Column gap={14}>
							<Heading.h3>Build your profile</Heading.h3>
							<Heading.h5>
								Import from LinkedIn for swift connections, or fill in manually
								for a profile that truly reflects you.
							</Heading.h5>

							<Flex.Column gap={18} className="mt-[48px]">
								<div className={styles.RadioGroup}>
									<Heading.h5 weight={600}>Connect LinkedIn</Heading.h5>
									<Text>
										Leverage your LinkedIn data to create a comprehensive
										profile.
									</Text>
								</div>
								<div className={styles.RadioGroup}>
									<Heading.h5 weight={600}>Upload Resume</Heading.h5>
									<Text>Showcase your unique experiences and achievements</Text>
								</div>
							</Flex.Column>
							<Flex gap={8} className="mt-[24px]">
								<CallToAction>Continue</CallToAction>
								<CallToAction.a href="/login" outline>
									Skip
								</CallToAction.a>
							</Flex>
						</Flex.Column>
					</motion.div>
				</div>
			</AnimatePresence>
		</OnboardingLayout>
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
			{/* create a stack illusion */}
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
							<Heading.h6 weight={800}>{currentMessage.author.name}</Heading.h6>
							<Text>{currentMessage.author.title}</Text>
						</Flex.Column>
					</Flex>
				</motion.div>
			</motion.div>
		</AnimatePresence>
	);
};
