import React from 'react';

import { CallToAction, Flex, Heading, Text } from '@labs/components';
import { ScoreCounter } from '@/components/score-counter';
import { Accordion } from '@labs/components/accordion';
import { Progress } from '@/components/misc/progress';
import Logo from '@labs/icons/logo-mark.svg';

import styles from './analysis.module.scss';
import classNames from 'classnames';

import { getDataIcons } from '@labs/utils';
import Router from 'next/router';

const COLORS = ['#2b94f4', '#4ea27f', '#ff973c', '#dd4237'];

export const getColorByScore = (score: number) => {
	if (score >= 90) {
		return COLORS[0];
	} else if (score >= 80) {
		return COLORS[1];
	} else if (score >= 70) {
		return COLORS[2];
	} else {
		return COLORS[3];
	}
};

export const Analysis = ({
	data,
	seeAllAnalysis,
	closeModal,
}: {
	data?: any;
	seeAllAnalysis: () => void;
	closeModal: () => void;
}) => {
	const [tab, setTab] = React.useState('analysis');

	// reduce the ResumeAnalysisInfo array to get the overall score percentage

	if (!data) {
		return (
			<Flex.Column gap={18} alignItems="center">
				<Logo />
				<Text.p weight={500} size="sm" align="center">
					Something went wrong. Please try again later. If the problem persists,
					contact support.
				</Text.p>
				<CallToAction.button
					variant="primary"
					size="sm"
					onClick={seeAllAnalysis}
				>
					See All Analysis
				</CallToAction.button>
			</Flex.Column>
		);
	}

	return (
		<div className={classNames([styles.ResumeAnalysis, 'p-[18px]'])}>
			<Flex.Column gap={6}>
				<Flex.Row
					gap={8}
					className="mb-4 -mt-[14px]"
					justifyContent="space-between"
				>
					<CallToAction.button
						variant="clear"
						size="sm"
						style={{ paddingLeft: 0 }}
						onClick={seeAllAnalysis}
						leadingIcon={
							<img
								src={getDataIcons('arrow-thin-right', '#000')}
								className="rotate-[180deg]"
							/>
						}
					>
						See All Analysis
					</CallToAction.button>
					<CallToAction.button
						variant={
							Router.query?.analysis === 'true' ? 'secondary' : 'primary'
						}
						size="sm"
					>
						Get an Expert Review
					</CallToAction.button>
					{Router.query?.analysis === 'true' && (
						<CallToAction.button
							onClick={closeModal}
							variant="primary"
							size="sm"
						>
							Edit Resume
						</CallToAction.button>
					)}
				</Flex.Row>
				<Flex.Column gap={4} className="mb-4 ">
					<Heading.h4 fontSize="20px" weight={400} animate="slide">
						<Logo width={18} className="inline" /> Resume Analysis
					</Heading.h4>
					<Flex.Row gap={8} alignItems="center">
						{data?.resume?.name && (
							<Text.p weight={500} size="sm">
								Name: {data?.resume?.name}
							</Text.p>
						)}
					</Flex.Row>
				</Flex.Column>
			</Flex.Column>
			<Flex.Row
				gap={8}
				justifyContent="center"
				alignItems="center"
				className="mb-8"
			>
				<CallToAction
					variant={tab === 'analysis' ? 'secondary' : 'clear'}
					onClick={() => setTab('analysis')}
					size="sm"
				>
					Analysis
				</CallToAction>
				{data.snapshots && data.snapshots.length > 0 && (
					<CallToAction
						variant={tab === 'preview' ? 'secondary' : 'clear'}
						onClick={() => setTab('preview')}
						size="sm"
					>
						Preview
					</CallToAction>
				)}
			</Flex.Row>
			<Flex.Row gap={32} className={styles.ResumeAnalysisSection}>
				<aside className={styles.ResumeAnalysisAside}>
					<Flex.Column
						gap={18}
						alignItems="center"
						className={styles.ResumeAnalysisBox}
					>
						<Flex.Column
							fullWidth
							justifyContent="center"
							alignItems="center"
							className="basis-[230px] lg:basis-[100%] mx-auto"
						>
							<Flex.Column
								alignItems="center"
								justifyContent="center"
								className={styles.ResumeOverallScoreCounter}
							>
								<ScoreCounter
									className={styles.ResumeScoreSvg}
									score={data?.overallScore}
								/>
								<Heading.h5 fontSize="28px" weight={700}>
									{data?.overallScore}
								</Heading.h5>
								<Text.p weight={500} size="sm">
									Overall score
								</Text.p>
							</Flex.Column>
							<Text.p weight={700}>Score Breakdown</Text.p>
						</Flex.Column>
						<Flex.Column gap={18} className={styles.ResumeScoreBreakDown}>
							{Object.keys(data.results).map((key, index) => {
								const item = data.results[key as keyof typeof data.results];
								const color = getColorByScore(item.score);

								if (!item.score) return null;
								return (
									<div key={key} className={styles.ResumeScoreItem}>
										<Flex.Row key={key} className={styles.ResumeScoreTitle}>
											<Text.p size="sm" casing="capitalize">
												{key}
											</Text.p>
											<Text.p size="sm" weight={600} color={color}>
												{item.score}/100
											</Text.p>
										</Flex.Row>

										<Progress value={item.score} color={color} />
									</div>
								);
							})}
						</Flex.Column>
					</Flex.Column>
				</aside>
				{tab === 'preview' && (
					<Flex.Column
						gap={24}
						className={classNames([styles.ResumeAnalysisMain, styles.Preview])}
					>
						{[...(data.snapshots || ['/images/dashboard/thumbnail.png'])].map(
							(item: any, index: number) => (
								<Flex.Column key={index} gap={12}>
									<img src={item} alt="resume" />
								</Flex.Column>
							)
						)}
					</Flex.Column>
				)}
				{tab === 'analysis' && (
					<Flex.Column gap={24} className={styles.ResumeAnalysisMain}>
						<Flex.Column gap={12}>
							<Flex.Column gap={16} fullWidth>
								<Accordion.Group allowMultiple>
									{Object.keys(data.results).map((key, index) => {
										const item = data.results[key as keyof typeof data.results];
										const color = getColorByScore(item.score);
										if (!item.problems) return null;

										return (
											<Accordion
												key={index}
												dataKey={`${index}:accordion`}
												className={styles.AccordionItem}
												title={
													<Flex.Row
														alignItems="center"
														justifyContent="space-between"
													>
														<Flex.Row
															alignItems="center"
															gap={12}
															className={styles.AccordionHeader}
														>
															<Text.p weight={700} casing="capitalize">
																{key}
															</Text.p>
															<div
																style={{
																	background: color + '20',
																	borderColor: color,
																}}
																className={styles.ResumeScoreIndicator}
															>
																<Text.p weight={600} color={color} size="sm">
																	{item.score}/100
																</Text.p>
															</div>
														</Flex.Row>
													</Flex.Row>
												}
											>
												<div className={styles.AccordionContent}>
													<Text.p weight={600}>
														Problem: {item.problems?.join(', ')}
													</Text.p>
													<div className={styles.AccordionContentItem}>
														<Text.p weight={600}>Solution:</Text.p>
														<ul className={styles.ResumeList}>
															{item?.solutions.map(
																(solution: string, index: number) => (
																	<li
																		key={index}
																		className={styles.ResumeListItem}
																	>
																		{solution}
																	</li>
																)
															)}
														</ul>
													</div>
												</div>
											</Accordion>
										);
									})}
								</Accordion.Group>
							</Flex.Column>
						</Flex.Column>
						<Text.p
							weight={500}
							className="opacity-60"
							fontSize="12px"
							size="sm"
						>
							NB: These analysis are AI generated and may not be 100% accurate
						</Text.p>
					</Flex.Column>
				)}
			</Flex.Row>
		</div>
	);
};
