import React, { useEffect } from 'react';
import classNames from 'classnames';
import Cookies from 'js-cookie';

import { Container } from '@labs/components';
import { Seo } from '@/components/seo';
import { type UserData } from '@/queries/types/user';
import { useGetProfileQuery } from '@/queries/user';
import { useUserStore } from '@/store/z-store/user';

import { DashboardHeader } from './components/header';
import styles from './layout.module.scss';

/**
 * DashboardLayout
 * @description
 * A layout component for the dashboard.
 *
 * @param children - The children to render within the layout.
 * @param title - The title of the page.
 * @param backdropThreshold - The backdropThreshold for the layout backdrop
 *
 * @returns {React.ReactNode} - The rendered component.
 */
export const DashboardLayout = ({
	children,
	title = 'Dashboard',
	backdropThreshold = 'md',
	bare,
	plainBackdrop,
}: {
	children: React.ReactNode;
	title?: string;
	backdropThreshold?: 'sm' | 'md' | 'lg';
	profile?: UserData | null | undefined;
	bare?: boolean;
	plainBackdrop?: boolean;
}) => {
	const { setUser } = useUserStore();
	const { data } = useGetProfileQuery(undefined, {
		enabled: Cookies.get('bc_token') !== undefined,
	});

	useEffect(() => {
		if (data) {
			setUser(data?.user);
		}
	}, [data]);
	return (
		<div
			className={classNames([
				styles.DashboardLayout,
				plainBackdrop ? '' : styles[`DashboardLayout--${backdropThreshold}`],
			])}
		>
			<Seo title={title} />
			<nav className={styles.DashboardLayoutHeader}>
				<div className={styles.DashboardLayoutBanner} />

				<DashboardHeader bare={bare} plainBackdrop={plainBackdrop} />
			</nav>
			<main className={styles.DashboardLayoutMain}>
				<Container maxWidth="lg">{children}</Container>
			</main>
		</div>
	);
};
