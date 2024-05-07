import React, { useEffect } from 'react';

import usePreferenceStore from '../../store/preference-store';

import Briefcase from '@labs/icons/dashboard/briefcase-blue.svg';
import Checkbox from '@labs/icons/dashboard/square-checkbox.svg';
import Tick from '@labs/icons/dashboard/blue-tick.svg';
import { Flex, Heading, Text } from '@labs/components';

import style from './target-role.module.scss';
import { RoleLevelData } from './target-role-data';

const RoleLevel = ({
	handleSelectionChange,
}: {
	handleSelectionChange: (isSelectionMade: boolean) => void;
}) => {
	const { selectedRoleLevel, handleClickedRoleLevel } = usePreferenceStore();

	useEffect(() => {
		handleSelectionChange(selectedRoleLevel.length > 0);
	}, [handleSelectionChange, selectedRoleLevel.length]);

	return (
		<Flex.Column gap={24}>
			<Flex alignItems="center" gap={8}>
				<Briefcase />
				<Heading.h3 weight={500} fontSize="18px" color="var(--text-black)">
					What kind of roles are you interested in ?
				</Heading.h3>
			</Flex>

			<Flex gap={8} flexWrap="wrap">
				{RoleLevelData.map((item) => (
					<button
						onClick={() => handleClickedRoleLevel(item.title)}
						className={
							selectedRoleLevel.includes(item.title)
								? style.TargetRoleSelected
								: style.TargetRole
						}
						key={item.id}
					>
						<Flex gap={8} alignItems="center">
							{selectedRoleLevel.includes(item.title) ? <Tick /> : <Checkbox />}

							<Text.p
								fontSize="14px"
								weight={500}
								color={
									selectedRoleLevel.includes(item.title)
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

export default RoleLevel;
