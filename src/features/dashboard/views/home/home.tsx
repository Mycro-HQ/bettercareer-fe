import React from 'react';
import { CallToAction, Flex, Heading, Text } from '@labs/components';

import WavingHandIcon from '@labs/icons/dashboard/wave-hand.svg';
import Resumes from '@labs/icons/dashboard/resumes.svg';
import { SetupChecklist } from './components/setup-checklist';
import styles from './home.module.scss';
import { StackCard } from './components/stack-card/stack-card';

export const DashboardHome = () => {
	const hasSetup = true;
	return (
		<div className={styles.DashboardHome}>
			<Flex.Column gap={6}>
				<Flex alignItems="center" gap={12}>
					<Heading.h3 weight={400} animate="slide">
						{hasSetup ? 'Welcome, Adenekan' : 'Hello, Let’s get you started'}
					</Heading.h3>
					<WavingHandIcon width="24" height="24" />
				</Flex>

				<Text color="var(--text-gray)" animate="fade" className="mb-[40px]">
					Launch your dream career journey today.
				</Text>
			</Flex.Column>
			{hasSetup ? (
				<Flex gap={18} flexWrap="wrap">
					{Array.from({ length: 4 }).map((_, i) => (
						<StackCard
							title="All your matches"
							icon={<img src="/images/dashboard/match.png" alt="matches" />}
							key={i}
							href="/"
							tag="5+ jobs"
						/>
					))}
				</Flex>
			) : (
				<SetupChecklist />
			)}
			<Flex.Column gap={24} className={styles.Section}>
				<Heading.h5 weight={800}>Resume Makeover</Heading.h5>
				<Flex fullWidth gap={32} flexWrap="wrap">
					<div className={styles.ActionCard}>
						<div className={styles.ActionCardIcon}>
							<Resumes />
						</div>
						<Heading.h6 weight={800} fontSize="16px">
							New Resume
						</Heading.h6>
						<Text size="sm" color="var(--text-gray)" weight={600}>
							Craft specific resumes to highlight a perfect fit for each role.
						</Text>
						<CallToAction variant="secondary" size="sm" className="mt-[20px]">
							Add Resume
						</CallToAction>
					</div>
					<div className={styles.ActionCard}>
						<div className={styles.ActionCardIcon}>
							<Resumes />
						</div>
						<Heading.h6 weight={800} fontSize="16px">
							Tailor Resume to Job
						</Heading.h6>
						<Text size="sm" color="var(--text-gray)" weight={600}>
							Tailor your resume to each opportunity and boost your job
							applications
						</Text>
						<CallToAction variant="secondary" size="sm" className="mt-[20px]">
							Tailor Resume
						</CallToAction>
					</div>
					<div className={styles.ActionCard}>
						<div className={styles.ActionCardIcon}>
							<Resumes />
						</div>
						<Heading.h6 weight={800} fontSize="16px">
							Update Job Preferences
						</Heading.h6>
						<Text size="sm" color="var(--text-gray)" weight={600}>
							Adjust your criteria to find jobs that align with your career
							aspirations
						</Text>
						<CallToAction variant="secondary" size="sm" className="mt-[20px]">
							Update Preferences
						</CallToAction>
					</div>
				</Flex>
			</Flex.Column>
			<Flex.Column gap={24} className={styles.Section}>
				<Heading.h5 weight={800}>Past Resumes</Heading.h5>
				<Flex fullWidth gap={32} flexWrap="wrap">
					<div className={styles.PastResumes}>
						<div className={styles.ActionCardIcon}>
							<Resumes />
						</div>
						<Heading.h6 weight={800} fontSize="16px">
							New Resume
						</Heading.h6>
						<Text size="sm" color="var(--text-gray)" weight={600}>
							Craft specific resumes to highlight a perfect fit for each role.
						</Text>
						<CallToAction variant="secondary" size="sm" className="mt-[20px]">
							Add Resume
						</CallToAction>
					</div>
				</Flex>
			</Flex.Column>
		</div>
	);
};
