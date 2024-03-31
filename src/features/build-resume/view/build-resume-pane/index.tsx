import React, { useState } from 'react';
import { DragDropContext, Draggable } from 'react-beautiful-dnd';
import { ScrollArea } from '@radix-ui/themes';
import classNames from 'classnames';

import { COMPONENT_MAP } from '../../lib';
import { StrictModeDroppable } from '../../components/sm-droppable';

import { CallToAction, Container, Flex, Heading, Text } from '@labs/components';
import { Accordion } from '@labs/components/accordion';
import Add from '@labs/icons/misc/add.svg';
import Bulb from '@labs/icons/misc/bulb.svg';
import SparklesIcon from '@labs/icons/misc/sparkels.svg';
import DNDIcon from '@labs/icons/misc/dnd.svg';
import { useBuildStore } from '@/store/z-store/builder';

import styles from './build-resume-pane.module.scss';

export const BuildResumePane = () => {
	const {
		modules: blocks,
		moduleAdd,
		setModules,
		setModuleData,
		removeModuleData,
		editModuleData,
		setModuleAdd: setAddNew,
	} = useBuildStore();

	function handleOnDragEnd(result: any) {
		if (!result.destination) return;
		const items = Array.from(blocks);
		const [reorderedItem] = items.splice(result.source.index, 1);
		items.splice(result.destination.index, 0, reorderedItem);

		setModules(items);
	}

	const [defaultAccordionKey, setDefaultKey] = useState('0:block_item');

	return (
		<ScrollArea type="scroll" scrollbars="vertical">
			<div className={styles.BuildResumePane}>
				<DragDropContext onDragEnd={handleOnDragEnd}>
					<Container className="my-[40px]" maxWidth="lg">
						<Flex gap={8}>
							<SparklesIcon />
							<Flex.Column gap={4}>
								<Heading.h4 weight={400}>Build Resume</Heading.h4>
								<Text size="sm" color="var(--text-gray)">
									Edit Section below and see your result immediately{' '}
								</Text>
							</Flex.Column>
							<CallToAction
								variant="secondary"
								size="sm"
								className="ml-auto mt-auto"
							>
								Tailor to job
							</CallToAction>
						</Flex>
					</Container>

					<Container maxWidth="lg">
						<StrictModeDroppable droppableId="blocks">
							{(droppable: any) => (
								<div
									{...droppable.droppableProps}
									ref={droppable.innerRef}
									className="flex flex-col gap-[8px]"
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
																		<span
																			{...draggable.dragHandleProps}
																			role="button"
																			tabIndex={0}
																			aria-label="drag"
																			onClick={(e) => e.stopPropagation()}
																		>
																			<DNDIcon />
																		</span>
																		<Text weight={600}>
																			{block.key.startsWith('new_section')
																				? (block?.data as any)?.title ??
																					block.title
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
																	setField={(data: Array<any> | object) =>
																		setModuleData(block.key, data)
																	}
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
