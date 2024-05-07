import React from 'react';
import { DraggableProvidedDragHandleProps } from 'react-beautiful-dnd';

import type { ApplicationJob } from '../types';
import { applicationsOptions } from '../data';
import styles from '../applications.module.scss';

import { Modal } from '@labs/components/modal';
import { Flex, Text } from '@labs/components';
import DNDIcon from '@labs/icons/misc/dnd.svg';

import ApplicationModal from './modal';
import OptionsDropDown from './options-dropdown';

interface ApplicationGridItem extends React.HTMLAttributes<HTMLDivElement> {
	jobDetails: ApplicationJob;
	dragHandleProps: DraggableProvidedDragHandleProps | null | undefined;
}

const ApplicationsGridItem = React.forwardRef<
	HTMLDivElement,
	ApplicationGridItem
>(({ jobDetails, dragHandleProps, ...otherProps }, ref) => {
	const [isModalOpen, setIsModalOpen] = React.useState(false);

	const options = applicationsOptions.filter(
		(option) => option.id !== jobDetails.categoryID
	);

	return (
		<>
			<Flex
				gap={8}
				className={styles.applicationGridItem}
				onClick={() => setIsModalOpen(true)}
				ref={ref}
				{...dragHandleProps}
				{...otherProps}
			>
				<div className={styles.aGIIcon}>{jobDetails.icon}</div>
				<Flex.Column gap={2} className="mr-2">
					<Text fontSize="15px" noOfLines={1}>
						{jobDetails.title}
					</Text>
					<Text
						className={styles.aGIsubTitle}
						color="var(--text-gray)"
						size="sm"
						weight={500}
					>
						{jobDetails.company} . {jobDetails.location} . {jobDetails.workMode}
					</Text>
				</Flex.Column>
				<OptionsDropDown options={options} id={jobDetails.categoryID} />
			</Flex>
			<Modal in={isModalOpen} onClose={() => setIsModalOpen(false)} size="lg">
				<ApplicationModal options={options} id={jobDetails.categoryID} />
			</Modal>
		</>
	);
});

export default ApplicationsGridItem;
