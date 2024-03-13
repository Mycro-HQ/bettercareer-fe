import React from 'react';
import styles from './Notifications.module.scss';
import { CallToAction, Flex, Heading, Text } from '@labs/components';

import BellIcon from '@labs/icons/dashboard/bell.svg';
import JobIcon from '@labs/icons/dashboard/jobs.svg';
import CheckMonochromeIcon from '@labs/icons/dashboard/check_monochrome.svg';
import CloseIcon from '@labs/icons/dashboard/X.svg';

function NotificationListContainer({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<Flex.Column
			alignItems="center"
			className={styles.NotificationListContainer}
			gap={40}
		>
			{children}
		</Flex.Column>
	);
}

interface NotificationListItemProps {
	type?: 'projectSetup' | 'job';
	title: string;
	description?: string;
}

function NotificationListItem({
	title,
	description,
	type = 'job',
}: NotificationListItemProps) {
	return (
		<div className={styles.NotificationListItem}>
			<div className="rounded-[38px] aspect-square p-4 border-2 border-[#F3F4F4] bg-[#F9FAFA] mr-6">
				{type === 'job' ? <JobIcon /> : <CheckMonochromeIcon />}
			</div>
			<Flex.Column gap={6}>
				<Heading.h4 weight={400}>{title}</Heading.h4>
				<Text color="var(--text-gray)">
					{description ??
						'This opportunity closely aligns with your skills and preferences. Act fast, applications close soon!'}
				</Text>
			</Flex.Column>
			<div className="justify-end">
				<Flex.Row gap={8} className="justify-self-end justify-end">
					{type === 'job' ? (
						<>
							<CallToAction outline>Save</CallToAction>
							<CallToAction>Apply</CallToAction>
						</>
					) : (
						<CallToAction variant="clear">
							<CloseIcon />
						</CallToAction>
					)}
				</Flex.Row>
			</div>
		</div>
	);
}

export default function Notifications() {
	return (
		<div className={styles.NotificationsContainer}>
			<Flex.Column gap={6}>
				<Flex alignItems="center" gap={12}>
					<Heading.h3 weight={400} animate="slide">
						Notifications
					</Heading.h3>
					<BellIcon />
				</Flex>

				<Text color="var(--text-gray)" animate="fade" className="mb-[40px]">
					Lets catch you up on what you missed.
				</Text>
			</Flex.Column>
			<NotificationListContainer>
				<NotificationListItem title="Top Job Match: Product Designer at Dribbble" />
				<NotificationListItem
					title="Top Job Match: Product Designer at Dribbble"
					description="man apply"
				/>
				<NotificationListItem title="Top Job Match: Product Designer at Dribbble" />
				<NotificationListItem
					type="projectSetup"
					title="Your profile is 75% complete"
					description="Adding a few details can significantly increase your visibility to recruiters. Finish setting up your profile today."
				/>
			</NotificationListContainer>
		</div>
	);
}
