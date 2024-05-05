import classNames from 'classnames';
import React from 'react';

import usePreferenceStore from '../store/preference-store';

import { Flex, Text } from '@labs/components';

import styles from './sidebar.module.scss';

interface Props {
	currentIndex: number;
	preferenceList: {
		label: string;
		component: (({}: {
			handleSelectionChange: () => void;
		}) => React.JSX.Element)[];
	}[];
	jumpToTab: (tab: number) => void;
}

export const Sidebar = ({ currentIndex, preferenceList, jumpToTab }: Props) => {
	const {
		selectedTargetRoles,
		isUserOpenToAllRoleLevel,
		selectedRoleLevel,
		selectedWorkIndustry,
		isUserOpenToAllCompanySize,
		selectedCompanySize,
		selectedQualifications,
		selectedLocation,
		selectedPriority,
		minimumSalary,
	} = usePreferenceStore();

	const componentsState = [
		[selectedTargetRoles, isUserOpenToAllRoleLevel, selectedRoleLevel],
		[selectedWorkIndustry, isUserOpenToAllCompanySize, selectedCompanySize],
		[selectedQualifications],
		[selectedLocation, selectedPriority],
		[minimumSalary],
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
