import React from 'react';
import classNames from 'classnames';

import { CallToAction, Flex, Heading } from '@labs/components';
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

const priorityList = [
	'Actively Seeking',
	'Not Looking but Open to Opportunties',
	'Not Looking',
];

export const Availability = () => {
	const [selectedLocation, setSelectedLocation] = React.useState('');

	return (
		<Flex.Column gap={32} className={styles.Availability}>
			<Flex alignItems="center" gap={10}>
				<LocationIcon />
				<Heading.h4 fontSize="18px">
					Indicate your preferred work location
				</Heading.h4>
			</Flex>
			<Flex
				alignItems="center"
				flexWrap="wrap"
				gap={8}
				className={styles.AvailabilityList}
			>
				{locationList.map((location, i) => (
					<button
						key={i}
						onClick={() => setSelectedLocation(location)}
						className={classNames([
							styles.AvailabilityChip,
							styles[
								`AvailabilityChip--${location === selectedLocation && 'active'}`
							],
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
