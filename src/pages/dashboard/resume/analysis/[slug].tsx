import React from 'react';

import { ResumeAnalysis } from '@/features/dashboard';
import { DashboardLayout } from '@/features/dashboard/layout';
import { useUserStore } from '@/store/z-store/user';

export const ResumeAnalysisPage = () => {
	const { profile } = useUserStore();

	return (
		<DashboardLayout
			title="Resume Analysis"
			bare
			backdropThreshold="md"
			profile={profile}
		>
			<ResumeAnalysis />
		</DashboardLayout>
	);
};

export default ResumeAnalysisPage;
