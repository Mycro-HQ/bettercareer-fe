import React, { useEffect } from 'react';

import style from '../target-role/target-role.module.scss';
import usePreferenceStore from '../../store/preference-store';
import { PreferenceDataType } from '../../utils';

import { Flex, Heading, Text } from '@labs/components';
import UserGroup from '@labs/icons/dashboard/user-group.svg';
import Checkbox from '@labs/icons/dashboard/square-checkbox.svg';
import Tick from '@labs/icons/dashboard/blue-tick.svg';

import { CompanySizeData } from './work-environment-data';

const CompanySize = ({
	handleSelectionChange,
	userPreference,
}: {
	handleSelectionChange: (isSelectionMade: boolean) => void;
	userPreference: PreferenceDataType;
}) => {
	const { selectedCompanySize, handleClickedCompanySize } =
		usePreferenceStore();

	useEffect(() => {
		handleSelectionChange(selectedCompanySize.length > 0);
	}, [handleSelectionChange, selectedCompanySize.length]);

	useEffect(() => {
		handleClickedCompanySize(userPreference?.data.workEnvironment.companySize);
	}, [handleClickedCompanySize, userPreference]);

	return (
		<Flex.Column gap={24}>
			<Flex alignItems="center" gap={8}>
				<UserGroup />
				<Heading.h3 weight={500} fontSize="18px" color="var(--text-black)">
					Indicate your preference for company size
				</Heading.h3>
			</Flex>

			<Flex gap={8} flexWrap="wrap">
				{CompanySizeData.map((item) => (
					<button
						onClick={() => handleClickedCompanySize(item.title)}
						className={
							selectedCompanySize.includes(item.title)
								? style.TargetRoleSelected
								: style.TargetRole
						}
						key={item.id}
					>
						<Flex gap={8} alignItems="center">
							{selectedCompanySize.includes(item.title) ? (
								<Tick />
							) : (
								<Checkbox />
							)}

							<Text.p
								fontSize="14px"
								weight={500}
								color={
									selectedCompanySize.includes(item.title)
										? 'var(--primary-blue)'
										: 'var(--text-black)'
								}
							>
								{item.title}
							</Text.p>
						</Flex>
					</button>
				))}
			</Flex>
		</Flex.Column>
	);
};

export default CompanySize;
