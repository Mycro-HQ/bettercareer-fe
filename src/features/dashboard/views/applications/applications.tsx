import React from 'react';
import classNames from 'classnames';
import { DropdownMenu } from '@radix-ui/themes';

import SearchIcon from '../../../../../public/images/dashboard/Search.svg';
import HeadPhonesIcon from '../../../../../public/images/dashboard/headphones.svg';
import CheckMarkIcon from '../../../../../public/images/dashboard/checkmark-circle-02.svg';
import ArchiveIcon from '../../../../../public/images/dashboard/archive-02.svg';
import RocketIcon from '../../../../../public/images/dashboard/rocket.svg';
import DribbbleIcon from '../../../../../public/images/dashboard/Dribbble.svg';
import OptionsIcon from '../../../../../public/images/dashboard/more-horizontal.svg';

import { generateUUID } from '@labs/utils/misc';
import { Flex, Heading, Text } from '@labs/components';

import type {
	ApplicationOptions,
	ApplicationJob,
	ApplicationState,
} from './types';
import styles from './applications.module.scss';

export const Applications = () => {
	return (
		<>
			<Header />
			<ApplicationsGrid />
		</>
	);
};

const BriefcaseIcon = () => (
	<svg
		width="24"
		height="24"
		viewBox="0 0 20 20"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		xmlnsXlink="http://www.w3.org/1999/xlink"
	>
		<rect width="20" height="20" fill="url(#pattern0_3556_6519)" />
		<defs>
			<pattern
				id="pattern0_3556_6519"
				patternContentUnits="objectBoundingBox"
				width="1"
				height="1"
			>
				<use xlinkHref="#image0_3556_6519" transform="scale(0.0138889)" />
			</pattern>
			<image
				id="image0_3556_6519"
				width="72"
				height="72"
				xlinkHref="data:image/png;base64,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"
			/>
		</defs>
	</svg>
);

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

const applicationsOptions: ApplicationOptions[] = [
	{
		id: 'Applied',
		icon: <RocketIcon />,
	},
	{
		id: 'Interviewed',
		icon: <HeadPhonesIcon />,
	},
	{
		id: 'Offered',
		icon: <CheckMarkIcon />,
	},
	{
		id: 'Archived',
		icon: <ArchiveIcon />,
	},
];

