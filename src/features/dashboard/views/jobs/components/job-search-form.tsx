import React from 'react';

import styles from '../jobs.module.scss';

import { Flex, CallToAction } from '@labs/components';
import SearchIcon from '@labs/icons/dashboard/search.svg';
import JobTypeIcon from '@labs/icons/dashboard/job-search.svg';
import LocationIcon from '@labs/icons/dashboard/location.svg';

export function JobSearchForm() {
	const [formData, setFormData] = React.useState({
		search: '',
		location: '',
		jobType: '',
	});

	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	}

	return (
		<Flex className="w-full md:mb-[25%] lg:mb-[15%]" justifyContent="center">
			<form action="" className={styles.JobSearchForm}>
				<Flex
					alignItems="center"
					className="gap-y-4 flex-col md:flex-row mb-4 md:mb-0"
				>
					<JobSearchFormItem
						icon={<SearchIcon />}
						name="search"
						placeholder="Search jobs"
						value={formData.search}
						handleChange={handleChange}
					/>
					<JobSearchSeparator />
					<JobSearchFormItem
						icon={<LocationIcon />}
						name="location"
						placeholder="Location"
						value={formData.location}
						handleChange={handleChange}
					/>
					<JobSearchSeparator />
					<JobSearchFormItem
						icon={<JobTypeIcon />}
						name="jobType"
						placeholder="Job Type"
						value={formData.jobType}
						handleChange={handleChange}
					/>
				</Flex>
				<button
					type="submit"
					title="Search"
					className="hidden md:block rounded-xl p-3 bg-[#1388F2]"
				>
					<SearchIcon className="[&>g>path]:stroke-white" />
				</button>
				<CallToAction
					type="submit"
					size="sm"
					className="md:!hidden self-center"
				>
					Search
				</CallToAction>
			</form>
		</Flex>
	);
}

function JobSearchFormItem({
	icon,
	name,
	placeholder,
	value,
	handleChange,
}: {
	icon: any;
	name: 'search' | 'location' | 'jobType';
	placeholder: string;
	value: string;
	handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
	return (
		<Flex
			alignItems="center"
			gap={8}
			className="bg-white rounded-2xl pl-4 md:pl-0 w-full"
		>
			{icon}
			<input
				name={name}
				type="text"
				placeholder={placeholder}
				value={value}
				onChange={handleChange}
				className="outline-none rounded-tr-2xl rounded-br-2xl py-[14px]"
			/>
		</Flex>
	);
}

function JobSearchSeparator() {
	return (
		<div className="hidden md:block text-[#CFD2D5] mr-3 scale-y-150">|</div>
	);
}
