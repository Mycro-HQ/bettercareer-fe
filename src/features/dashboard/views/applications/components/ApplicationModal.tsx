import React from 'react';
import classNames from 'classnames';
import { DropdownMenu } from '@radix-ui/themes';

import type { ApplicationOptions } from '../types';
import { handleCategoryChange } from '../utils';
import { applicationData } from '../data';
import { ApplicationStateContext } from '../applications';
import styles from '../applications.module.scss';

import DownIcon from '@labs/icons/dashboard/down.svg';
import { Flex, Text } from '@labs/components';

export default function ApplicationModal({
	options,
	id,
}: {
	options: ApplicationOptions[];
	id: string;
}) {
	const { applicationState, setApplicationState } = React.useContext(
		ApplicationStateContext
	);
	return (
		<Flex.Column gap={40}>
			<Flex.Row justifyContent="space-between">
				<Flex.Row gap={18}>
					{applicationData.companyLogo}
					<Flex.Column gap={4} className="font-[Figtree]">
						<Text as="span" weight={600} fontSize="18px" inheritFont>
							{applicationData.jobTitle}
						</Text>
						<Text
							color="var(--text-gray)"
							weight={500}
							lineHeight="24px"
							inheritFont
						>
							{applicationData.companyName} . {applicationData.location} .{' '}
							{applicationData.salaryRange}
						</Text>
					</Flex.Column>
				</Flex.Row>
				<DropdownMenu.Root>
					<DropdownMenu.Trigger>
						<Flex.Row
							gap={8}
							className="items-center cursor-pointer mt-2 sm:mt-0 my-2"
						>
							<Text>{id}</Text>
							<DownIcon />
						</Flex.Row>
					</DropdownMenu.Trigger>
					<DropdownMenu.Content
						className={classNames('z-[1200]', styles.optionsDropdown)}
					>
						{options.map((data) => (
							<DropdownMenu.Item
								key={data.id}
								onClick={() =>
									handleCategoryChange(
										id,
										data.id,
										applicationState,
										setApplicationState
									)
								}
								className={classNames('group', styles.optionsDropdownItem)}
							>
								<div className="group-hover:[&>svg>path]:stroke-white">
									{data.icon}
								</div>
								<Text
									as="span"
									color="#273643"
									size="sm"
									weight={500}
									className="group-hover:text-white"
								>
									Move to {data.id}
								</Text>
							</DropdownMenu.Item>
						))}
					</DropdownMenu.Content>
				</DropdownMenu.Root>
			</Flex.Row>
			<Flex.Column gap={32}>
				<div>
					<Text as="span" weight={600} className="mb-3">
						Summary
					</Text>
					<div className="text-sm font-medium leading-5 text-[#273643]">
						{applicationData.summary}
					</div>
				</div>
				<div>
					<Text as="span" weight={600} className="mb-3">
						Requirements
					</Text>
					<div className="text-sm font-medium leading-5 text-[#273643]">
						<ul className="list-disc list-inside">
							{applicationData.requirementsArray.map((req) => (
								<li key={req.slice(0, 10)} className="mb-4">
									{req}
								</li>
							))}
						</ul>
					</div>
				</div>
			</Flex.Column>
		</Flex.Column>
	);
}
