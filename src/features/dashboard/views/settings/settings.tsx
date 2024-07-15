import React from 'react';
import * as Tabs from '@radix-ui/react-tabs';

import { SettingsHeader } from './components';
import { SecurityTab, NotificationPreferencesTab } from './sections';

export type tabType = 'Billing' | 'Security' | 'Notification Preferences';

export const Settings = () => {
	const [selectedTab, setSelectedTab] = React.useState<tabType>('Billing');

	return (
		<>
			<Tabs.Root defaultValue="Billing">
				<SettingsHeader tab={selectedTab} setTab={setSelectedTab} />
				<div className="pt-3">
					<Tabs.Content value="Billing">
						<p>TBD</p>
					</Tabs.Content>
					<Tabs.Content value="Security">
						<SecurityTab />
					</Tabs.Content>
					<Tabs.Content value="Notification Preferences">
						<NotificationPreferencesTab />
					</Tabs.Content>
				</div>
			</Tabs.Root>
		</>
	);
};
