import React, { Fragment, useCallback } from 'react';
import classNames from 'classnames';
import { format, isDate } from 'date-fns';
import { DragDropContext, Draggable } from 'react-beautiful-dnd';

import {
	CallToAction,
	Flex,
	Text,
	capitalize,
	getDataIcons,
	parseValue,
	useFeedback,
} from '@labs';
import Add from '@labs/icons/misc/add.svg';
import Edit from '@labs/icons/dashboard/edit.svg';
import Delete from '@labs/icons/dashboard/delete.svg';
import { useBuildStore } from '@/store/z-store/builder';
import ReadMore from '@/components/misc/read-more';
import DNDIcon from '@labs/icons/misc/dnd.svg';
import { StrictModeDroppable } from '@/features/build-resume/components/sm-droppable';

import { MODULE_COMPONENTS, MODULE_OPTIONS } from './utils';
import styles from './experience-frame.module.scss';

type ExperienceTypes =
	| 'experiences'
	| 'educations'
	| 'certifications'
	| 'projects'
	| 'skills';

const ExperienceFrame = ({
	type,
	field,
	setField,
	editField,
	removeField,
}: {
	type: ExperienceTypes;
	field: any;
	setField: (field: any) => void;
	editField: (field: any) => void;
	removeField: (field: any) => void;
}) => {
	const { createDisclosure } = useFeedback();
	const { moduleAdd, setModuleAdd: setAddNew } = useBuildStore();
	const [isEditing, setIsEditing] = React.useState(false);
	const [fieldData, setFieldData] = React.useState<any>({});
	const [localError, setLocalError] = React.useState<string | null>(null);
	const addNew = moduleAdd[type];
	const moduleOptions = MODULE_OPTIONS[type] || {};

	const editFrame = useCallback(
		(data: any) => {
			setFieldData(data);
			setAddNew(type, true);
			setIsEditing(true);
		},
		[setFieldData, setAddNew, type]
	);

	if (Array.isArray(field) && field.length === 0 && !addNew) {
		return (
			<FrameEmpty
				message={moduleOptions.emptyMessage}
				title={moduleOptions.name}
				onClick={() => setAddNew(type, true)}
			/>
		);
	}

	const verifyAllRequiredFields = (fieldData: any) => {
		const requiredFields = moduleOptions.fields
			.filter((field: any) => field.required)
			.map((field: any) => field.key);

		return requiredFields.some((field: any) => {
			if (field === 'to' && fieldData['current']) return false;

			return !fieldData[field];
		});
	};

	const deleteFrame = async (data: any) => {
		await createDisclosure({
			title: 'Delete',
			message: 'Are you sure you want to delete this item?',
		});

		setFieldData({});
		removeField(data);
		setAddNew(type, false);
		setIsEditing(false);
	};

	return (
		<Flex.Column gap={14}>
			{addNew && (
				<Flex
					flexWrap="wrap"
					gap={16}
					className={classNames([
						styles.ExperienceFrame,
						styles.ExperienceFrame__Edit,
					])}
				>
					{moduleOptions.fields.map((newField: any, index: number) => {
						let Component =
							MODULE_COMPONENTS[
								newField.type as keyof typeof MODULE_COMPONENTS
							] || (() => null);

						if (fieldData?.current && newField.key === 'to') {
							Component = () => null;
						}

						const outputs = (key: string, e: any) => {
							if (key === 'checkbox') {
								return e.target.checked;
							}

							if (key === 'date') {
								if (isDate(e)) {
									return format(e, 'yyyy-MM-dd');
								}

								return e;
							}

							if (key === 'textarea') {
								return {
									value: e?.target?.value ?? e,
									textContent: e?.currentTarget?.outerText ?? e,
								};
							}
							return e?.target?.value ?? e;
						};

						const inputs = (key: string) => {
							if (key === 'textarea') {
								return (
									parseValue(
										fieldData[newField.key as keyof typeof fieldData]
									) ?? ''
								);
							}

							return fieldData[newField.key as keyof typeof fieldData] ?? '';
						};

						return (
							<Flex
								key={index}
								className={styles.ExperienceFrame__Field}
								basis={(newField.span / 2) * 100 - 1.5 + '%'}
								flexWrap="wrap"
							>
								<Component
									label={newField.title}
									required={newField.required || false}
									placeholder={newField.title}
									name={newField.key}
									value={inputs(newField.type)}
									{...(newField.type === 'textarea' && {
										toolbar: [
											'bold',
											'italic',
											'underline',
											'link',
											'divider',
											'bulletList',
											'divider',
											'clearFormatting',
										],
									})}
									{...(newField.type === 'checkbox' && {
										isChecked:
											fieldData[newField.key as keyof typeof fieldData],
									})}
									onChange={(e: any) => {
										if (newField.key === 'current' && e.target.checked) {
											setFieldData((prev: any) => ({
												...prev,
												to: null,
											}));
										}

										// check and make sure that from date is not greater than to date
										if (newField.type === 'date') {
											const fromFields = ['from', 'issued'];
											const toFields = ['to', 'expires'];

											if (
												toFields.includes(newField.key) ||
												fromFields.includes(newField.key)
											) {
												// check if from date is greater than to date
												if (
													new Date(
														fieldData[
															fromFields[toFields.indexOf(newField.key)]
														]
													) > new Date(outputs(newField.type, e)) ||
													new Date(outputs(newField.type, e)) <
														new Date(
															fieldData[
																fromFields[toFields.indexOf(newField.key)]
															]
														)
												) {
													setLocalError(
														'To date cannot be less than from date'
													);
													// return;
												} else {
													setLocalError(null);
												}
											}
										}

										setFieldData((prev: any) => ({
											...prev,
											[newField.key]: outputs(newField.type, e),
										}));
									}}
								/>
								{localError && newField.type === 'date' && (
									<Text
										fontSize="13px"
										className="mt-2"
										color="var(--primary-red)"
									>
										{localError}
									</Text>
								)}
							</Flex>
						);
					})}
					<Flex justifyContent="flex-end" fullWidth gap={8}>
						<CallToAction
							outline
							variant="primary"
							size="md"
							onClick={() => {
								setAddNew(type, false);
								setIsEditing(false);
							}}
						>
							Close
						</CallToAction>

						<CallToAction
							variant="primary"
							size="md"
							disabled={verifyAllRequiredFields(fieldData) || !!localError}
							onClick={() => {
								if (localError) return;
								if (isEditing) {
									editField(fieldData);
								} else {
									setField(fieldData);
								}

								setAddNew(type, false);
								setIsEditing(false);
								setFieldData({});
							}}
						>
							Save
						</CallToAction>
					</Flex>
				</Flex>
			)}
			{Array.isArray(field) && field.length > 0 && (
				<FrameCards
					field={field}
					type={type}
					setField={setField}
					editFrame={editFrame}
					deleteFrame={deleteFrame}
				/>
			)}
		</Flex.Column>
	);
};

