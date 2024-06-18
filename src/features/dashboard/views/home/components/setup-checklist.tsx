import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import classNames from 'classnames';

import styles from '../home.module.scss';

import { CallToAction, Flex, Heading, Text } from '@labs/components';
import CheckIcon from '@labs/icons/dashboard/check.svg';
import { useLocalStorage } from '@labs/utils/hooks/useLocalStorage';

export const SetupChecklist = ({
	onboardingChecklist,
}: {
	onboardingChecklist: {
		hasBuiltResume: boolean;
		hasConnectedAccount: boolean;
		hasJobPreferences: boolean;
		hasUploadedResume: boolean;
	};
}) => {
	const [isChecklistOpen, setIsChecklistOpen] = useLocalStorage<boolean>(
		'[bc]:isChecklistOpen',
		false
	);

	const updateStatus = (key: string) => {
		// Update the status of the checklist item
		if (!onboardingChecklist) return false;

		switch (key) {
			case 'hasConnectedAccount':
				return onboardingChecklist?.hasConnectedAccount;
			case 'hasUploadedResume':
				return onboardingChecklist?.hasUploadedResume;
			case 'hasBuiltResume':
				return onboardingChecklist.hasBuiltResume;
			case 'hasJobPreferences':
				return onboardingChecklist.hasJobPreferences;
			default:
				return false;
		}
	};

	const checklist = [
		{
			title: 'Create An Account',
			// status:  updateStatus('hasConnectedAccount'),
			status: true,
			infographic: null,
			description: 'Connect your LinkedIn profile to build a resume.',
			action: '/build-profile',
			actionText: 'Connect Account',
		},
		{
			title: 'Upload Your Resume',
			status: updateStatus('hasUploadedResume'),
			infographic: '/images/dashboard/1.png',
			description:
				'Fast track your profile: Add your resume for a faster and more complete profile.',
			action: '/build-profile',
			actionText: 'Upload Resume',
		},
		{
			title: 'Build Your Resume',
			status: updateStatus('hasBuiltResume'),
			infographic: '/images/dashboard/2.png',
			description:
				'Use our builder to create a perfect resume for your job applications.',
			action: '/dashboard/resume/build',
			actionText: 'Build Resume',
		},
		{
			title: 'Fill Job Preferences',
			status: updateStatus('hasJobPreferences'),
			infographic: '/images/dashboard/3.png',
			description:
				'Specify your preferences to narrow down your search and find your dream job.',
			action: '/dashboard?setPreferences=true',
			actionText: 'Set Preferences',
		},
	];

	const [active, setActive] = React.useState(
		checklist.findIndex((item) => !item.status)
	);

	const hasTwoItems =
		Object.values(onboardingChecklist).filter(Boolean).length >= 2;
	const currentChecklist = checklist[active];

	useEffect(() => {
		if (!hasTwoItems && isChecklistOpen) {
			setIsChecklistOpen(false);
		}
	}, [isChecklistOpen, hasTwoItems, setIsChecklistOpen]);

	if (isChecklistOpen) return null;

	return (
		<div className={styles.SetupChecklist}>
			<Flex.Column gap={16} className={styles.Checklist}>
				<Flex.Row
					gap={12}
					className="mb-[8px]"
					alignContent="center"
					justifyContent="space-between"
				>
					<Heading.h6 weight={700}>Setup Checklist</Heading.h6>
					{hasTwoItems && (
						<button onClick={() => setIsChecklistOpen(true)}>
							<Text weight={600} color="var(--text-gray)">
								Close
							</Text>
						</button>
					)}
				</Flex.Row>
				{checklist.map((item, index) => (
					<button
						key={index}
						className={classNames([
							styles.ChecklistItem,
							active === index && styles.active,
							item.status && styles.done,
						])}
						disabled={item.status}
						onClick={() => setActive(index)}
						aria-label={item.title}
					>
						<Flex alignItems="center" gap={12}>
							<div className={styles.ChecklistItemStatus}>
								{item.status ? (
									<CheckIcon width="16" height="16" />
								) : (
									<span className={styles.ChecklistItemStatusIndex}>
										{index + 1}
									</span>
								)}
							</div>

							<Text weight={700}>{item.title}</Text>
						</Flex>
					</button>
				))}
			</Flex.Column>
			<motion.div
				className={styles.ChecklistItemDetails}
				key={currentChecklist?.title}
			>
				{currentChecklist.infographic && (
					<motion.img
						src={currentChecklist.infographic}
						alt="placeholder"
						initial={{ opacity: 0, y: 15 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: 15 }}
					/>
				)}
				<motion.div
					initial={{ opacity: 0, y: 15 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: 15 }}
					transition={{ delay: 0.1 }}
				>
					<Flex.Column gap={14} className="max-w-[400px]">
						<Text weight={600}>{currentChecklist.description}</Text>
						<CallToAction.a
							className={styles.ChecklistItemAction}
							href={currentChecklist.action}
						>
							{currentChecklist.actionText}
						</CallToAction.a>
					</Flex.Column>
				</motion.div>
			</motion.div>
		</div>
	);
};
