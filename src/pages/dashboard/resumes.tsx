import React from 'react';

import { Resumes } from '@/features/dashboard';
import { DashboardLayout } from '@/features/dashboard/layout';

export const ResumesPage = () => {
	return (
		<DashboardLayout title="All Resumes" bg="#ff916612" backdropThreshold="md">
			<Resumes />
		</DashboardLayout>
	);
};

export default ResumesPage;
