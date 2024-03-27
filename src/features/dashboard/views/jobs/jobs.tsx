import { Heading, Text, Flex, CallToAction } from '@labs/components';
import React from 'react';
import styles from './jobs.module.scss';
import JobCard from './job-card';
import DribbbleLogo from '../../../../../public/images/dashboard/Company_Logo.svg';

export const Jobs = () => {
	return (
		<div>
			<div className="min-h-[20vh]">Header</div>
			<Flex.Row gap={32}>
				<Flex.Column gap={24} flex="5">
					<JobCard
						companyLogo={<DribbbleLogo />}
						jobTitle="Brand Designer"
						companyName="Dribbble"
						location="California"
						salaryRange="$120k - $140k"
						tags={['Remote', 'Internship', 'Full-Time']}
						time="1hr ago"
					/>
					<JobCard
						companyLogo={<DribbbleLogo />}
						jobTitle="Brand Designer"
						companyName="Dribbble"
						location="California"
						salaryRange="$120k - $140k"
						tags={['Remote', 'Internship', 'Full-Time']}
						time="1hr ago"
					/>
					<JobCard
						companyLogo={<DribbbleLogo />}
						jobTitle="Brand Designer"
						companyName="Dribbble"
						location="California"
						salaryRange="$120k - $140k"
						tags={['Remote', 'Internship', 'Full-Time']}
						time="1hr ago"
					/>
				</Flex.Column>
				<Flex.Column flex="8"></Flex.Column>
			</Flex.Row>
		</div>
	);
};
