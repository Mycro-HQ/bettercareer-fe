import React from 'react';
import { DraggableProvidedDragHandleProps } from 'react-beautiful-dnd';

import { applicationsOptions } from '../data';
import styles from '../applications.module.scss';

import { Modal } from '@labs/components/modal';
import { Flex, Text } from '@labs/components';
import { UserJobData } from '@/queries/types/job';

import ApplicationModal from './modal';
import OptionsDropDown from './options-dropdown';

interface ApplicationGridItem extends React.HTMLAttributes<HTMLDivElement> {
	jobDetails: UserJobData;
	dragHandleProps: DraggableProvidedDragHandleProps | null | undefined;
}

const ApplicationsGridItem = React.forwardRef<
	HTMLDivElement,
	ApplicationGridItem
>(({ jobDetails, dragHandleProps, ...otherProps }, ref) => {
	const [isModalOpen, setIsModalOpen] = React.useState(false);

	const options = applicationsOptions.filter(
		(option) => option.id !== jobDetails.status
	);

	return (
		<>
			<Flex
				gap={8}
				className={styles.applicationGridItem}
				// onClick={() => setIsModalOpen(false)}
				ref={ref}
				{...dragHandleProps}
				{...otherProps}
			>
				{jobDetails.job.logo && (
					<div className={styles.aGIIcon}>{jobDetails.job.logo}</div>
				)}
				<Flex.Column
					gap={2}
					className="mr-2"
					onClick={() => setIsModalOpen(true)}
				>
					<Text fontSize="15px" noOfLines={1}>
						{jobDetails.job.title}
					</Text>
					<Text
						className={styles.aGIsubTitle}
						color="var(--text-gray)"
						size="sm"
						weight={500}
					>
						{jobDetails.job.company} . {jobDetails.job.location}
						{/* .{' '} {jobDetails.job.location} */}
					</Text>
				</Flex.Column>
				<OptionsDropDown options={options} id={jobDetails.id} />
			</Flex>
			<Modal in={isModalOpen} onClose={() => setIsModalOpen(false)} size="lg">
				<ApplicationModal options={options} userJob={jobDetails} />
			</Modal>
		</>
	);
});

export default ApplicationsGridItem;
