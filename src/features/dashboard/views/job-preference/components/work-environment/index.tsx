import React, { useEffect } from 'react';

import usePreferenceStore from '../../store/preference-store';
import style from '../target-role/target-role.module.scss';
import { PreferenceDataType } from '../../utils';

import Building from '@labs/icons/dashboard/blue-building.svg';
import { Flex, Heading, Text } from '@labs/components';

import { WorkIndustryData } from './work-environment-data';
const WorkEnvironment = ({
	handleSelectionChange,
	userPreference,
}: {
	handleSelectionChange: (isSelectionMade: boolean) => void;
	userPreference: PreferenceDataType;
}) => {
	const {
		selectedWorkIndustry,
		handleClickedWorkIndustry,
		setSelectedWorkIndustry,
	} = usePreferenceStore();

	useEffect(() => {
		handleSelectionChange(selectedWorkIndustry.length > 0);
	}, [handleSelectionChange, selectedWorkIndustry.length]);

	useEffect(() => {
		setSelectedWorkIndustry(
			userPreference?.data.workEnvironment.preferredIndustry
		);
	}, [setSelectedWorkIndustry, userPreference]);

	return (
		<Flex.Column gap={24}>
			<Flex alignItems="center" gap={8}>
				<Building />
				<Heading.h3 weight={500} fontSize="18px" color="var(--text-black)">
					Specify your preferred industry
				</Heading.h3>
			</Flex>

			<Flex gap={8} flexWrap="wrap">
				{WorkIndustryData.map((item) => (
					<button
						onClick={() => handleClickedWorkIndustry(item.title)}
						className={
							selectedWorkIndustry.includes(item.title)
								? style.TargetRoleSelected
								: style.TargetRole
						}
						key={item.id}
					>
						<Text.p
							fontSize="14px"
							weight={500}
							color={
								selectedWorkIndustry.includes(item.title)
									? 'var(--primary-blue)'
									: 'var(--text-black)'
							}
						>
							{item.title}
						</Text.p>
					</button>
				))}
			</Flex>
		</Flex.Column>
	);
};

export default WorkEnvironment;
