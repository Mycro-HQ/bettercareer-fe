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
					{/* I don't want to download it twice since */}
					{/* it already exists on the new-feat-jobs-page branch */}
					{/* <Briefcase width="24" height="24" /> */}
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

type ApplicationJob = {
	id: string;
	icon: any;
	title: string;
	company: string;
	location: string;
	workMode: 'Remote' | 'Onsite' | 'Hybrid';
};

type applicationStateType = 'Applied' | 'Interviewed' | 'Offered' | 'Archived';

const applicationsOptions: {
	id: applicationStateType;
	icon: React.JSX.Element;
}[] = [
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
		options: typeof applicationsOptions;
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
		function handleCategoryChange(from: string, to: applicationStateType) {
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
