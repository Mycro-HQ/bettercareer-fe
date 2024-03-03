import React from 'react';

import { OnboardingLayout } from '.';
import { CallToAction, Flex, Heading, Text } from '@labs/components';

import LinkedInIcon from '@labs/icons/socials/linkedin.svg';
import GoogleIcon from '@labs/icons/socials/google.svg';
import LogoMark from '@labs/icons/logo-mark.svg';
import styles from './onboarding.module.scss';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';

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
								<CallToAction.a
									href="/build-profile?linkedin=true"
									leadingIcon={<LinkedInIcon />}
									size="block"
								>
									Sign in with Linkedin
								</CallToAction.a>
								<CallToAction.a
									leadingIcon={<GoogleIcon />}
									href="/build-profile"
									outline
									size="block"
								>
									Sign in with Google
								</CallToAction.a>
								<Text fontSize="16px" className="mt-[10px]">
									Don’t have an account?{' '}
									<Text.span inheritFont color="var(--primary-blue)">
										<Link href="/register">Sign Up</Link>
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
