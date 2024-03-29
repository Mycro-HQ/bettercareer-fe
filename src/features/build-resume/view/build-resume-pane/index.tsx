import React from 'react';
import { Container, Heading, Text, Flex, CallToAction } from '@labs/components';
import { DragDropContext, Draggable } from 'react-beautiful-dnd';
import { ScrollArea } from '@radix-ui/themes';

import { Accordion } from '@labs/components/accordion';
import { StrictModeDroppable } from '../../components/sm-droppable';

import Add from '@labs/icons/misc/add.svg';
import Bulb from '@labs/icons/misc/bulb.svg';
import SparklesIcon from '@labs/icons/misc/sparkels.svg';
import DNDIcon from '@labs/icons/misc/dnd.svg';

import { useBuildStore } from '@/store/z-store/builder';

import styles from './build-resume-pane.module.scss';
import { COMPONENTMAP } from '../../lib';

export const BuildResumePane = () => {
	const {
		modules: blocks,
		setModules,
		setModuleData,
		removeModuleData,
		editModuleData,
	} = useBuildStore();

	function handleOnDragEnd(result: any) {
		if (!result.destination) return;
		const items = Array.from(blocks);
		const [reorderedItem] = items.splice(result.source.index, 1);
		items.splice(result.destination.index, 0, reorderedItem);

		setModules(items);
	}

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
									<Accordion.Group defaultActiveKey="2:block_item">
										{blocks.map((block, index) => {
											const Component = (COMPONENTMAP[
												block.key as keyof typeof COMPONENTMAP
											] || (() => null)) as any;
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
																		<Text weight={600}>{block.title}</Text>
																	</Flex>
																}
																trailingIcon={
																	Array.isArray(block?.data) &&
																	block?.data?.length ? (
																		<Add />
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
										onClick={() =>
											setModules([
												...blocks,
												{
													key: `new_section:${blocks.length + 1}`,
													title: 'New Section',
													data: {},
												},
											])
										}
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
