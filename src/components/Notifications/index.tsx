import React from 'react';
import styles from './Notifications.module.scss';
import { CallToAction, Flex, Text } from '@labs/components';

import JobIcon from '@labs/icons/dashboard/jobs.svg';
import CheckMonochromeIcon from '@labs/icons/dashboard/check_monochrome.svg';
import CloseIcon from '@labs/icons/dashboard/X.svg';

import classNames from 'classnames';

import { NotificationListItemProps } from '@labs/utils/types/utility';

export function NotificationListItem({
	title,
	description,
	time,
	type = 'job',
	size = 'normal',
}: NotificationListItemProps) {
	return (
		<div
			className={classNames(
				styles.NotificationListItem,
				size === 'large' &&
					'first:p-6 first:!scale-x-100 first:scale-y-100 first:rounded-xl first:shadow-[0px_4px_33px_0px_rgba(0,0,0,0.02)]'
			)}
		>
			<div className="rounded-[38px] aspect-square p-4 border-2 border-[#F3F4F4] bg-[#F9FAFA] mr-6">
				{type === 'job' ? <JobIcon /> : <CheckMonochromeIcon />}
			</div>
			<Flex.Column gap={6}>
				<Text color="var(--text-black)" weight={600} fontSize="16px">
					{title}
				</Text>
				<Text color="#3F4C58" fontSize="14px" weight={500}>
					{description}
				</Text>
				<Text color="#3F4C58" fontSize="12px" weight={600} className="mt-4">
					{time} ago
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

export default function Notifications({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className={styles.NotificationsContainer}>
			<Flex.Column
				alignItems="center"
				className={styles.NotificationListContainer}
				gap={40}
			>
				{children}
			</Flex.Column>
		</div>
	);
}
