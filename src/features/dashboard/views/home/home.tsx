import React from 'react';
import { motion } from 'framer-motion';
import { CallToAction, Flex, Heading, Text } from '@labs/components';
import classNames from 'classnames';

import WavingHandIcon from '@labs/icons/dashboard/wave-hand.svg';
import CheckIcon from '@labs/icons/dashboard/check.svg';

import styles from './home.module.scss';

export const DashboardHome = () => {
	return (
		<div className={styles.DashboardHome}>
			<Flex.Column gap={6}>
				<Flex alignItems="center" gap={12}>
					<Heading.h3>Welcome, Adenekan Wonderful</Heading.h3>
					<WavingHandIcon width="24" height="24" />
				</Flex>

				<Text color="var(--text-gray)">
					Launch your dream career journey today.
				</Text>
			</Flex.Column>
			<SetupChecklist />
		</div>
	);
};

export const SetupChecklist = () => {
	const checklist = [
		{
			title: 'Connect Your Account',
			status: 'done',
			infographic: null,
			description: 'Connect your LinkedIn or Google account to get started.',
			action: 'Connect Account',
		},
		{
			title: 'Upload Your Resume',
			status: 'pending',
			infographic: '/images/dashboard/1.png',
			description:
				'Fast track your profile: Add your resume for a faster and more complete profile.',
			action: 'Upload Resume',
		},
		{
			title: 'Build Your Resume',
			status: 'pending',
			infographic: '/images/dashboard/2.png',
			description:
				'Use our builder to create a perfect resume for your job applications.',
			action: 'Build Resume',
		},
		{
			title: 'Fill Job Preferences',
			status: 'pending',
			infographic: '/images/dashboard/3.png',
			description:
				'Specify your preferences to narrow down your search and find your dream job.',
			action: 'Set Preferences',
		},
	];
	const [active, setActive] = React.useState(0);
	const currentChecklist = checklist[active];

	return (
		<div className={styles.SetupChecklist}>
			<Flex.Column gap={16} className={styles.Checklist}>
				<Heading.h6 className="mb-[8px]" weight={700}>
					Setup Checklist
				</Heading.h6>
				{checklist.map((item, index) => (
					<button
						key={index}
						className={classNames([
							styles.ChecklistItem,
							active === index && styles.active,
							item.status === 'done' && styles.done,
						])}
						onClick={() => setActive(index)}
						aria-label={item.title}
					>
						<Flex alignItems="center" gap={12}>
							<div className={styles.ChecklistItemStatus}>
								{item.status === 'done' ? (
									<CheckIcon width="16" height="16" />
								) : (
									<span className={styles.ChecklistItemStatusIndex}>
										{index + 1}
									</span>
								)}
							</div>

							<Heading.h6 weight={700}>{item.title}</Heading.h6>
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
						<CallToAction className={styles.ChecklistItemAction}>
							{currentChecklist.action}
						</CallToAction>
					</Flex.Column>
				</motion.div>
			</motion.div>
		</div>
	);
};
