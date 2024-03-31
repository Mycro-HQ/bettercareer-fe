import React, { useCallback } from 'react';
import classNames from 'classnames';
import { format, isDate } from 'date-fns';

import { CallToAction, Flex, Text } from '@labs/components';
import Add from '@labs/icons/misc/add.svg';
import Edit from '@labs/icons/dashboard/edit.svg';
import Delete from '@labs/icons/dashboard/delete.svg';
import { useBuildStore } from '@/store/z-store/builder';
import ReadMore from '@/components/misc/read-more';

import { MODULE_COMPONENTS, MODULE_OPTIONS } from './utils';
import styles from './experience-frame.module.scss';

type ExperienceTypes =
	| 'experience'
	| 'education'
	| 'certifications'
	| 'projects';

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
	const { moduleAdd, setModuleAdd: setAddNew } = useBuildStore();
	const [isEditing, setIsEditing] = React.useState(false);
	const [fieldData, setFieldData] = React.useState<any>({});
	const addNew = moduleAdd[type];
	const moduleOptions = MODULE_OPTIONS[type] || {};

	const editFrame = useCallback(
		(data: any) => {
			setFieldData(data);
			setAddNew(type, true);
			setIsEditing(true);
		},
		[setFieldData, setAddNew]
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

	if (Array.isArray(field) && field.length > 0 && !addNew) {
		return (
			<FrameCards
				field={field}
				type={type}
				editFrame={editFrame}
				deleteFrame={removeField}
			/>
		);
	}

	return (
		<Flex flexWrap="wrap" gap={16} className={styles.ExperienceFrame}>
			{moduleOptions.fields.map((newField: any, index: number) => {
				let Component =
					MODULE_COMPONENTS[newField.type as keyof typeof MODULE_COMPONENTS] ||
					(() => null);

				if (fieldData?.current && newField.key === 'to') {
					Component = () => null;
				}

				return (
					<Flex
						key={index}
						className={styles.ExperienceFrame__Field}
						basis={(newField.span / 2) * 100 - 1 + '%'}
					>
						<Component
							label={newField.title}
							required={newField.required || false}
							placeholder={newField.title}
							name={newField.key}
							value={fieldData[newField.key as keyof typeof fieldData] || ''}
							isChecked={fieldData[newField.key as keyof typeof fieldData]}
							onChange={(e: any) => {
								if (newField.key === 'current' && e.target.checked) {
									setFieldData((prev: any) => ({
										...prev,
										to: '',
									}));
								}

								setFieldData((prev: any) => ({
									...prev,
									[newField.key]:
										newField.type === 'checkbox'
											? e.target.checked
											: e?.target?.value ?? e,
								}));
							}}
						/>
					</Flex>
				);
			})}
			<Flex justifyContent="flex-end" fullWidth gap={8}>
				{isEditing && (
					<CallToAction
						outline
						variant="primary"
						size="md"
						onClick={() => {
							removeField(fieldData);
							setFieldData({});
							setAddNew(type, false);
							setIsEditing(false);
						}}
					>
						Delete
					</CallToAction>
				)}
				<CallToAction
					variant="primary"
					size="md"
					disabled={fieldData === field}
					onClick={() => {
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
}: {
	field: any;
	type: ExperienceTypes;
	editFrame: (data: any) => void;
	deleteFrame: (data: any) => void;
}) => {
	const extractValidKeysFromType = MODULE_OPTIONS[type].card || {};

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
					{data}
				</Text>
			);
		}

		if (key === 'date') {
			return (
				<Text>
					{index > 0 && !!data && '- '}
					{isDate(data) ? (
						<>{format(new Date(data), 'MMM yyyy')}</>
					) : (
						<>{data && 'Present'}</>
					)}
				</Text>
			);
		}

		if (key === 'description') {
			return (
				<>
					<ReadMore text={data?.toString()} limit={200} className="mt-3" />
				</>
			);
		}

		return <Text>{data}</Text>;
	};
	return (
		<Flex.Column flexWrap="wrap" gap={16} className={styles.FrameCards}>
			{field.map((data: any, index: number) => {
				return (
					<Flex
						key={index}
						className={styles.FrameCards__Card}
						gap={16}
						fullWidth
						justifyContent="space-between"
						alignItems="flex-start"
					>
						<Flex.Column gap={4} className={styles.FrameCards__Card__Content}>
							{Object.keys(extractValidKeysFromType).map((extrc: any) => {
								return (
									<Flex key={extrc.key} gap={4}>
										{extractValidKeysFromType[
											extrc as keyof typeof extractValidKeysFromType
										].map((key: any, index: number) => (
											<>{extractComponent(extrc, data[key], index)}</>
										))}
									</Flex>
								);
							})}
						</Flex.Column>
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
							>
								<Edit />
							</button>
							<button
								onClick={() => deleteFrame(data)}
								aria-label="Delete"
								title="delete"
							>
								<Delete />
							</button>
						</Flex>
					</Flex>
				);
			})}
		</Flex.Column>
	);
};
export default ExperienceFrame;
