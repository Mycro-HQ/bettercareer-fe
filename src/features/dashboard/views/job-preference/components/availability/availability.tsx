import React from 'react';
import classNames from 'classnames';

import usePreferenceStore from '../../store/preference-store';

import { Flex, Heading } from '@labs/components';
import LocationIcon from '@labs/icons/misc/location.svg';
import TickIcon from '@labs/icons/misc/tick.svg';
import SquareIcon from '@labs/icons/misc/square.svg';

import styles from './availability.module.scss';

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

const Availability = () => {
	const { selectedLocation, handleSelectedLocation, setIsButtonDisabled } =
		usePreferenceStore();

	React.useEffect(() => {
		if (selectedLocation) {
			setIsButtonDisabled(false);
		} else {
			setIsButtonDisabled(true);
		}
	}, [selectedLocation, setIsButtonDisabled]);

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
							styles[`Chip--${location === selectedLocation && 'active'}`],
						])}
					>
						{location === selectedLocation ? <TickIcon /> : <SquareIcon />}
						{location}
					</button>
				))}
			</Flex>
		</Flex.Column>
	);
};

export default Availability;
