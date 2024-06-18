import React from 'react';

import { Settings } from '@/features/dashboard/';
import { DashboardLayout } from '@/features/dashboard/layout';

export default function ApplicationsPage() {
	return (
		<DashboardLayout title="Settings" backdropThreshold="sm" bg="#fcfcfc">
			<Settings />
		</DashboardLayout>
	);
}
