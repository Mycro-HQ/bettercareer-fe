import React, { useEffect } from 'react';
import classNames from 'classnames';

import usePreferenceStore from '../../store/preference-store';

import Briefcase from '@labs/icons/dashboard/briefcase-blue.svg';
import { Flex, Heading, Text } from '@labs/components';

import style from './target-role.module.scss';
const OpenToAllRoleLevel = () => {
	const {
		isUserOpenToAllRoleLevel,
		handleIsUserOpenToAllRoleLevel,
		setIsButtonDisabled,
	} = usePreferenceStore();

	useEffect(() => {
		if (isUserOpenToAllRoleLevel !== null) {
			setIsButtonDisabled(false);
		} else {
			setIsButtonDisabled(true);
		}
	}, [isUserOpenToAllRoleLevel, setIsButtonDisabled]);

	return (
		<Flex.Column gap={24}>
			<Flex alignItems="center" gap={8}>
				<Briefcase />
				<Heading.h3 weight={500} fontSize="18px" color="var(--text-black)">
					Are you open to all level of role ?
				</Heading.h3>
			</Flex>

			<Flex gap={8} flexWrap="wrap">
				<button
					onClick={() => handleIsUserOpenToAllRoleLevel(false)}
					style={{ padding: '10px 32px' }}
					className={classNames({
						[style.TargetRoleSelected]: isUserOpenToAllRoleLevel === false,
						[style.TargetRole]: isUserOpenToAllRoleLevel !== false,
						[style.TabBtn]: true,
					})}
				>
					<Text.p
						fontSize="14px"
						weight={500}
						color={
							isUserOpenToAllRoleLevel === false
								? 'var(--primary-blue)'
								: 'var(--text-black)'
						}
					>
						No
					</Text.p>
				</button>

				<button
					onClick={() => handleIsUserOpenToAllRoleLevel(true)}
					style={{ padding: '10px 32px' }}
					className={
						isUserOpenToAllRoleLevel
							? style.TargetRoleSelected
							: style.TargetRole
					}
				>
					<Text.p
						fontSize="14px"
						weight={500}
						color={
							isUserOpenToAllRoleLevel
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

export default OpenToAllRoleLevel;
