import React from 'react';
import { TabsContent, Root } from '@radix-ui/react-tabs';

import { SettingsHeader } from './components';
import { SecurityTab, NotificationPreferencesTab } from './sections';

export type tabType = 'Billing' | 'Security' | 'Notification Preferences';

export const Settings = () => {
	const [selectedTab, setSelectedTab] = React.useState<tabType>('Billing');

	return (
		<>
			<Root defaultValue="Billing">
				<SettingsHeader tab={selectedTab} setTab={setSelectedTab} />
				<div className="pt-3">
					<TabsContent value="Billing">
						<p>TBD</p>
					</TabsContent>
					<TabsContent value="Security">
						<SecurityTab />
					</TabsContent>
					<TabsContent value="Notification Preferences">
						<NotificationPreferencesTab />
					</TabsContent>
				</div>
			</Root>
		</>
	);
};
