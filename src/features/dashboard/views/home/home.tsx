import React from 'react';
import { CallToAction, Flex, Heading, Text } from '@labs/components';

import WavingHandIcon from '@labs/icons/dashboard/wave-hand.svg';
import Resumes from '@labs/icons/dashboard/resumes.svg';
import FileIcon from '@labs/icons/dashboard/file.svg';
import ResumeIcon from '@labs/icons/dashboard/file_1.svg';
import Selection from '@labs/icons/dashboard/selection.svg';
import JobIcon from '@labs/icons/dashboard/calendar.svg';
import SponsorIcon from '@labs/icons/dashboard/tag.svg';
import NewResume from '@labs/icons/dashboard/upload.svg';

import { SetupChecklist } from './components/setup-checklist';

import { StackCard } from './components/stack-card/stack-card';

import { type UserData } from '@/queries/types/user';

import styles from './home.module.scss';

export const DashboardHome = ({
	profile,
}: {
	profile: UserData | null | undefined;
}) => {
	const hasSetup = false;

	const recommendationSections = [
		{
			title: 'All your matches',
			icon: '/images/dashboard/match.png',
			href: '/',
			tag: '5+ jobs',
		},
		{
			title: 'Based on your Resume',
			icon: ResumeIcon,
			href: '/',
			tag: '5+ jobs',
		},
		{
			title: 'Jobs added this week',
			icon: JobIcon,
			href: '/',
			tag: '5+ jobs',
		},
		{
			title: 'Sponsored jobs',
			icon: SponsorIcon,
			href: '/',
			tag: '5+ jobs',
		},
	];

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
					{recommendationSections.map((rcmd, i) => (
						<StackCard
							title={rcmd.title}
							icon={
								typeof rcmd.icon === 'string' ? (
									<img src="/images/dashboard/match.png" alt="matches" />
								) : (
									<rcmd.icon />
								)
							}
							key={i}
							href={rcmd.href}
							tag={rcmd.tag}
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
							<NewResume />
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
							<Selection />
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
					<div className={styles.PastResume}>
						<div className={styles.PastResumeInfo}>
							<Heading.h6 weight={800} fontSize="16px">
								Adenekan_META_Resume
							</Heading.h6>
							<Flex gap={2} alignItems="center">
								<FileIcon />
								<Text size="sm" color="var(--text-gray-light)">
									Built Feb 23, 2024
								</Text>
							</Flex>{' '}
						</div>
					</div>
				</Flex>
			</Flex.Column>
		</div>
	);
};
