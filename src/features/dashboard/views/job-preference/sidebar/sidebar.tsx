import classNames from 'classnames';
import React from 'react';

import { Flex, Text } from '@labs/components';

import styles from './sidebar.module.scss';

interface Props {
	currentIndex: number;
	preferenceList: {
		component: React.JSX.Element;
		label: string;
	}[];
}

export const Sidebar = ({ currentIndex, preferenceList }: Props) => {
	return (
		<aside className={styles.Sidebar}>
			<Flex.Column className={styles.SidebarList}>
				{preferenceList.map((pref, index) => (
					<Flex key={index} className={styles.SidebarListItem}>
						<div
							className={classNames([
								styles.SidebarListItemIndex,
								styles[`SidebarListItemIndex--${index <= currentIndex}`],
							])}
						>
							<Text.span size="xs">{index + 1}</Text.span>
						</div>
						<Text.p
							size="sm"
							weight={500}
							className={classNames([
								styles.SidebarListItemText,
								styles[`SidebarListItemText--${index <= currentIndex}`],
							])}
						>
							{pref.label}
						</Text.p>
					</Flex>
				))}
			</Flex.Column>
		</aside>
	);
};
