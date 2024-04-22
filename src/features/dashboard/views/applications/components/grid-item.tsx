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
		<Flex
			gap={10}
			className={styles.applicationGridItem}
			onClick={() => setIsModalOpen(true)}
			ref={ref}
			{...otherProps}
		>
			<div className="flex justify-center items-center" {...dragHandleProps}>
				<DNDIcon />
			</div>
			<Modal in={isModalOpen} onClose={() => setIsModalOpen(false)} size="lg">
				<ApplicationModal options={options} id={jobDetails.categoryID} />
			</Modal>
			<div>{jobDetails.icon}</div>
			<div className="mr-2">
				<Text as="p">{jobDetails.title}</Text>
				<Text
					as="span"
					className={styles.aGIsubTitle}
					color="var(--text-gray)"
					size="xs"
					weight={500}
				>
					{jobDetails.company} . {jobDetails.location} . {jobDetails.workMode}
				</Text>
			</div>
			<OptionsDropDown options={options} id={jobDetails.categoryID} />
		</Flex>
	);
});

export default ApplicationsGridItem;
