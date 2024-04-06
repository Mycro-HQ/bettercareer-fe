import React, { useCallback, useEffect, useState } from 'react';
import { DragDropContext, Draggable } from 'react-beautiful-dnd';
import { ScrollArea } from '@radix-ui/themes';
import classNames from 'classnames';
import { Tooltip } from '@radix-ui/themes';
import { HoverCard } from '@radix-ui/themes';

import { COMPONENT_MAP } from '../../lib';
import { StrictModeDroppable } from '../../components/sm-droppable';

import {
	CallToAction,
	Container,
	Flex,
	Heading,
	Text,
	useToast,
} from '@labs/components';
import { Accordion } from '@labs/components/accordion';
import Add from '@labs/icons/misc/add.svg';
import Bulb from '@labs/icons/misc/bulb.svg';
import SparklesIcon from '@labs/icons/misc/sparkels.svg';
import DNDIcon from '@labs/icons/misc/dnd.svg';
import { useBuildStore } from '@/store/z-store/builder';
import { Progress } from '@/components/misc/progress';
import { capitalize, pluralize } from '@labs/utils';

import styles from './build-resume-pane.module.scss';

export const BuildResumePane = () => {
	const {
		modules: blocks,
		moduleAdd,
		setModules,
		setModuleData,
		setResumeBlob,
		removeModuleData,
		editModuleData,
		setModuleAdd: setAddNew,
	} = useBuildStore();
	const { createToast } = useToast();
	const [isDropDisabled, setIsDropDisabled] = useState(false);
	function handleOnDragEnd(result: any) {
		if (!result.destination) return;
		setIsDropDisabled(false);

		if (result.destination) {
			const getIndexOfAllDisabled = blocks
				.map((block, index) => {
					if (typeof block.draggable === 'boolean' && !block.draggable) {
						return index;
					}
				})
				.filter((index) => index !== undefined);

			const isDisabled = getIndexOfAllDisabled.includes(
				result.destination.index
			);

			if (isDisabled) {
				createToast({
					message: 'You cannot move this section up or down',
					variant: 'error',
				});
				return setIsDropDisabled(true);
			}
		}

		const items = Array.from(blocks);
		const [reorderedItem] = items.splice(result.source.index, 1);
		items.splice(result.destination.index, 0, reorderedItem);
		setModules(items);
	}

	const [defaultAccordionKey, setDefaultKey] = useState('0:block_item');

	const calculateResumeCompleteness = useCallback(() => {
		const sections = [
			'heading',
			'summary',
			'experience',
			'education',
			'certifications',
			'skills',
			'projects',
		] as const;

		const maxScores = {
			heading: 20,
			summary: 10,
			experience: 20,
			education: 10,
			certifications: 10,
			skills: 10,
			projects: 10,
		} as const;

		const totalMaxScore = Object.values(maxScores).reduce(
			(acc, curr) => acc + curr,
			0
		);

		const sectionScores = sections.reduce(
			(acc, section) => {
				const fields = blocks.find((block) => block.key === section)?.data;
				const sectionMaxScore = maxScores[section];
				const sectionScore = calculateSectionScore(fields, sectionMaxScore);

				return { ...acc, [section]: sectionScore };
			},
			{} as Record<(typeof sections)[number], number>
		);

		const totalScore = Object.values(sectionScores).reduce(
			(acc, curr) => acc + curr,
			0
		);

		const missingOrIncompleteScores = sections
			.filter((section) => sectionScores[section] < maxScores[section])
			.map((section) => {
				const missingScore = maxScores[section] - sectionScores[section];
				return `\n${capitalize(section)}: ${pluralize('point', missingScore / 10)} needed to complete`;
			});

		const message =
			missingOrIncompleteScores.length > 0
				? `To reach 100%, please complete these sections: \n ${missingOrIncompleteScores.join(
						'\n '
					)}.`
				: 'Your resume is complete!';
		setMessage(message);

		const percentage = (totalScore / totalMaxScore) * 100;
		setResumeBlob({
			score: percentage,
		});
		setPercentage(Math.round(percentage));
	}, [blocks, setResumeBlob]);

	const calculateSectionScore = (fields: any, maxScore: number) => {
		if (!fields) return 0;

		const filledFields = Array.isArray(fields)
			? fields.filter(Boolean).length
			: Object.values(fields as Record<string, any>).filter(
					(bl) => Boolean(bl) && bl?.length > 0
				).length;

		return Math.min(maxScore, ((filledFields * 10) / maxScore) * maxScore);
	};

	useEffect(() => {
		calculateResumeCompleteness();
	}, [calculateResumeCompleteness]);

	const [percentage, setPercentage] = useState(0);
	const [message, setMessage] = useState('');
	return (
		<ScrollArea type="scroll" scrollbars="vertical">
			<div className={styles.BuildResumePane}>
				<DragDropContext
					onDragEnd={handleOnDragEnd}
					onDragStart={() => setIsDropDisabled(false)}
				>
					<Container className="my-[40px]" maxWidth="lg">
						<Flex.Row justifyContent="space-between" alignItems="center">
							<Flex gap={8}>
								<SparklesIcon />
								<Flex.Column gap={4}>
									<Heading.h4 weight={400}>Build Resume</Heading.h4>
									<Text size="sm" color="var(--text-gray)">
										Edit Section below and see your result immediately{' '}
									</Text>
								</Flex.Column>
							</Flex>
							<Flex.Column className="max-w-[300px] w-full">
								<Progress
									value={percentage}
									label="Resume Completeness"
									showPercent
									color={
										percentage >= 0 && percentage <= 40
											? '#E1574D'
											: percentage >= 41 && percentage <= 70
												? '#E38635'
												: (percentage >= 71 &&
														percentage <= 100 &&
														'#35956D') ||
													''
									}
								/>
								<HoverCard.Root>
									<HoverCard.Trigger>
										<Text
											fontSize="12px"
											color="var(--text-gray)"
											className="ml-auto mt-[4px]"
										>
											{percentage < 100
												? 'How to improve'
												: 'Your resume is complete!'}
										</Text>
									</HoverCard.Trigger>
									<HoverCard.Content maxWidth="100px">
										<Text
											size="sm"
											color="var(--text-gray)"
											className="max-w-[300px]"
										>
											{message.split('\n').map((msg, index) => (
												<span key={index} className="mb-[4px] block">
													{msg}
												</span>
											))}
										</Text>
									</HoverCard.Content>
								</HoverCard.Root>
								<Tooltip content={message}></Tooltip>
							</Flex.Column>
						</Flex.Row>
					</Container>

					<Container maxWidth="lg">
						<StrictModeDroppable
							droppableId="blocks"
							isDropDisabled={isDropDisabled}
						>
							{(droppable: any) => (
								<div
									{...droppable.droppableProps}
									ref={droppable.innerRef}
									className={`flex flex-col gap-[8px]`}
								>
									<Accordion.Group defaultActiveKey={defaultAccordionKey}>
										{blocks.map((block, index) => {
											const Component = (COMPONENT_MAP[
												block.key as keyof typeof COMPONENT_MAP
											] ||
												COMPONENT_MAP[
													'default' as keyof typeof COMPONENT_MAP
												]) as any;

											return (
												<Draggable
													key={`${index}:blocks`}
													draggableId={`${index}:blocks`}
													index={index}
													isDragDisabled={
														typeof block.draggable === 'boolean' &&
														!block.draggable
													}
												>
													{(draggable: any) => (
														<div
															ref={draggable.innerRef}
															{...draggable.draggableProps}
														>
															<Accordion
																key={`${index}:block_item`}
																dataKey={`${index}:block_item`}
																title={
																	<Flex alignItems="center" gap={4}>
																		{typeof block.draggable === 'boolean' &&
																		!block.draggable ? null : (
																			<span
																				{...draggable.dragHandleProps}
																				role="button"
																				tabIndex={0}
																				aria-label="drag"
																				onClick={(e) => e.stopPropagation()}
																			>
																				<DNDIcon />
																			</span>
																		)}

																		<Text weight={600}>
																			{block.key.startsWith('new_section')
																				? (block?.data as any)?.title ||
																					block.title ||
																					'New Section'
																				: block.title}
																		</Text>
																	</Flex>
																}
																trailingIcon={
																	Array.isArray(block?.data) &&
																	block?.data?.length ? (
																		<span
																			role="button"
																			tabIndex={0}
																			aria-label="add"
																			className={classNames([
																				moduleAdd[block.key] ? 'rotate-45' : '',
																				styles.AddIcon,
																				'cursor-pointer block transition-all  duration-200 ease-in-out hover:opacity-60 ',
																			])}
																			onClick={() => setAddNew(block.key, true)}
																		>
																			<Add />
																		</span>
																	) : undefined
																}
															>
																<Component
																	field={block.data}
																	type={block.key}
																	setField={(
																		data: Array<any> | object,
																		options: {
																			edit?: boolean;
																		}
																	) => setModuleData(block.key, data, options)}
																	removeField={(index: number) =>
																		removeModuleData(block.key, index)
																	}
																	editField={(data: any) => {
																		editModuleData(block.key, data);
																	}}
																/>
																{draggable.placeholder}
															</Accordion>
														</div>
													)}
												</Draggable>
											);
										})}
									</Accordion.Group>
									{droppable.placeholder}
									<button
										className={styles.AddSection}
										onClick={async () => {
											await setModules([
												...blocks,
												{
													key: `new_section:${blocks.length + 1}`,
													title: 'New Section',
													data: {},
												},
											]);
											setDefaultKey(`${blocks.length}:block_item`);
										}}
									>
										<Add /> New Section
									</button>
								</div>
							)}
						</StrictModeDroppable>

						<div className={styles.FloatingResources}>
							<CallToAction.a size="sm" leadingIcon={<Bulb />} href="/" outline>
								Resources and support
							</CallToAction.a>
						</div>
					</Container>
				</DragDropContext>
			</div>
		</ScrollArea>
	);
};