function ApplicationsGrid() {
	const applicationStateDefaultData: ApplicationJob[] = [
		{
			id: 'Applied_1',
			icon: <DribbbleIcon />,
			title: 'Brand Designer Ap1',
			company: 'Dribbble',
			location: 'California',
			workMode: 'Remote',
		},
		{
			id: 'Applied_2',
			icon: <DribbbleIcon />,
			title: 'Brand Designer Ap2',
			company: 'Dribbble',
			location: 'California',
			workMode: 'Remote',
		},
		{
			id: 'Applied_3',
			icon: <DribbbleIcon />,
			title: 'Brand Designer Ap3',
			company: 'Dribbble',
			location: 'California',
			workMode: 'Remote',
		},
		{
			id: 'Applied_4',
			icon: <DribbbleIcon />,
			title: 'Brand Designer Ap4',
			company: 'Dribbble',
			location: 'California',
			workMode: 'Remote',
		},
		{
			id: 'Applied_5',
			icon: <DribbbleIcon />,
			title: 'Brand Designer Ap5',
			company: 'Dribbble',
			location: 'California',
			workMode: 'Remote',
		},
		{
			id: 'Applied_6',
			icon: <DribbbleIcon />,
			title: 'Brand Designer Ap6',
			company: 'Dribbble',
			location: 'California',
			workMode: 'Remote',
		},
		{
			id: 'Interviewed_1',
			icon: <DribbbleIcon />,
			title: 'Brand Designer I1',
			company: 'Dribbble',
			location: 'California',
			workMode: 'Remote',
		},
		{
			id: 'Interviewed_2',
			icon: <DribbbleIcon />,
			title: 'Brand Designer I2',
			company: 'Dribbble',
			location: 'California',
			workMode: 'Remote',
		},
		{
			id: 'Interviewed_3',
			icon: <DribbbleIcon />,
			title: 'Brand Designer I3',
			company: 'Dribbble',
			location: 'California',
			workMode: 'Remote',
		},
		{
			id: 'Offered_1',
			icon: <DribbbleIcon />,
			title: 'Brand Designer O1',
			company: 'Dribbble',
			location: 'California',
			workMode: 'Remote',
		},
	];

	// Create unique IDs for each application
	applicationStateDefaultData.forEach((job) => {
		job.id = job.id.split('_')[0] + '_' + generateUUID();
	});

	const [applicationState, setApplicationState] = React.useState<
		ApplicationJob[]
	>(applicationStateDefaultData);

	function ApplicationsGridColumn({ icon, id }: { icon: any; id: string }) {
		const customApplicationOptions = applicationsOptions.filter(
			(option) => option.id !== id
		);
		const applicationsFiltered = applicationState.filter((application) =>
			application.id.startsWith(id)
		);
		const numberOfApplications = applicationsFiltered.length;

		return (
			<Flex.Column className="min-h-max md:min-h-screen" gap={32}>
				<Flex gap={8} alignItems="center" className="px-4">
					{icon}
					<Text as="p" weight={500}>
						{id} ({numberOfApplications})
					</Text>
				</Flex>
				<Flex.Column gap={16}>
					{applicationsFiltered.map((application) => (
						<ApplicationsGridItem
							key={application.id}
							jobDetails={application}
							options={customApplicationOptions}
						/>
					))}
				</Flex.Column>
			</Flex.Column>
		);
	}

	function ApplicationsGridItem({
		jobDetails,
		options,
	}: {
		jobDetails: ApplicationJob;
		options: ApplicationOptions[];
	}) {
		return (
			<Flex gap={10} className={styles.applicationGridItem}>
				<div>{jobDetails.icon}</div>
				<div className="mr-2">
					<Text as="p">{jobDetails.title}</Text>
					<Text
						as="span"
						className={styles.aGIsubTitle}
						color="var(--text-gray)"
						size="xs"
						weight={500}
					>
						{jobDetails.company} . {jobDetails.location} . {jobDetails.workMode}
					</Text>
				</div>
				<OptionsDropDown options={options} id={jobDetails.id} />
			</Flex>
		);
	}

	function OptionsDropDown({
		id,
		options,
	}: {
		id: string;
		options: typeof applicationsOptions;
	}) {
		function handleCategoryChange(from: string, to: ApplicationState) {
			const job = applicationState.find((job) => job.id === from);
			if (job) {
				setApplicationState((prev) => {
					const newApplications = prev.filter(
						(application) => application.id !== from
					);
					const oldApplicationJobString = job.id.split('_')[1];
					job.id = to + '_' + oldApplicationJobString;
					return [...newApplications, job];
				});
			}
		}

		return (
			<DropdownMenu.Root>
				<DropdownMenu.Trigger>
					<div className="cursor-pointer mt-2 sm:mt-0">
						<OptionsIcon />
					</div>
				</DropdownMenu.Trigger>
				<DropdownMenu.Content className={styles.optionsDropdown}>
					{options.map((data) => (
						<DropdownMenu.Item
							key={data.id}
							onClick={() => handleCategoryChange(id, data.id)}
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
		);
	}

	return (
		<div
			className={classNames(
				styles.applicationsGrid,
				'-top-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:min-h-screen'
			)}
		>
			<ApplicationsGridColumn
				icon={<RocketIcon />}
				id="Applied"
			></ApplicationsGridColumn>
			<ApplicationsGridColumn
				icon={<HeadPhonesIcon />}
				id="Interviewed"
			></ApplicationsGridColumn>
			<ApplicationsGridColumn
				icon={<CheckMarkIcon />}
				id="Offered"
			></ApplicationsGridColumn>
			<ApplicationsGridColumn
				icon={<ArchiveIcon />}
				id="Archived"
			></ApplicationsGridColumn>
		</div>
	);
}
