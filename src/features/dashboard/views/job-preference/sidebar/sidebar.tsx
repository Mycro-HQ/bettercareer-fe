import classNames from 'classnames';
import React from 'react';

import usePreferenceStore from '../store/preference-store';
import { preferenceList } from '../utils';

import { Flex, Text } from '@labs/components';

import styles from './sidebar.module.scss';

interface Props {
	currentIndex: number;
	jumpToTab: (tab: number) => void;
}

export const Sidebar = ({ currentIndex, jumpToTab }: Props) => {
	const store = usePreferenceStore((state) => state);

	const componentsState = [
		[
			store.selectedTargetRoles,
			store.isUserOpenToAllRoleLevel,
			store.selectedRoleLevel,
		],
		[
			store.selectedWorkIndustry,
			store.isUserOpenToAllCompanySize,
			store.selectedCompanySize,
		],
		[store.selectedQualifications],
		[store.selectedLocation, store.selectedPriority],
		[store.minimumSalary],
	];

	function isTabCompleted(activeTabComponentsState: any[]) {
		for (const item of activeTabComponentsState) {
			if (
				item === null ||
				item === undefined ||
				item === 0 ||
				(typeof item === 'string' && item.trim() === '') ||
				(Array.isArray(item) && item.length === 0)
			) {
				return false;
			}
		}
		return true;
	}

	return (
		<aside className={styles.Sidebar}>
			<Flex.Column className={styles.SidebarList}>
				{preferenceList.map((pref, index) => (
					<button
						onClick={() => jumpToTab(index)}
						key={index}
						className={styles.SidebarListItem}
					>
						<div
							className={classNames([
								styles.SidebarListItemIndex,
								styles[
									`SidebarListItemIndex--${isTabCompleted(componentsState[index]) || currentIndex === index}`
								],
							])}
						>
							<Text.span className={styles.SidebarListItemIndex_Text} size="xs">
								{index + 1}
							</Text.span>
						</div>
						<Text.p
							size="sm"
							weight={500}
							className={classNames([
								styles.SidebarListItemText,
								styles[
									`SidebarListItemText--${isTabCompleted(componentsState[index]) || currentIndex === index}`
								],
							])}
						>
							{pref.label}
						</Text.p>
					</button>
				))}
			</Flex.Column>
		</aside>
	);
};
