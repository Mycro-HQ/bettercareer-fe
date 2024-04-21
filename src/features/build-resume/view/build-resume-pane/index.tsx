import React, { useCallback, useEffect, useState } from 'react';
import { DragDropContext, Draggable } from 'react-beautiful-dnd';
import { ScrollArea } from '@radix-ui/themes';
import classNames from 'classnames';
import { HoverCard } from '@radix-ui/themes';

import { COMPONENT_MAP } from '../../lib';
import { StrictModeDroppable } from '../../components/sm-droppable';
import { FontFamily } from '../build-resume-preview/view/resume-blocks/templates/utils';

import Customize from '@labs/icons/misc/customize.svg';
import HeadingIcon from '@labs/icons/misc/heading.svg';
import SummaryIcon from '@labs/icons/misc/summary.svg';
import {
	CallToAction,
	Container,
	Flex,
	Heading,
	Text,
	useMediaQuery,
	useToast,
} from '@labs/components';
import { Accordion } from '@labs/components/accordion';
import Add from '@labs/icons/misc/add.svg';
import Bulb from '@labs/icons/misc/bulb.svg';
import SparklesIcon from '@labs/icons/misc/sparkels.svg';
import DNDIcon from '@labs/icons/misc/dnd.svg';
import { useBuildStore } from '@/store/z-store/builder';
import { Progress } from '@/components/misc/progress';
import { capitalize, isEmpty, pluralize } from '@labs/utils';
import { Field } from '@labs/components/field';

import styles from './build-resume-pane.module.scss';

export const BuildResumePane = () => {
	const {
		modules: blocks,
		moduleAdd,
		template,
		setTemplate,
		setModules,
		setModuleData,
		setResumeBlob,
		removeModuleData,
		showPreview,
		editModuleData,
		setShowPreview,
		setModuleAdd: setAddNew,
	} = useBuildStore();
	const { createToast } = useToast();
	const [isDropDisabled, setIsDropDisabled] = useState(false);
	const isMobile = useMediaQuery('md', 'greaterThan');

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
		const sections = {
			heading: 20,
			summary: 10,
			experience: 20,
			education: 10,
			certifications: 10,
			skills: 10,
			projects: 10,
		} as const;

		const totalMaxScore = Object.values(sections).reduce(
			(acc, curr) => acc + curr,
			0
		);

		const sectionScores = Object.keys(sections).reduce(
			(acc, section) => {
				const fields = blocks.find((block) => block.key === section)?.data;
				const sectionMaxScore = sections[section as keyof typeof sections];
				const sectionScore = calculateSectionScore(fields, sectionMaxScore);

				return { ...acc, [section]: sectionScore };
			},
			{} as Record<any, number>
		);

		const totalScore = Object.values(sectionScores).reduce(
			(acc, curr) => acc + curr,
			0
		);

		const missingOrIncompleteScores = Object.keys(sections)
			.filter(
				(section) =>
					sectionScores[section] < sections[section as keyof typeof sections]
			)
			.map((section) => {
				const missingScore = sections[section as keyof typeof sections];
				-sectionScores[section];
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

	const hasData = blocks.find(
		(module: any) =>
			!isEmpty(module.data) &&
			Object.values(module.data || {}).reduce(
				(a: any, b: any) => a?.toString() + b?.toString(),
				''
			)
	);

	const ScrollComp = isMobile ? 'div' : ScrollArea;

	return (
		<ScrollComp type="scroll" scrollbars="vertical">
			<div className={styles.BuildResumePane}>
				<DragDropContext
					onDragEnd={handleOnDragEnd}
					onDragStart={() => setIsDropDisabled(false)}
				>
					<Container className="my-[40px]" maxWidth="lg">
						<Flex.Row
							justifyContent="space-between"
							alignItems="center"
							gap={24}
						>
							<Flex gap={8}>
								<SparklesIcon />
								<Flex.Column gap={4}>
									<Heading.h4 weight={400}>Build Resume</Heading.h4>
									<Text size="sm" color="var(--text-gray)">
										Edit Section below and see your result immediately{' '}
									</Text>
								</Flex.Column>
							</Flex>
							{hasData && (
								<Flex.Column className="max-w-[90%] w-full xl:max-w-[300px] ml-auto">
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
										<HoverCard.Content>
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
								</Flex.Column>
							)}
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
										<Accordion
											key="blocks-customization"
											dataKey="blocks"
											leadingIcon={<Customize width={16} height={16} />}
											title={
												<Flex
													alignItems="center"
													gap={18}
													fullWidth
													justifyContent="space-between"
												>
													<Text weight={600}>Customization</Text>
													{Object.keys(template).length > 0 && (
														<div className={styles.ColorPicker}>
															{template?.complimentaryColors.map(
																(color: string, index: number) => (
																	<span
																		key={index}
																		role="button"
																		tabIndex={0}
																		aria-label="colors"
																		onClick={(e) => {
																			e.stopPropagation();
																			setTemplate({
																				...template,
																				colors: {
																					...template.colors,
																					primary: color,
																				},
																			});
																		}}
																		className={
																			template.colors.primary === color
																				? styles.ColorPicker__active
																				: ''
																		}
																		style={{
																			backgroundColor: color,
																		}}
																	></span>
																)
															)}
														</div>
													)}
												</Flex>
											}
										>
											<Flex.Row gap={16}>
												<Field.Select
													label="Font Face"
													value={template?.fontFamily}
													options={FontFamily.map((font) => ({
														value: font,
														label: font,
													}))}
													onChange={(e: any) => {
														setTemplate({
															...template,
															fontFamily: e.target.value,
														});
													}}
												/>
												<div className="w-[49%]">
													<Field.Select
														label="Font Size"
														value={template?.fontSize}
														options={[
															{ value: 'sm', label: 'Small' },
															{ value: 'md', label: 'Medium' },
															{ value: 'lg', label: 'Large' },
														]}
														onChange={(e: any) => {
															setTemplate({
																...template,
																fontSize: e.target.value,
															});
														}}
													/>
												</div>
												<div className="w-[49%]">
													<Field.Select
														label="Margin Size"
														value={template?.margin}
														options={[
															{ value: 'sm', label: 'Small' },
															{ value: 'md', label: 'Medium' },
															{ value: 'lg', label: 'Large' },
														]}
														onChange={(e: any) => {
															setTemplate({
																...template,
																margin: e.target.value,
															});
														}}
													/>
												</div>
											</Flex.Row>
										</Accordion>
										{blocks.map((block, index) => {
											const Component = (COMPONENT_MAP[
												block.key as keyof typeof COMPONENT_MAP
											] ||
												COMPONENT_MAP[
													'default' as keyof typeof COMPONENT_MAP
												]) as any;

											const Icons = {
												heading: HeadingIcon,
												summary: SummaryIcon,
											};

											const LeadingIcon =
												Icons[block.key as keyof typeof Icons] || (() => null);

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
																leadingIcon={
																	typeof block.draggable === 'boolean' &&
																	!block.draggable ? (
																		<LeadingIcon width={14} height={14} />
																	) : null
																}
																title={
																	<Flex alignItems="center" gap={8}>
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
		</ScrollComp>
	);
};
