import React from 'react';

import { Settings } from '@/features/dashboard/';
import { DashboardLayout } from '@/features/dashboard/layout';
import { useUserStore } from '@/store/z-store/user';

export default function ApplicationsPage() {
	const { profile } = useUserStore();

	return (
		<DashboardLayout title="Settings" profile={profile} plainBackdrop>
			<Settings />
		</DashboardLayout>
	);
}
