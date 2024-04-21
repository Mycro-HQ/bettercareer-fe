import classNames from 'classnames';
import React from 'react';

import { Flex, Text } from '@labs/components';

import styles from './sidebar.module.scss';

interface Props {
	preferenceList: {
		component: React.JSX.Element;
		done: boolean;
		label: string;
	}[];
}

export const Sidebar = ({ preferenceList }: Props) => {
	return (
		<aside className={styles.Sidebar}>
			<Flex.Column className={styles.SidebarList}>
				{preferenceList.map((pref, i) => (
					<Flex key={i} className={styles.SidebarListItem}>
						<div
							className={classNames([
								styles.SidebarListItemIndex,
								styles[`SidebarListItemIndex--${pref.done}`],
							])}
						>
							<Text.span size="xs">{i + 1}</Text.span>
						</div>
						<Text.p
							size="sm"
							weight={500}
							className={classNames([
								styles.SidebarListItemText,
								styles[`SidebarListItemText--${pref.done}`],
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
