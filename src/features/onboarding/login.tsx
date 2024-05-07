import React from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';

import { Flex, Heading, Text } from '@labs/components';
import LogoMark from '@labs/icons/logo-mark.svg';

import { OnboardingLayout } from '.';

import LoginWithGoogle from './components/login-with-google';
import LoginWithLinkedin from './components/login-with-linkedin';
import styles from './onboarding.module.scss';

export const Login = () => {
	return (
		<OnboardingLayout
			title="Login"
			adjacentContent={
				<div className={styles.AuthWrapLogin}>
					<Flex.Column className={styles.AuthWrapInner}>
						<LogoMark />
						<Heading.h6 weight={700}>
							I was glad the day I discovered Kuzco’s poison. As the name
							indicates, it makes the process of creating content for
							publication incredibly easy.
						</Heading.h6>
						<Flex className={styles.AuthWrapAuthor}>
							<img src="https://via.placeholder.com/150" alt="placeholder" />
							<Flex.Column>
								<Text weight={800}>Ahamd Ekstrom Bothman</Text>
								<Text>@Ahmad</Text>
							</Flex.Column>
						</Flex>
					</Flex.Column>
				</div>
			}
		>
			<AnimatePresence>
				<div className={styles.AuthLayout}>
					<motion.div
						initial={{ opacity: 0, y: 15 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: 15 }}
					>
						<Flex.Column gap={14}>
							<Heading.h3>Welcome back!</Heading.h3>
							<Heading.h6>
								Please sign in to BetterCareer and ignite your professional
								journey.
							</Heading.h6>

							<Flex.Column gap={14} className={styles.AuthLayoutButtons}>
								<LoginWithLinkedin intent="login" />

								<LoginWithGoogle intent="login" />
								<Text fontSize="16px" className="mt-[10px]">
									Don’t have an account?{' '}
									<Text.span inheritFont color="var(--primary-blue)">
										<Link href="/signup">Sign Up</Link>
									</Text.span>
								</Text>
							</Flex.Column>
						</Flex.Column>
					</motion.div>
					<motion.div
						initial={{ opacity: 0, y: 15 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: 15 }}
						transition={{ delay: 0.1 }}
						className={styles.AuthLayoutFooter}
					>
						<Text fontSize="16px">
							By signing up, you agree to the{' '}
							<Text.span inheritFont color="var(--primary-blue)">
								<Link href="/login">Terms of Services</Link>
							</Text.span>{' '}
							and{' '}
							<Text.span inheritFont color="var(--primary-blue)">
								<Link href="/login">Privacy Policy</Link>
							</Text.span>
						</Text>
					</motion.div>
				</div>
			</AnimatePresence>
		</OnboardingLayout>
	);
};
