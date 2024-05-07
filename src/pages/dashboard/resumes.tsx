import React from 'react';

import { Resumes } from '@/features/dashboard';
import { DashboardLayout } from '@/features/dashboard/layout';
import { useUserStore } from '@/store/z-store/user';

export const ResumesPage = () => {
	return (
		<DashboardLayout title="All Resumes" backdropThreshold="md">
			<Resumes />
		</DashboardLayout>
	);
};

export default ResumesPage;
