import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';

import { Field } from '@labs/components/field';
import { getDataIcons, useDebounce } from '@labs/utils';
import { CallToAction, Flex, useToast } from '@labs/components';

export const SkillsAutoComplete = ({
	value: field,
	label,
	onChange,
}: {
	value: string[];
	label: string;
	onChange: (value: string[]) => void;
}) => {
	const { createToast } = useToast();
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
		if (Array.isArray(field) && field?.find((item: any) => item === val)) {
			return createToast({
				message: 'Skill already added',
				variant: 'error',
			});
		}
		setValue('');
		onChange([...field, val]);
	};

	const removeField = (val: any) => {
		const newField = field.filter((item: any) => item !== val);
		onChange([...newField]);
	};

	return (
		<Flex.Column gap={8} fullWidth>
			<Field.AutoComplete
				label={label}
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
							setNewField(value);
						}
					}
				}}
				onSelect={(value) => {
					setNewField(value);
					setValue('');
				}}
			/>

			<AutoCompletePill field={field} removeField={removeField} />
		</Flex.Column>
	);
};

export const AutoCompletePill = ({
	field,
	removeField,
}: {
	field: string[];
	removeField: (field: any) => void;
}) => {
	return (
		<Flex.Row gap={8}>
			{field?.length > 0 &&
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
							{item}
						</CallToAction>
					</motion.div>
				))}
		</Flex.Row>
	);
};
