import React, { useEffect } from 'react';
import classNames from 'classnames';

import usePreferenceStore from '../../store/preference-store';
import style from '../target-role/target-role.module.scss';
import { PreferenceDataType } from '../../utils';

import { Flex, Heading, Text } from '@labs/components';
import UserGroup from '@labs/icons/dashboard/user-group.svg';

const OpenToAllCompanySize = ({
	handleSelectionChange,
	userPreference,
}: {
	handleSelectionChange: (isSelectionMade: boolean) => void;
	userPreference: PreferenceDataType;
}) => {
	const { isUserOpenToAllCompanySize, handleIsUserOpenToAllCompanySize } =
		usePreferenceStore();

	useEffect(() => {
		handleSelectionChange(isUserOpenToAllCompanySize !== null);
	}, [handleSelectionChange, isUserOpenToAllCompanySize]);

	useEffect(() => {
		if (!userPreference?.data?.workEnvironment?.openToAllCompanySizes) return;

		const option =
			userPreference?.data.workEnvironment.openToAllCompanySizes === 'yes';
		handleIsUserOpenToAllCompanySize(option);
	}, [handleIsUserOpenToAllCompanySize, userPreference]);

	return (
		<Flex.Column gap={24}>
			<Flex alignItems="center" gap={8}>
				<UserGroup />
				<Heading.h3 weight={500} fontSize="18px" color="var(--text-black)">
					Open to all company sizes ?
				</Heading.h3>
			</Flex>

			<Flex gap={8} flexWrap="wrap">
				<button
					onClick={() => handleIsUserOpenToAllCompanySize(false)}
					className={classNames({
						[style.TargetRoleSelected]: isUserOpenToAllCompanySize === false,
						[style.TargetRole]: isUserOpenToAllCompanySize !== false,
						[style.TabBtn]: true,
					})}
				>
					<Text.p
						fontSize="14px"
						weight={500}
						color={
							isUserOpenToAllCompanySize === false
								? 'var(--primary-blue)'
								: 'var(--text-black)'
						}
					>
						No
					</Text.p>
				</button>

				<button
					onClick={() => handleIsUserOpenToAllCompanySize(true)}
					style={{ padding: '10px 32px' }}
					className={
						isUserOpenToAllCompanySize
							? style.TargetRoleSelected
							: style.TargetRole
					}
				>
					<Text.p
						fontSize="14px"
						weight={500}
						color={
							isUserOpenToAllCompanySize
								? 'var(--primary-blue)'
								: 'var(--text-black)'
						}
					>
						Yes
					</Text.p>
				</button>
			</Flex>
		</Flex.Column>
	);
};

export default OpenToAllCompanySize;
