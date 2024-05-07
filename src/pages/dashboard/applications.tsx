import React from 'react';

import { Applications } from '@/features/dashboard/';
import { DashboardLayout } from '@/features/dashboard/layout';
import { useUserStore } from '@/store/z-store/user';

export default function ApplicationsPage() {
	const { profile } = useUserStore();

	return (
		<DashboardLayout title="Jobs" backdropThreshold="md" profile={profile}>
			<Applications />
		</DashboardLayout>
	);
}
