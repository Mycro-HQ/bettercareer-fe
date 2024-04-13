import React from 'react';

import { DashboardHome } from '@/features/dashboard';
import { DashboardLayout } from '@/features/dashboard/layout';
import { useUserStore } from '@/store/z-store/user';
import DashboardJobs from '@/features/dashboard/views/jobs/jobs';

export const Jobs = () => {
	const { profile } = useUserStore();

	return (
		<>
			<DashboardLayout title="Jobs" backdropThreshold="md" profile={profile}>
				<DashboardJobs />
			</DashboardLayout>
		</>
	);
};

export default Jobs;
