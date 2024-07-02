import React, { Dispatch, SetStateAction, useEffect } from 'react';

import styles from '../jobs.module.scss';

import { Flex, CallToAction, Text } from '@labs/components';
import SearchIcon from '@labs/icons/dashboard/search.svg';
import JobTypeIcon from '@labs/icons/dashboard/job-search.svg';
import LocationIcon from '@labs/icons/dashboard/location.svg';

export function JobSearchForm({
	setQuery,
}: {
	setQuery: Dispatch<SetStateAction<Record<string, string>>>;
}) {
	const [formData, setFormData] = React.useState({
		title: '',
		location: '',
		workMode: '',
	});

	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	}

	useEffect(() => {
		const fieldsEmpty = Object.values(formData).every(
			(value) => value.length < 1
		);
		if (fieldsEmpty) {
			setQuery({ filter: 'all_jobs' });
		}
	}, [formData, setQuery]);

	function handleSubmit(e: React.ChangeEvent<HTMLFormElement>) {
		e.preventDefault();
		setQuery({ ...formData });
	}

	return (
		<Flex.Column
			className="w-full md:mb-[25%] lg:mb-[6%]"
			alignItems="center"
			gap={14}
		>
			<Flex.Row gap={8} alignItems="center" className="-mt-[2rem]">
				<Text size="sm" className="opacity-80">
					Popular Searches:
				</Text>
				{['Frontend', 'Backend', 'Data science', 'UI/UX'].map((jobType) => (
					<CallToAction.button
						outline
						key={jobType}
						size="xs"
						onClick={() => setFormData((prev) => ({ ...prev, title: jobType }))}
					>
						{jobType}
					</CallToAction.button>
				))}
			</Flex.Row>
			<form onSubmit={handleSubmit} className={styles.JobSearchForm}>
				<Flex
					alignItems="center"
					className="gap-y-4 flex-col md:flex-row mb-4 md:mb-0"
				>
					<JobSearchFormItem
						icon={<SearchIcon />}
						name="title"
						placeholder="Search jobs"
						value={formData.title}
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
						name="workMode"
						placeholder="Work mode e.g. remote"
						value={formData.workMode}
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
		</Flex.Column>
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
	name: 'title' | 'location' | 'workMode';
	placeholder: string;
	value: string;
	handleChange: React.ChangeEventHandler<HTMLInputElement>;
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
		<div className="hidden md:block text-[#CFD2D5] mr-4 scale-y-150">|</div>
	);
}
