import React from 'react';
import {
	Draggable,
	DroppableProvided,
	DroppableStateSnapshot,
} from 'react-beautiful-dnd';
import classNames from 'classnames';

import type { ApplicationState } from '../types';
import { filterApplicationsByID } from '../utils';

import { StrictModeDroppable } from '@/features/build-resume/components/sm-droppable';
import { Flex, Text } from '@labs/components';
import { UserJobData } from '@/queries/types/job';

import ApplicationsGridItem from './grid-item';

export default function ApplicationsGridColumn({
	icon,
	categoryID,
	applications,
}: {
	icon: any;
	categoryID: ApplicationState;
	applications: UserJobData[];
}) {
	const filteredApplications = React.useMemo(
		() => filterApplicationsByID(applications, categoryID),
		[applications, categoryID]
	);

	const numberOfApplications = filteredApplications.length;

	return (
		<Flex.Column className="min-h-max md:min-h-screen" gap={32}>
			<Flex gap={8} alignItems="center" className="px-4">
				{icon}
				<Text as="p" weight={500}>
					{categoryID} ({numberOfApplications})
				</Text>
			</Flex>

			<StrictModeDroppable key={categoryID} droppableId={categoryID}>
				{(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
					<Flex.Column
						ref={provided.innerRef}
						gap={16}
						className={classNames(
							snapshot.isDraggingOver ? 'bg-[#f3f4f4]' : 'bg-white',
							'min-h-32 md:min-h-screen'
						)}
						{...provided.droppableProps}
					>
						{filteredApplications.map((application, index) => (
							<Draggable
								key={`draggable-${application.id}`}
								draggableId={`draggable-${application.id}`}
								index={index}
							>
								{(provided, _snapshot) => (
									<ApplicationsGridItem
										dragHandleProps={provided.dragHandleProps}
										{...provided.draggableProps}
										ref={provided.innerRef}
										key={application.status}
										jobDetails={application}
									/>
								)}
							</Draggable>
						))}
						{provided.placeholder}
					</Flex.Column>
				)}
			</StrictModeDroppable>
		</Flex.Column>
	);
}
