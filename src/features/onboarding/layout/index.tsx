import React from 'react';
import { motion } from 'framer-motion';
import { Container } from '@labs/components';

import { Seo } from '@/components/seo';
import Logo from '@labs/icons/logo.svg';

import styles from './layout.module.scss';

interface OnboardingLayoutProps {
	/**
	 * The content of the layout
	 */
	children: React.ReactNode;
	/**
	 * The title of the layout
	 * @default ''
	 */
	title: string;
	/**
	 * Layout Infographic
	 * @default ''
	 */
	adjacentContent?: React.ReactNode;

	header?: boolean;
	center?: boolean;
}

export const OnboardingLayout = ({
	children,
	title,
	adjacentContent,
	header = true,
	center = true,
}: OnboardingLayoutProps) => {
	return (
		<>
			<Seo title={title} />
			<div className={styles.Layout}>
				<div className={styles.LayoutContentContain}>
					<Container fluid>
						<div className={styles.LayoutContentWrap}>
							{header && (
								<div className={styles.Logo}>
									<Logo />
								</div>
							)}

							<div className={center ? styles.LayoutContent : ''}>
								{children}
							</div>
						</div>
					</Container>
				</div>
				{adjacentContent && (
					<motion.div
						className={styles.LayoutInfographic}
						initial={{ opacity: 0, x: 10 }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: 10 }}
					>
						{adjacentContent}
					</motion.div>
				)}
			</div>
		</>
	);
};
