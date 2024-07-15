import React from 'react';
import * as Tabs from '@radix-ui/react-tabs';

import type { tabType } from '../settings';

import { Text, Heading, Flex } from '@labs/components';

export default function SettingsHeader({
	tab,
	setTab,
}: {
	tab: tabType;
	setTab: React.Dispatch<React.SetStateAction<tabType>>;
}) {
	return (
		<Flex.Column gap={24}>
			<Heading.h1 fontSize="28px" weight={600} lineHeight="32px">
				Settings
			</Heading.h1>
			<Tabs.List color="#1388f2" className="w-full flex gap-x-6 xl:gap-x-14">
				<Tabs.Trigger value="Billing">
					<SettingsHeaderTab title="Billing" tab={tab} setTab={setTab} />
				</Tabs.Trigger>
				<Tabs.Trigger value="Security">
					<SettingsHeaderTab title="Security" tab={tab} setTab={setTab} />
				</Tabs.Trigger>
				<Tabs.Trigger value="Notification Preferences">
					<SettingsHeaderTab
						title="Notification Preferences"
						tab={tab}
						setTab={setTab}
					/>
				</Tabs.Trigger>
			</Tabs.List>
		</Flex.Column>
	);
}

function SettingsHeaderTab({
	title,
	tab,
	setTab,
}: {
	title: tabType;
	tab: tabType;
	setTab: React.Dispatch<React.SetStateAction<tabType>>;
}) {
	return (
		<Text
			color={tab === title ? '#1388F2' : '#6F7982'}
			fontSize="var(--font-h6)"
			weight={600}
			lineHeight="26px"
			onClick={() => setTab(title)}
			className={'cursor-pointer pb-2'}
		>
			{title}
		</Text>
	);
}
