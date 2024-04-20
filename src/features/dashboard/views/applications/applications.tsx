import React from 'react';
import classNames from 'classnames';

import SearchIcon from '@labs/icons/dashboard/search.svg';
import BriefcaseIcon from '@labs/icons/dashboard/briefcase.svg';
import { Flex, Heading, Text } from '@labs/components';

import ApplicationsGridColumn from './components/ApplicationGridColumn';
import { applicationsOptions } from './data';
import styles from './applications.module.scss';

export const Applications = () => {
	return (
		<>
			<Header />
			<ApplicationsGrid />
		</>
	);
};

function Header() {
	const [searchState, setSearchState] = React.useState<string>('');
	function searchApplications() {
		// Implement application search here
	}
	return (
		<Flex
			alignItems="center"
			justifyContent="space-between"
			className="flex-col mb-4 min-[900px]:flex-row"
		>
			<Flex.Column gap={6}>
				<Flex alignItems="center" gap={14}>
					<Heading.h3 weight={400} animate="slide">
						Applications
					</Heading.h3>
					<BriefcaseIcon />
				</Flex>

				<Text color="var(--text-gray)" animate="fade" className="mb-9">
					Start your application journey here - explore, apply, and get started
				</Text>
			</Flex.Column>
			<div
				className={classNames(
					styles.searchInputContainer,
					'bg-white rounded-2xl py-[14px] px-6'
				)}
			>
				<label htmlFor="searchApplications" className="hidden">
					Search Applications...
				</label>
				<input
					id="searchApplications"
					name="searchApplications"
					type="text"
					className="outline-none mr-4 md:mr-6 xl:mr-12"
					placeholder="Search applications..."
					value={searchState}
					onChange={(e) => setSearchState(e.target.value)}
				/>
				<button
					className="bg-[#1286f3] p-3 rounded-xl"
					title="Search"
					type="button"
					onClick={searchApplications}
				>
					<SearchIcon className="w-4 h-4 [&>g>path]:stroke-white" />
				</button>
			</div>
		</Flex>
	);
}

function ApplicationsGrid() {
	return (
		<div
			className={classNames(
				styles.applicationsGrid,
				'-top-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:min-h-screen'
			)}
		>
			{applicationsOptions.map((option) => (
				<ApplicationsGridColumn
					key={option.id}
					icon={option.icon}
					id={option.id}
				/>
			))}
		</div>
	);
}
