import React from 'react';
import Image, { StaticImageData } from 'next/image';

import styles from '../jobs.module.scss';

import { Flex, Heading, Text } from '@labs/components';
import Match from '@labs/icons/dashboard/match.svg';

export interface IJobCard {
	id: number;
	companyLogo: string | StaticImageData;
	jobTitle: string;
	companyName: string;
	companyLocation: string;
	minSalary: string;
	maxSalary: string;
	jobTag: string[];
	time: string;
	activeJobCard?: number | null;
}

const JobCard: React.FC<IJobCard> = ({
	id,
	companyLogo,
	jobTitle,
	companyName,
	companyLocation,
	minSalary,
	maxSalary,
	jobTag,
	time,
	activeJobCard,
}) => {
	return (
		<div
			className={`${activeJobCard === id ? styles.JobCardContainerActive : styles.JobCardContainer}`}
		>
			<Flex alignItems="center" justifyContent="space-between">
				<Flex alignItems="center" gap={10}>
					<Image src={companyLogo} alt={`${companyName} Logo`} />

					<Flex.Column>
						<Heading.h3 className={styles.JobTitle}>{jobTitle}</Heading.h3>
						<Text.p weight={500} fontSize="1rem" color="var(--text-gray)">
							{`${companyName} `}{' '}
							<Text.span color="var(--text-black)" weight={700}>
								.
							</Text.span>{' '}
							{`${companyLocation} `}
							<Text.span color="var(--text-black)" weight={700}>
								.
							</Text.span>{' '}
							{`${minSalary} - ${maxSalary}`}
						</Text.p>
					</Flex.Column>
				</Flex>

				<button className={styles.MatchBtn}>
					<Match />
				</button>
			</Flex>

			<Flex alignItems="center" justifyContent="space-between">
				<Flex alignItems="center">
					{jobTag.map((tag, i) => (
						<div className={styles.JobTag} key={i}>
							<Text.p fontSize="14px" weight={600} color="#3F4C58">
								{tag}
							</Text.p>
						</div>
					))}
				</Flex>

				<Text.p weight={500} fontSize="14px" color="var(--text-gray)">
					{time}
				</Text.p>
			</Flex>
		</div>
	);
};

export default JobCard;
