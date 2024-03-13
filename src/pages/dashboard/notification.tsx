import React from 'react';

import BellIcon from '@labs/icons/dashboard/bell.svg';
import { Flex, Heading, Text } from '@labs/components';

import Notifications, {
	NotificationListItem,
} from '@/components/Notifications';
import { DashboardLayout } from '@/features/dashboard/layout';

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

export default function Notification() {
	return (
		<DashboardLayout backdropThreshold="md" title="Notifications">
			<NotificationHeader />
			<Notifications>
				<NotificationListItem
					title="Top Job Match: Product Designer at Dribbble"
					description="This opportunity closely aligns with your skills and preferences. Act fast, applications close soon!"
					time="30 mins"
				/>
				<NotificationListItem
					title="Top Job Match: Product Designer at Dribbble"
					description="This opportunity closely aligns with your skills and preferences. Act fast, applications close soon!"
					time="30 mins"
				/>
				<NotificationListItem
					title="Top Job Match: Product Designer at Dribbble"
					description="This opportunity closely aligns with your skills and preferences. Act fast, applications close soon!"
					time="30 mins"
				/>
				<NotificationListItem
					type="projectSetup"
					title="Your profile is 75% complete"
					description="Adding a few details can significantly increase your visibility to recruiters. Finish setting up your profile today."
					time="30 mins"
				/>
			</Notifications>
		</DashboardLayout>
	);
}
