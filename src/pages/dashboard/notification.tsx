import React from 'react';

import Notifications from '@/components/Notifications';
import { DashboardLayout } from '@/features/dashboard/layout';

export default function Notification() {
	return (
		<DashboardLayout backdropThreshold="md" title="Notifications">
			<Notifications />
		</DashboardLayout>
	);
}
