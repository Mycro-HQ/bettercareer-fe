import React from 'react';

import { DashboardLayout } from '@/features/dashboard';
import { UploadResumeFlow } from '@/features/onboarding';

const UploadResumePage = () => {
	return (
		<>
			<DashboardLayout bg="#fcfcfc" bare backdropThreshold="sm">
				<UploadResumeFlow isOwnPage />
			</DashboardLayout>
		</>
	);
};

export default UploadResumePage;
