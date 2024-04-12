import React from 'react';
import { Jobs } from '@/features/dashboard/';
import { DashboardLayout } from '@/features/dashboard/layout';
import { useUserStore } from '@/store/z-store/user';

export default function JobsPage() {
	const { profile } = useUserStore();

	return (
		<DashboardLayout title="Jobs" backdropThreshold="lg" profile={profile}>
			<Jobs />
		</DashboardLayout>
	);
}
