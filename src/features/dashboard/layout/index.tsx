import React from 'react';
import classNames from 'classnames';

import { DashboardSidebar } from './components/sidebar';
import { DashboardHeader } from './components/header';

import { Seo } from '@/components/seo';

import styles from './layout.module.scss';

export const DashboardLayout = ({
	children,
	title = 'Dashboard',
}: {
	children: React.ReactNode;
	title?: string;
}) => {
	const [collapsed, setCollapsed] = React.useState(false);
	return (
		<div
			className={classNames([
				styles.DashboardLayout,
				collapsed && styles.DashboardLayoutCollapsed,
			])}
		>
			<Seo title={title} />
			<aside className={`data-aside ${styles.DashboardLayoutAside}`}>
				<DashboardSidebar collapsed={collapsed} setCollapsed={setCollapsed} />
			</aside>
			<main className={styles.DashboardLayoutMain}>
				<DashboardHeader />
				{children}
			</main>
		</div>
	);
};
