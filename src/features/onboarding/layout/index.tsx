import { Seo } from '@/components/seo';
import React from 'react';

import Logo from '@labs/icons/logo.svg';

import styles from './layout.module.scss';

interface OnboardingLayoutProps {
	children: React.ReactNode;
	title: string;
}

export const OnboardingLayout = ({
	children,
	title,
}: OnboardingLayoutProps) => {
	return (
		<>
			<Seo title={title} />
			<div className={styles.Layout}>
				<div className={styles.Contain}>
					<div className={styles.LayoutContentWrap}>
						<div className={styles.Logo}>
							<Logo />
						</div>
						<div className={styles.LayoutContent}>{children}</div>
					</div>
				</div>

				<div className={styles.LayoutInfographic} />
			</div>
		</>
	);
};
