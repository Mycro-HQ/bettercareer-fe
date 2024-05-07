import React from 'react';
import { Text } from '@labs/components';

export function JobDescriptionTitle({ title }: { title: string }) {
	return (
		<Text as="span" weight={600} className="mb-3">
			{title}
		</Text>
	);
}

export function JobDescriptionBody({
	children,
	isChildText = true,
}: {
	children: React.ReactNode;
	isChildText?: boolean;
}) {
	return isChildText ? (
		<Text
			as="p"
			size="sm"
			weight={500}
			lineHeight="20px"
			className="text-[#273643]"
		>
			{children}
		</Text>
	) : (
		<div className="text-sm font-medium leading-5 text-[#273643]">
			{children}
		</div>
	);
}
