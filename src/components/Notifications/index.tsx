import React from 'react';
import styles from './Notifications.module.scss';
import { CallToAction, Flex, Heading, Text, Container } from '@labs/components';
import BellIcon from '@labs/icons/dashboard/bell.svg';
import JobIcon from '@labs/icons/dashboard/jobs.svg';
import CheckMonochromeIcon from '@labs/icons/dashboard/check_monochrome.svg';

function NotificationListContainer({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<Flex.Column
			alignItems="center"
			className={styles.NotificationListContainer}
		>
			{children}
		</Flex.Column>
	);
}

interface NotificationListItemProps {
	type?: 'projectSetup' | 'job';
	title: string;
	description?: string;
	sideButtons?: boolean;
}

function NotificationListItem({
	title,
	description,
	type = 'job',
	sideButtons = true,
}: NotificationListItemProps) {
	return (
		<Flex direction="row" className={styles.NotificationListItem}>
			<Flex
				alignItems="center"
				justifyContent="center"
				shrink={1}
				className="rounded-[50%] border-2 border-solid border-[#F3F4F4] bg-[#F9FAFA] mr-6"
			>
				{type === 'job' ? <JobIcon /> : <CheckMonochromeIcon />}
			</Flex>
			<Flex.Column gap={6}>
				<Heading.h4 weight={400}>{title}</Heading.h4>
				<Text color="var(--text-gray)">
					{description ??
						'This opportunity closely aligns with your skills and preferences. Act fast, applications close soon!'}
				</Text>
			</Flex.Column>
			<div className="justify-end">
				{sideButtons && (
					<Flex.Row gap={8} className="justify-self-end">
						<CallToAction outline>Save</CallToAction>
						<CallToAction>Apply</CallToAction>
					</Flex.Row>
				)}
			</div>
		</Flex>
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
				<NotificationListItem title="" />
				<NotificationListItem title="job" description="mad man apply" />
				<NotificationListItem title="" />
			</NotificationListContainer>
		</div>
	);
}
