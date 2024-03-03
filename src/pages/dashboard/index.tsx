import React from 'react';

import { DashboardHome } from '@/features/dashboard';
import { DashboardLayout } from '@/features/dashboard/layout';

export const Dashboard = () => {
	return (
		<DashboardLayout>
			<DashboardHome />
		</DashboardLayout>
	);
};

export default Dashboard;
