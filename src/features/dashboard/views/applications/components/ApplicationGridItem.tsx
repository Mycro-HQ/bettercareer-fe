import React from 'react';

import type { ApplicationJob } from '../types';
import { applicationsOptions } from '../data';
import styles from '../applications.module.scss';

import { Modal } from '@labs/components/modal';
import { Flex, Text } from '@labs/components';

import ApplicationModal from './ApplicationModal';
import OptionsDropDown from './ApplicationOptionsDropdown';

export default function ApplicationsGridItem({
	jobDetails,
}: {
	jobDetails: ApplicationJob;
}) {
	const [isModalOpen, setIsModalOpen] = React.useState(false);

	const id = jobDetails.id.split('_')[0];

	const options = applicationsOptions.filter((option) => option.id !== id);

	return (
		<Flex
			gap={10}
			className={styles.applicationGridItem}
			onClick={() => setIsModalOpen(true)}
		>
			<Modal in={isModalOpen} onClose={() => setIsModalOpen(false)} size="lg">
				<ApplicationModal options={options} id={id} />
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
			<OptionsDropDown options={options} id={jobDetails.id} />
		</Flex>
	);
}
