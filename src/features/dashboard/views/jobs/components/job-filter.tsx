import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { DropdownMenu } from '@radix-ui/themes';
import classNames from 'classnames';

import { Text, Flex, CallToAction } from '@labs/components';
import DownIcon from '@labs/icons/dashboard/down.svg';

function JobFilterText({
	text,
	index,
	selectedFilter,
	setSelectedFilter,
}: {
	text: string;
	index: number;
	selectedFilter: number;
	setSelectedFilter: Dispatch<SetStateAction<number>>;
}) {
	const isSelected = selectedFilter === index;

	return (
		<button onClick={() => setSelectedFilter(index)}>
			<Text
				weight={500}
				as="span"
				className={classNames(
					'rounded-[450px] py-[10px] px-[18px] cursor-pointer transition-colors duration-200',
					isSelected
						? 'bg-[#e7f3fe] text-[#1286f3] hover:bg-[#d9eafe]'
						: 'text-[#878f97] hover:text-[#1388F2]'
				)}
			>
				{text}
			</Text>
		</button>
	);
}

const filterOptions = [
	{ index: 0, text: 'All Jobs', slug: 'all_jobs' },
	{ index: 1, text: 'Best Matches' },
	{ index: 2, text: 'Based on Resume' },
	{ index: 3, text: 'Posted this Week', slug: 'this_week' },
	{ index: 4, text: 'Sponsored Jobs', slug: 'sponsored' },
];

export function JobFilter({
	setFilter,
}: {
	setFilter: Dispatch<SetStateAction<string | undefined>>;
}) {
	const [selectedFilter, setSelectedFilter] = React.useState(0);

	useEffect(() => {
		const filter = filterOptions.find(({ index }) => index == selectedFilter);
		if (filter) {
			console.log(filter.slug);
			setFilter(filter.slug);
		}
	}, [selectedFilter, setFilter]);

	return (
		<div className="md:justify-between w-full flex items-center lg:items-start mb-4 md:mb-8 flex-col md:flex-row">
			<Flex
				alignItems="center"
				className="gap-2 xl:gap-x-4 flex-col sm:flex-row mb-4 md:mb-0 py-2"
			>
				{filterOptions.map(({ index, text }) => (
					<JobFilterText
						key={index}
						index={index}
						text={text}
						selectedFilter={selectedFilter}
						setSelectedFilter={setSelectedFilter}
					/>
				))}
			</Flex>
			<JobFilterDropDown />
		</div>
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
