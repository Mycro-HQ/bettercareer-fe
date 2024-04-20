import React from 'react';

import type { ApplicationJob } from '../types';
import { filterApplicationsByID } from '../utils';

import { Flex, Text } from '@labs/components';

import ApplicationsGridItem from './ApplicationGridItem';

export default function ApplicationsGridColumn({
	icon,
	id,
	applications,
}: {
	icon: any;
	id: string;
	applications: ApplicationJob[];
}) {
	const filteredApplications = React.useMemo(
		() => filterApplicationsByID(applications, id),
		[applications, id]
	);

	const numberOfApplications = filteredApplications.length;

	return (
		<Flex.Column className="min-h-max md:min-h-screen" gap={32}>
			<Flex gap={8} alignItems="center" className="px-4">
				{icon}
				<Text as="p" weight={500}>
					{id} ({numberOfApplications})
				</Text>
			</Flex>
			<Flex.Column gap={16}>
				{filteredApplications.map((application) => (
					<ApplicationsGridItem key={application.id} jobDetails={application} />
				))}
			</Flex.Column>
		</Flex.Column>
	);
}
