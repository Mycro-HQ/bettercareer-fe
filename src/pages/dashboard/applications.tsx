import React from 'react';

import { Applications } from '@/features/dashboard/';
import { DashboardLayout } from '@/features/dashboard/layout';
import { useUserStore } from '@/store/z-store/user';

export default function ApplicationsPage() {
	return (
		<DashboardLayout title="Jobs" backdropThreshold="md" containerSize="xlg">
			<Applications />
		</DashboardLayout>
	);
}
