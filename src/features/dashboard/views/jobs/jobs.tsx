import React, { useState } from 'react';

import { Flex, Heading, Text } from '@labs/components';
import BriefcaseIcon from '@labs/icons/dashboard/Briefcase.svg';
import SearchWhiteIcon from '@labs/icons/dashboard/search-white.svg';
import JobSearchIcon from '@labs/icons/dashboard/search.svg';
import JobTypeSearchIcon from '@labs/icons/dashboard/jobs-search.svg';
import LocationSearchIcon from '@labs/icons/dashboard/location-search.svg';
import DropdownIcon from '@labs/icons/dashboard/down.svg';

import styles from './jobs.module.scss';
import JobCard, { IJobCard } from './components/job-card';
import { data } from './jobs.mockData';
import { descriptionData } from './jobs.mockData';
import JobDescriptionCard from './components/job-description-card';
const DashboardJobs = () => {
	const [activeJobCard, setActiveJobCard] = useState<number>(1);
	const [activeTab, setActiveTab] = useState<number>(1);

	const handleJobCardSwitch = (id: number) => {
		setActiveJobCard(activeJobCard === id ? 0 : id);
	};

	const handleTabSwitch = (tabIndex: number) => {
		setActiveTab(tabIndex);
	};
	return (
		<div>
			<Flex justifyContent="space-between" className="mb-[8rem]">
				<Flex.Column>
					<Flex alignItems="center" gap={8}>
						<Heading.h3 weight={400}>Search for Jobs</Heading.h3>
						<BriefcaseIcon />
					</Flex>
					<Text.p fontSize="1rem" color="#6F7982" weight={500}>
						See all open positions and dive into a fulfilling career
					</Text.p>
				</Flex.Column>

				<div className={styles.SearchContainer}>
					<Flex alignItems="center" gap={11} className={styles.SearchItem}>
						<JobSearchIcon />
						<input
							className={styles.SearchInput}
							placeholder="Search jobs"
							type="text"
						/>
					</Flex>

					<Flex alignItems="center" gap={11} className={styles.SearchItem}>
						<LocationSearchIcon />
						<input
							className={styles.SearchInput}
							placeholder="Location"
							type="text"
						/>
					</Flex>

					<Flex alignItems="center" gap={11}>
						<JobTypeSearchIcon />
						<input
							className={styles.SearchInput}
							placeholder="Job Type"
							type="text"
						/>
					</Flex>

					<button className={styles.SearchBtn}>
						<SearchWhiteIcon />
					</button>
				</div>
			</Flex>

			<Flex alignItems="center" justifyContent="space-between">
				<Flex alignItems="center" gap={43}>
					<div
						className={
							activeTab === 1 ? styles.JobTabActive : styles.JobTabInactive
						}
						onClick={() => handleTabSwitch(1)}
					>
						<p>All Jobs</p>
					</div>

					<div
						className={
							activeTab === 2 ? styles.JobTabActive : styles.JobTabInactive
						}
						onClick={() => handleTabSwitch(2)}
					>
						<p>Best Matches</p>
					</div>

					<div
						className={
							activeTab === 3 ? styles.JobTabActive : styles.JobTabInactive
						}
						onClick={() => handleTabSwitch(3)}
					>
						<p>Based on Resume</p>
					</div>

					<div
						className={
							activeTab === 4 ? styles.JobTabActive : styles.JobTabInactive
						}
						onClick={() => handleTabSwitch(4)}
					>
						<p>Posted this Week</p>
					</div>

					<div
						className={
							activeTab === 5 ? styles.JobTabActive : styles.JobTabInactive
						}
						onClick={() => handleTabSwitch(5)}
					>
						<p>Sponsored Jobs</p>
					</div>
				</Flex>

				<button className={styles.JobsTabDropdown}>
					Newest <DropdownIcon />
				</button>
			</Flex>

			<Flex justifyContent="space-between" className="py-[2rem]">
				<Flex.Column gap={24} style={{ width: '36%' }}>
					{data.map((item: IJobCard, i: React.Key) => (
						<div key={i} onClick={() => handleJobCardSwitch(item.id)}>
							<JobCard {...item} activeJobCard={activeJobCard} />
						</div>
					))}
				</Flex.Column>

				<JobDescriptionCard {...descriptionData[activeJobCard - 1]} />
			</Flex>
		</div>
	);
};

export default DashboardJobs;
