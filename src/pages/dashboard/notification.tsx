import React from 'react';

import BellIcon from '@labs/icons/dashboard/bell.svg';
import { Flex, Heading, Text } from '@labs/components';

import Notifications, {
	NotificationListItem,
} from '@/components/Notifications';
import { DashboardLayout } from '@/features/dashboard/layout';

import { NotificationListItemProps } from '@labs/utils/types/utility';

function NotificationHeader() {
	return (
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
	);
}

interface NotificationListItemWithKey extends NotificationListItemProps {
	key: string;
}

const notificationArray: NotificationListItemWithKey[] = [
	{
		key: '0',
		type: 'job',
		title: 'Top Job Match: Product Designer at Dribbble',
		description:
			'This opportunity closely aligns with your skills and preferences. Act fast, applications close soon!',
		time: '30 mins',
		size: 'large',
	},
	{
		key: '1',
		type: 'job',
		title: 'Top Job Match: Product Designer at Dribbble',
		description:
			'This opportunity closely aligns with your skills and preferences. Act fast, applications close soon!',
		time: '30 mins',
	},
	{
		key: '2',
		type: 'job',
		title: 'Top Job Match: Product Designer at Dribbble',
		description:
			'This opportunity closely aligns with your skills and preferences. Act fast, applications close soon!',
		time: '30 mins',
	},
	{
		key: '3',
		type: 'projectSetup',
		title: 'Your profile is 75% complete',
		description:
			'Adding a few details can significantly increase your visibility to recruiters. Finish setting up your profile today.',
		time: '30 mins',
	},
];

export default function Notification() {
	return (
		<DashboardLayout backdropThreshold="md" title="Notifications">
			<NotificationHeader />
			<Notifications>
				{notificationArray.map((notification) => (
					<NotificationListItem {...notification} />
				))}
			</Notifications>
		</DashboardLayout>
	);
}
