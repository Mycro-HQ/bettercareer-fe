import React, { useState } from 'react';

import Briefcase from '@labs/icons/dashboard/briefcase-blue.svg';
import { Flex, Heading, Text } from '@labs/components';

import style from './target-role.module.scss';
import { TargetRolesData } from './target-role-data';

const TargetRole = () => {
	const [selectedRoles, setSelectedRoles] = useState<string[]>([]);

	const handleClickedRoles = (role: string) => {
		if (selectedRoles.includes(role)) {
			setSelectedRoles(selectedRoles.filter((item) => item !== role));
		} else {
			setSelectedRoles([...selectedRoles, role]);
		}
	};
	return (
		<Flex.Column gap={24}>
			<Flex alignItems="center" gap={8}>
				<Briefcase />
				<Heading.h3 weight={500} fontSize="18px" color="var(--text-black)">
					What kind of roles are you interested in ?
				</Heading.h3>
			</Flex>

			<Flex gap={8} flexWrap="wrap">
				{TargetRolesData.map((item) => (
					<button
						onClick={() => handleClickedRoles(item.title)}
						className={
							selectedRoles.includes(item.title)
								? style.TargetRoleSelected
								: style.TargetRole
						}
						key={item.id}
					>
						<Text.p
							fontSize="14px"
							weight={500}
							color={
								selectedRoles.includes(item.title)
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

export default TargetRole;
