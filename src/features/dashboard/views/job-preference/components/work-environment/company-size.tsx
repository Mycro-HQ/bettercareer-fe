import React, { useState } from 'react';

import style from '../target-role/target-role.module.scss';

import { Flex, Heading, Text } from '@labs/components';
import UserGroup from '@labs/icons/dashboard/user-group.svg';
import Checkbox from '@labs/icons/dashboard/square-checkbox.svg';
import Tick from '@labs/icons/dashboard/blue-tick.svg';

import { CompanySizeData } from './work-environment-data';

const CompanySize = () => {
	const [selectedCompanySize, setSelectedCompanySize] = useState<string[]>([]);

	const handleClickedRoleLevel = (companySize: string) => {
		if (selectedCompanySize.includes(companySize)) {
			setSelectedCompanySize(
				selectedCompanySize.filter((item) => item !== companySize)
			);
		} else {
			setSelectedCompanySize([...selectedCompanySize, companySize]);
		}
	};

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
					<Flex
						gap={8}
						alignItems="center"
						onClick={() => handleClickedRoleLevel(item.title)}
						className={
							selectedCompanySize.includes(item.title)
								? style.TargetRoleSelected
								: style.TargetRole
						}
						key={item.id}
					>
						{selectedCompanySize.includes(item.title) ? <Tick /> : <Checkbox />}

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
				))}
			</Flex>
		</Flex.Column>
	);
};

export default CompanySize;