const FrameEmpty = ({
	message,
	title,
	onClick,
}: {
	message: string;
	title: string;
	onClick: () => void;
}) => {
	return (
		<div className={styles.FrameEmpty}>
			<Text>{message}</Text>
			<CallToAction
				outline
				variant="primary"
				size="md"
				leadingIcon={<Add />}
				onClick={onClick}
			>
				Add {title}
			</CallToAction>
		</div>
	);
};

const FrameCards = ({
	field,
	type,
	editFrame,
	deleteFrame,
	setField,
}: {
	field: any;
	type: ExperienceTypes;
	editFrame: (data: any) => void;
	deleteFrame: (data: any) => void;
	setField: (
		field: any,
		options: {
			edit: boolean;
		}
	) => void;
}) => {
	const extractValidKeysFromType = MODULE_OPTIONS[type].card || {};

	function handleOnDragEnd(result: any) {
		if (!result.destination) return;
		const items = Array.from(field);
		const [reorderedItem] = items.splice(result.source.index, 1);
		items.splice(result.destination.index, 0, reorderedItem);

		setField(items, { edit: false });
	}

	const extractComponent = (key: string, data: any, index: number) => {
		if (key === 'title') {
			return (
				<Text
					className={classNames([
						index === 1 && styles.blue,
						styles.FrameCards__Card__Content__Title,
					])}
					weight={700}
				>
					{index === 1 && !!data && '- '}
					{data || capitalize(type)}
				</Text>
			);
		}

		if (key === 'date') {
			return (
				<Text>
					{index > 0 && !!data && '- '}

					{!!data && typeof data !== 'boolean' ? (
						<>{isDate(data) ? format(new Date(data), 'MMM yyyy') : data}</>
					) : (
						<>{data && 'Present'}</>
					)}
				</Text>
			);
		}

		if (key === 'description') {
			return (
				<>
					<ReadMore
						text={(data?.textContent ?? data)
							?.replace(/<[^>]*>?/gm, '')
							?.toString()}
						limit={200}
						className="mt-3"
					/>
				</>
			);
		}
		return <Text>{data?.toString()}</Text>;
	};
	return (
		<DragDropContext onDragEnd={handleOnDragEnd}>
			<StrictModeDroppable droppableId="blocks">
				{(droppable: any) => (
					<div {...droppable.droppableProps} ref={droppable.innerRef}>
						<Flex.Column flexWrap="wrap" gap={16} className={styles.FrameCards}>
							{field.map((data: any, index: number) => {
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
												<Flex
													key={index + data.title}
													className={styles.FrameCards__Card}
													gap={14}
													fullWidth
													justifyContent="space-between"
													alignItems="flex-start"
												>
													<Flex
														gap={8}
														className={styles.FrameCards__Card__Content}
														justifyContent="center"
														alignItems="flex-start"
													>
														<button
															{...draggable.dragHandleProps}
															role="button"
															tabIndex={0}
															aria-label="drag"
															className="mt-[8px]"
															onClick={(e) => e.stopPropagation()}
														>
															<DNDIcon width={13} height={13} />
														</button>
														<Flex.Column gap={4}>
															{Object.keys(extractValidKeysFromType).map(
																(extrc: any, index: number) => {
																	return (
																		<Flex key={`${extrc.key}:${index}`} gap={4}>
																			{extractValidKeysFromType[
																				extrc as keyof typeof extractValidKeysFromType
																			].map((key: any, index: number) => (
																				<Fragment key={`${key}:${index}`}>
																					{extractComponent(
																						extrc,
																						data[key],
																						index
																					)}
																				</Fragment>
																			))}
																		</Flex>
																	);
																}
															)}
														</Flex.Column>
													</Flex>
													<Flex
														className={styles.FrameCards__Card__Actions}
														gap={14}
														alignItems="center"
													>
														<button
															onClick={() => {
																return editFrame(data);
															}}
															aria-label="Edit"
															title="edit"
															className="p-[4px] cursor-pointer block transition-all  duration-200 ease-in-out hover:opacity-60"
														>
															<Edit />
														</button>
														<button
															onClick={() => deleteFrame(data)}
															aria-label="Delete"
															title="delete"
															className="p-[4px] cursor-pointer block transition-all  duration-200 ease-in-out hover:opacity-60"
														>
															<Delete />
														</button>
													</Flex>
												</Flex>
												{draggable.placeholder}
											</div>
										)}
									</Draggable>
								);
							})}
						</Flex.Column>
						{droppable.placeholder}
					</div>
				)}
			</StrictModeDroppable>
		</DragDropContext>
	);
};
export default ExperienceFrame;
