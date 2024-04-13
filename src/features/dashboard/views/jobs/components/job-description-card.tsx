import Image, { StaticImageData } from 'next/image';
import React from 'react';

import styles from '../jobs.module.scss';

import { Flex, Heading, Text } from '@labs/components';

export interface IJobDescriptionCard {
	companyLogo: string | StaticImageData;
	jobTitle: string;
	companyName: string;
	companyLocation: string;
	minSalary: string;
	maxSalary: string;
	summary: string;
	requirements: string[];
}

const JobDescriptionCard: React.FC<IJobDescriptionCard> = ({
	companyLogo,
	jobTitle,
	companyName,
	companyLocation,
	minSalary,
	maxSalary,
	summary,
	requirements,
}) => {
	return (
		<Flex.Column gap={40} className={styles.JobDescriptionCard}>
			<Flex alignItems="center" justifyContent="space-between">
				<Flex alignItems="center" gap={13}>
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

				<Flex alignItems="center" gap={4}>
					<button className={styles.ApplyBtn}>Apply</button>
					<button className={styles.SaveBtn}>Save</button>
				</Flex>
			</Flex>

			<Flex.Column gap={22}>
				<Flex.Column>
					<Heading.h3
						style={{ fontFamily: 'var(--font-secondary)' }}
						fontSize="1rem"
						color="#0F1F2E"
						weight={600}
					>
						Summary
					</Heading.h3>

					<Text.p fontSize="14px" color="#273643" weight={500}>
						{summary}
					</Text.p>
				</Flex.Column>

				<Flex.Column>
					<Heading.h3
						style={{ fontFamily: 'var(--font-secondary)' }}
						fontSize="1rem"
						color="#0F1F2E"
						weight={600}
					>
						Requirements
					</Heading.h3>

					<Flex.Column gap={20}>
						{requirements.map((requirement, i) => (
							<Flex key={i} alignItems="flex-start">
								<Text.span className={styles.BulletPoint}>•</Text.span>
								<Text.p
									className={styles.BulletPointText}
									weight={500}
									fontSize="14px"
									color="#273643"
								>
									{requirement}
								</Text.p>
							</Flex>
						))}
					</Flex.Column>
				</Flex.Column>
			</Flex.Column>
		</Flex.Column>
	);
};

export default JobDescriptionCard;
