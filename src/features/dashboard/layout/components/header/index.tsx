import React from 'react';
import { TextField } from '@radix-ui/themes';
import Link from 'next/link';

import MagnifyingGlassIcon from '@labs/icons/dashboard/search.svg';
import BellIcon from '@labs/icons/dashboard/notification.svg';

import styles from './header.module.scss';

export const DashboardHeader = () => {
	return (
		<div className={styles.DashboardHeader}>
			<TextField.Root className={styles.DashboardHeaderSearch}>
				<TextField.Slot>
					<MagnifyingGlassIcon height="16" width="16" />
				</TextField.Slot>
				<TextField.Input placeholder="Search in 400k jobs..." />
			</TextField.Root>

			<Link
				href="/dashboard/notification"
				className={styles.DashboardHeaderNotification}
			>
				<BellIcon height="24" width="24" />
			</Link>
		</div>
	);
};
