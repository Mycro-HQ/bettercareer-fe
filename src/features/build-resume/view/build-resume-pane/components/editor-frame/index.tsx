import React, { useState } from 'react';
import { Field } from '@labs/components/field';
import CustomEditor from '../simple-rich-text';
import { useQuery } from '@tanstack/react-query';
import { getDataIcons, useDebounce } from '@labs/utils';
import { CallToAction, Flex } from '@labs/components';
import { APP_URL } from '@lib/config';
import { motion } from 'framer-motion';
export const EditorModule = ({
	type,
	setField,
	field,
}: {
	type: string;
	setField: (field: any) => void;
	field: {
		title: string;
		value: string;
	};
}) => {
	return (
		<Field.Form>
			{type !== 'summary' && (
				<Field
					label="Section Name"
					value={field.title}
					placeholder="Enter Section Name"
					onChange={(e) => setField({ title: e.target.value })}
				/>
			)}
			<CustomEditor
				value={field.value}
				onChange={(e: any) => setField({ value: e.target.value })}
			/>
		</Field.Form>
	);
};

export const SkillsModule = ({
	type,
	setField,
	field,
	removeField,
}: {
	type: string;
	setField: (field: any) => void;
	field: {
		title: string;
		value: string;
	};
	removeField: (field: any) => void;
}) => {
	const [value, setValue] = useState('');
	const _search = useDebounce(value, 500);
	const { data: suggestions, isPending } = useQuery({
		queryKey: ['summary-suggestions', _search],
		queryFn: async () => {
			const response = await fetch(
				`${window.location.origin}/api/skills?q=${_search}`
			);
			return response.json();
		},
		enabled: _search.length > 0,
	});

	const setNewField = (val: any) => {
		if (
			Array.isArray(field) &&
			field?.find((item: any) => item.value === val.value)
		) {
			return;
		}
		setValue('');
		setField({ value: val.value });
	};

	return (
		<>
			<Field.AutoComplete
				label={null}
				value={value}
				placeholder="Search for a skill or add a new one"
				onChange={(e) => setValue(e.target.value)}
				suggestions={suggestions}
				isLoading={isPending}
				onKeyDown={(e) => {
					if (e.key === 'Enter') {
						e.preventDefault();
						setValue('');

						if (value.length > 0) {
							setNewField({ value });
						}
					}
				}}
				onSelect={(value) => {
					setNewField({ value });
					setValue('');
				}}
			/>

			<Flex.Row gap={8} className="mt-1">
				{Array.isArray(field) &&
					field?.length > 0 &&
					field.map((item: any, index: number) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, scale: 0.9 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{
								staggerChildren: 0.1,
							}}
						>
							<CallToAction
								size="sm"
								variant="secondary"
								key={index}
								trailingIcon={
									<img
										src={getDataIcons('close', '#1388f2')}
										className="w-[10px]"
										aria-hidden="true"
									/>
								}
								onClick={() => removeField(item)}
							>
								{item.value}
							</CallToAction>
						</motion.div>
					))}
				{/* {field.map} */}
			</Flex.Row>
		</>
	);
};
