import React from 'react';
import { DropdownMenu } from '@radix-ui/themes';
import { Text, Flex, CallToAction } from '@labs/components';
import DownIcon from '@public/images/dashboard/Down.svg';

export function JobFilter() {
	return (
		<Flex
			justifyContent="space-between"
			className="items-center lg:items-start mb-4 md:mb-8 flex-col md:flex-row"
		>
			<Flex
				alignItems="center"
				className="gap-x-4 md:gap-x-6 lg:gap-x-12 flex-col sm:flex-row mb-4 md:mb-0 py-2"
			>
				<Text
					weight={600}
					as="span"
					className="cursor-pointer text-base md:text-lg"
				>
					All Jobs
				</Text>
				<Text
					weight={600}
					color="var(--text-gray)"
					as="span"
					className="cursor-pointer text-base md:text-lg"
				>
					Best Matches
				</Text>
				<Text
					weight={600}
					color="var(--text-gray)"
					as="span"
					className="cursor-pointer text-base md:text-lg"
				>
					Based on Resume
				</Text>
				<Text
					weight={600}
					color="var(--text-gray)"
					as="span"
					className="cursor-pointer text-base md:text-lg"
				>
					Posted this Week
				</Text>
				<Text
					weight={600}
					color="var(--text-gray)"
					as="span"
					className="cursor-pointer text-base md:text-lg"
				>
					Sponsored Jobs
				</Text>
			</Flex>
			<JobFilterDropDown />
		</Flex>
	);
}

export function JobFilterDropDown() {
	const dropDownDataArray = ['Newest', 'Oldest', 'Most Popular'];
	const [dropDownData, setDropDownData] = React.useState(dropDownDataArray[0]);
	const filterDropDownDataArray = dropDownDataArray.filter(
		(data) => data !== dropDownData
	);
	return (
		<DropdownMenu.Root>
			<DropdownMenu.Trigger>
				<CallToAction
					outline
					size="sm"
					className="transition-all flex items-center gap-x-[6px] [&[data-state=open]>svg]:rotate-180"
				>
					<span>{dropDownData}</span>
					<DownIcon className="transition-transform duration-200" />
				</CallToAction>
			</DropdownMenu.Trigger>
			<DropdownMenu.Content>
				{filterDropDownDataArray.map((data) => (
					<DropdownMenu.Item key={data} onClick={() => setDropDownData(data)}>
						{data}
					</DropdownMenu.Item>
				))}
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	);
}
