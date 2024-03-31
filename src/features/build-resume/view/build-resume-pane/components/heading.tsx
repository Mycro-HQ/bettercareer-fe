import React from 'react';
import { Field } from '@labs/components/field';
import { CallToAction } from '@labs/components';

export const HeadingModule = ({
	setField,
	field,
}: {
	setField: (field: any) => void;
	field: {
		name: string;
		email: string;
		title: string;
	};
}) => {
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
			<Field
				label="Email"
				value={field.email}
				placeholder="Your Email"
				onChange={(e) => setField({ email: e.target.value })}
			/>
		</Field.Form>
	);
};
