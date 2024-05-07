import React from 'react';
import { Jobs } from '@/features/dashboard/';
import { DashboardLayout } from '@/features/dashboard/layout';

export default function JobsPage() {
	return (
		<DashboardLayout
			title="Jobs"
			containerSize="xlg"
			bg="#ffb23312"
			backdropThreshold="sm"
		>
			<Jobs />
		</DashboardLayout>
	);
}
