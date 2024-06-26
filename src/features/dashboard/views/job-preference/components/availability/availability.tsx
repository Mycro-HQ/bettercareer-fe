import React, { useEffect } from 'react';
import classNames from 'classnames';

import usePreferenceStore from '../../store/preference-store';

import { Flex, Heading } from '@labs/components';
import LocationIcon from '@labs/icons/misc/location.svg';
import TickIcon from '@labs/icons/misc/tick.svg';
import SquareIcon from '@labs/icons/misc/square.svg';

import styles from './availability.module.scss';
import { PreferenceDataType } from '../../utils';

const locationList = [
	' Remote',
	'Canada',
	'Paris',
	'Los Angeles',
	'Dublin',
	'Florida',
	'Berlin',
	'London',
	'Glasgow',
	'Lagos',
	'Amsterdam',
	'Toronto',
	'Miami',
	'Abuja',
	'Chicago',
	'San Francisco',
	'Denver',
	'Barcelona',
	'Australia',
];

const Availability = ({
	handleSelectionChange,
	userPreference,
}: {
	handleSelectionChange: (isSelectionMade: boolean) => void;
	userPreference: PreferenceDataType;
}) => {
	const { selectedLocation, handleSelectedLocation, setSelectedLocation } =
		usePreferenceStore();

	React.useEffect(() => {
		handleSelectionChange(selectedLocation.length > 0);
	}, [handleSelectionChange, selectedLocation]);

	useEffect(() => {
		setSelectedLocation(userPreference?.data.availability.workLocations);
	}, [setSelectedLocation, userPreference]);

	return (
		<Flex.Column gap={32} className={styles.Availability}>
			<Flex alignItems="center" gap={10}>
				<LocationIcon />
				<Heading.h4 fontSize="18px">
					Indicate your preferred work location
				</Heading.h4>
			</Flex>
			<Flex alignItems="center" flexWrap="wrap" gap={8} className={styles.List}>
				{locationList.map((location, i) => (
					<button
						key={i}
						onClick={() => handleSelectedLocation(location)}
						className={classNames([
							styles.Chip,
							styles[
								`Chip--${selectedLocation.includes(location) && 'active'}`
							],
						])}
					>
						{selectedLocation.includes(location) ? (
							<TickIcon />
						) : (
							<SquareIcon />
						)}
						{location}
					</button>
				))}
			</Flex>
		</Flex.Column>
	);
};

export default Availability;
