import React, { useState } from 'react';
import classNames from 'classnames';

import style from '../target-role/target-role.module.scss';

import { Flex, Heading, Text } from '@labs/components';
import UserGroup from '@labs/icons/dashboard/user-group.svg';

const OpenToAllCompanySize = () => {
	const [selectedOption, setSelectedOption] = useState<boolean | null>(null);

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
					onClick={() => setSelectedOption(false)}
					className={classNames({
						[style.TargetRoleSelected]: selectedOption === false,
						[style.TargetRole]: selectedOption !== false,
						[style.TabBtn]: true,
					})}
				>
					<Text.p
						fontSize="14px"
						weight={500}
						color={
							selectedOption === false
								? 'var(--primary-blue)'
								: 'var(--text-black)'
						}
					>
						No
					</Text.p>
				</button>

				<button
					onClick={() => setSelectedOption(true)}
					style={{ padding: '10px 32px' }}
					className={
						selectedOption ? style.TargetRoleSelected : style.TargetRole
					}
				>
					<Text.p
						fontSize="14px"
						weight={500}
						color={selectedOption ? 'var(--primary-blue)' : 'var(--text-black)'}
					>
						Yes
					</Text.p>
				</button>
			</Flex>
		</Flex.Column>
	);
};

export default OpenToAllCompanySize;
