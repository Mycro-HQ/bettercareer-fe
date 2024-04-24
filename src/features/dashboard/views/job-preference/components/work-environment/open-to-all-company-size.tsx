import React, { useState } from 'react';

import style from '../target-role/target-role.module.scss';

import { Flex, Heading, Text } from '@labs/components';
import UserGroup from '@labs/icons/dashboard/user-group.svg';

const OpenToAllCompanySize = () => {
	const [selectedOption, setSelectedOption] = useState('');

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
					onClick={() => setSelectedOption('No')}
					style={{ padding: '10px 32px' }}
					className={
						selectedOption === 'No'
							? style.TargetRoleSelected
							: style.TargetRole
					}
				>
					<Text.p
						fontSize="14px"
						weight={500}
						color={
							selectedOption === 'No'
								? 'var(--primary-blue)'
								: 'var(--text-black)'
						}
					>
						No
					</Text.p>
				</button>

				<button
					onClick={() => setSelectedOption('Yes')}
					style={{ padding: '10px 32px' }}
					className={
						selectedOption === 'Yes'
							? style.TargetRoleSelected
							: style.TargetRole
					}
				>
					<Text.p
						fontSize="14px"
						weight={500}
						color={
							selectedOption === 'Yes'
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
