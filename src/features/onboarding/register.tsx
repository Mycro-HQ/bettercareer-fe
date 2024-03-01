import React from 'react';

import { OnboardingLayout } from '.';
import { CallToAction, Flex, Heading, Text } from '@labs/components';

import LinkedInIcon from '@labs/icons/socials/linkedin.svg';
import GoogleIcon from '@labs/icons/socials/google.svg';
import LogoMark from '@labs/icons/logo-mark.svg';
import styles from './onboarding.module.scss';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';

export const Register = () => {
	return (
		<OnboardingLayout
			title="Create your account"
			adjacentContent={
				<div className={styles.AuthWrapRegister}>
					<Flex.Column className={styles.AuthWrapInner}>
						<LogoMark />
						<Heading.h5 weight={700}>
							I was glad the day I discovered Kuzco’s poison. As the name
							indicates, it makes the process of creating content for
							publication incredibly easy.
						</Heading.h5>
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
							<Heading.h3>Create your account</Heading.h3>
							<Heading.h5>
								Get ready to launch your career into new heights with
								BetterCareers!
							</Heading.h5>

							<Flex.Column gap={14} className={styles.AuthLayoutButtons}>
								<CallToAction leadingIcon={<LinkedInIcon />} size="block">
									Sign up with Google
								</CallToAction>
								<CallToAction.a
									leadingIcon={<GoogleIcon />}
									href="/build-profile"
									outline
									size="block"
								>
									Sign up with Google
								</CallToAction.a>
								<Text fontSize="16px" className="mt-[10px]">
									Already have an account?{' '}
									<Text.span inheritFont color="var(--primary-blue)">
										<Link href="/login">Sign In</Link>
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
