import React, { useState } from 'react';

import style from '../target-role/target-role.module.scss';

import Building from '@labs/icons/dashboard/blue-building.svg';
import { Flex, Heading, Text } from '@labs/components';

import { WorkEnvironmentData } from './work-environment-data';
const WorkEnvironment = () => {
	const [selectedEnvironment, setSelectedEnvironment] = useState<string[]>([]);

	const handleClickedEnvironment = (environment: string) => {
		if (selectedEnvironment.includes(environment)) {
			setSelectedEnvironment(
				selectedEnvironment.filter((item) => item !== environment)
			);
		} else {
			setSelectedEnvironment([...selectedEnvironment, environment]);
		}
	};
	return (
		<Flex.Column gap={24}>
			<Flex alignItems="center" gap={8}>
				<Building />
				<Heading.h3 weight={500} fontSize="18px" color="var(--text-black)">
					Specify your preferred industry
				</Heading.h3>
			</Flex>

			<Flex gap={8} flexWrap="wrap">
				{WorkEnvironmentData.map((item) => (
					<button
						onClick={() => handleClickedEnvironment(item.title)}
						className={
							selectedEnvironment.includes(item.title)
								? style.TargetRoleSelected
								: style.TargetRole
						}
						key={item.id}
					>
						<Text.p
							fontSize="14px"
							weight={500}
							color={
								selectedEnvironment.includes(item.title)
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
