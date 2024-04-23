import React from 'react';
import { motion } from 'framer-motion';

import styles from '../build-resume-pane.module.scss';

import { Field } from '@labs/components/field';
import { Flex } from '@labs/components';
import { getDataIcons, parseValue } from '@labs/utils';
import { CallToAction } from '@labs/components';

export const HeadingModule = React.memo(
	({
		setField,
		field,
	}: {
		setField: (field: any) => void;
		field: {
			name: string;
			subheading: string[];
			title: string;
		};
		removeField: (field: any) => void;
	}) => {
		const [value, setValue] = React.useState('');
		const setSubField = (data: string) => {
			if (
				Array.isArray(field) &&
				field.subheading?.find((item: any) => parseValue(item) === data)
			) {
				return;
			}
			setValue('');
			setField({ subheading: [...(field.subheading || []), { value: data }] });
		};

		const removeField = (item: any) => {
			return setField({
				subheading:
					field?.subheading?.filter(
						(sub: any) => parseValue(sub) !== parseValue(item)
					) || [],
			});
		};
		return (
			<Field.Form>
				<Field
					label="Name"
					value={field.name}
					placeholder="Your Name"
					onChange={(e) => setField({ name: e.target.value })}
				/>
				<Field
					label="Title"
					value={field.title}
					placeholder="E.g Software Engineer"
					onChange={(e) => setField({ title: e.target.value })}
				/>
				<Flex.Column gap={8}>
					<label className={styles.TagLabel}>Contact Details</label>
					<div className={styles.TagInput}>
						{Array.isArray(field.subheading) &&
							field.subheading?.length > 0 &&
							field.subheading.map((item: any, index: number) => (
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
										onClick={(e) => {
											e.preventDefault();
											removeField(item);
										}}
									>
										{parseValue(item)}
									</CallToAction>
								</motion.div>
							))}
						<input
							type="text"
							value={value}
							placeholder="e.g Your email, phone number, linkedin profile etc."
							onChange={(e) => setValue(e.target.value)}
							onKeyDown={(e) => {
								if (e.key === 'Enter' || e.key === 'Tab') {
									e.preventDefault();

									if (value.length > 0) {
										setSubField((e.target as any).value);
									}
								}

								if (e.key === 'Backspace' && value.length === 0) {
									removeField(field.subheading[field.subheading.length - 1]);
								}
							}}
						/>
					</div>
				</Flex.Column>
			</Field.Form>
		);
	}
);
