import { useGetResumeAnalysisHistoryQuery } from '@/queries/resume';
import { useRouter } from 'next/router';
import React from 'react';
import FileIcon from '@labs/icons/dashboard/file.svg';

import classNames from 'classnames';
import { Flex, Heading, Text } from '@labs/components';
import { getColorByScore } from '../analysis';
import { getDataIcons } from '@labs/utils';
import { formatDate } from 'date-fns';

import styles from './analysis-history.module.scss';
import { Spinner } from '@labs/components/spinner';

export const AnalysisHistory = ({
	setAnalysisData,
	setScreen,
}: {
	setAnalysisData: any;
	setScreen: any;
}) => {
	const router = useRouter();
	const { data, isLoading, isError } = useGetResumeAnalysisHistoryQuery(
		{
			id: router.query.slug as string,
		},
		{
			enabled: !!router.query.slug && router.query.slug !== 'new',
		}
	);

	return (
		<div className={classNames([styles.ResumeAnalysisHistory, 'p-[18px]'])}>
			<Flex.Row gap={24}>
				<Heading.h4 fontSize="20px" weight={400} className="mb-6">
					Analysis History
				</Heading.h4>
			</Flex.Row>
			<Flex.Column gap={24}>
				{isLoading && <Spinner center />}
				{data?.data?.length === 0 && (
					<Text size="sm" color="var(--text-gray)">
						You have not analyzed your resume yet.
					</Text>
				)}
				{/* {JSON.stringify(data)} */}
				{data?.data?.map((analysis: any) => (
					<button
						className={styles.AnalysisHistoryItem}
						onClick={() => {
							setAnalysisData(analysis);
							setScreen('analysis');
						}}
						key={analysis?.id}
					>
						<Flex.Row gap={12}>
							<div className={styles.FileIcon}>
								<FileIcon />
							</div>
							<Flex.Column gap={6}>
								<Heading.h6 weight={700}>{analysis?.resume?.name}</Heading.h6>
								<Text size="sm" color="var(--text-gray)">
									Created on{' '}
									{formatDate(
										new Date(analysis?.createdAt || null),
										'MMM dd, yyyy'
									)}
								</Text>
							</Flex.Column>
						</Flex.Row>

						<Flex.Row gap={24} alignItems="center">
							<div
								style={{
									background: getColorByScore(analysis?.overallScore) + '20',
									borderColor: getColorByScore(analysis?.overallScore),
								}}
								className={styles.ScoreIndicator}
							>
								<Text.p
									weight={600}
									color={getColorByScore(analysis?.overallScore)}
									size="sm"
								>
									{analysis?.overallScore}/100
								</Text.p>
							</div>

							<img
								src={getDataIcons('arrow-thin-right', '#0F1F2E')}
								className="w-[12px] h-[12px]"
								alt="arrow"
							/>
						</Flex.Row>
					</button>
				))}
			</Flex.Column>
		</div>
	);
};
