import React from 'react';

import { DashboardHome } from '@/features/dashboard';
import { DashboardLayout } from '@/features/dashboard/layout';
import { useUserStore } from '@/store/z-store/user';

export const Dashboard = () => {
	const { profile } = useUserStore();

	return (
		<DashboardLayout backdropThreshold="md" profile={profile}>
			<DashboardHome profile={profile} />
		</DashboardLayout>
	);
};

export default Dashboard;
