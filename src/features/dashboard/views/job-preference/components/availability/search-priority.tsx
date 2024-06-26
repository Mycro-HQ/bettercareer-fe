import React, { useEffect } from 'react';
import classNames from 'classnames';

import usePreferenceStore from '../../store/preference-store';
import { PreferenceDataType } from '../../utils';

import BriefcaseIcon from '@labs/icons/misc/brief-case.svg';
import { Flex, Heading } from '@labs/components';

import styles from './availability.module.scss';

const PriorityList = [
	'Actively Seeking',
	'Not Looking but Open to Opportunities',
	'Not Looking',
];

const SearchPriority = ({
	handleSelectionChange,
	userPreference,
}: {
	handleSelectionChange: (isSelectionMade: boolean) => void;
	userPreference: PreferenceDataType;
}) => {
	const { selectedPriority, handleSelectedPriority } = usePreferenceStore();

	React.useEffect(() => {
		handleSelectionChange(selectedPriority !== '');
	}, [handleSelectionChange, selectedPriority]);

	useEffect(() => {
		handleSelectedPriority(userPreference?.data.availability.jobStatus);
	}, [handleSelectedPriority, userPreference]);

	return (
		<Flex.Column gap={24} className={styles.Availability}>
			<Flex alignItems="center" gap={10}>
				<BriefcaseIcon />
				<Heading.h4 fontSize="18px">
					What is your job search status ?
				</Heading.h4>
			</Flex>
			<Flex alignItems="center" flexWrap="wrap" gap={8} className={styles.List}>
				{PriorityList.map((priority, i) => (
					<button
						key={i}
						onClick={() => handleSelectedPriority(priority)}
						className={classNames([
							styles.Chip,
							styles[`Chip--${selectedPriority === priority && 'active'}`],
						])}
					>
						{priority}
					</button>
				))}
			</Flex>
		</Flex.Column>
	);
};

export default SearchPriority;
