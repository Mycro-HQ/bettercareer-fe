import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useUserStore } from '@/store/z-store/user';
import { OnboardingLayout } from '@/features/onboarding';
import ResumeBody from '@/features/resume-builder/resume-body';
import { CallToAction, Flex, Heading, Text } from '@labs/components';
import StarIcon from '@labs/icons/misc/star.svg';
import { ResumeBuilderHeader } from '@/features/resume-builder/header';
import styles from '@/features/resume-builder/resume.module.scss';
import { Button } from '@labs/components/button';

export const Dashboard = () => {
	const { profile } = useUserStore();
	console.log('what is going on');

	return (
		<>
			<ResumeBuilderHeader />
			<OnboardingLayout
				header={false}
				title={'Resume Builder'}
				center={false}
				adjacentContent={<>Hi There</>}
			>
				<AnimatePresence>
					<div>
						<motion.div
							initial={{ opacity: 0, y: 15 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: 15 }}
						>
							<Flex.Row justifyContent="space-between">
								<Flex.Row alignItems="flex-start" justifyContent="flex-start">
									<StarIcon />
									<Flex.Column gap={14} className="ml-2">
										<Heading.h4>Build Resume</Heading.h4>
										<Text as="p" className="text-neutral-600">
											Edit Section below and see your result immediately
										</Text>
									</Flex.Column>
								</Flex.Row>

								<CallToAction.button
									size="xs"
									variant="secondary"
									className="bg-blue-400"
								>
									Tailor to Job
								</CallToAction.button>
							</Flex.Row>
						</motion.div>
					</div>
				</AnimatePresence>
				<ResumeBody />

				<Flex.Row justifyContent="flex-end">
					<CallToAction.button outline className="mt-10">
						Resources and support
					</CallToAction.button>
				</Flex.Row>
			</OnboardingLayout>
		</>
	);
};

export default Dashboard;
