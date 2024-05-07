import React from 'react';
import classNames from 'classnames';
import * as Slider from '@radix-ui/react-slider';

import usePreferenceStore from '../../store/preference-store';

import { Flex, Heading, Text } from '@labs/components';
import MoneyIcon from '@labs/icons/misc/money.svg';

import styles from './compensation.module.scss';

type Currency = 'USD' | 'GBP' | 'EUR' | 'CAD';

interface CurrencyRecord {
	[key: string]: string;
}

const currencyList: CurrencyRecord = {
	USD: '$',
	GBP: '£',
	EUR: '€',
	CAD: '$',
};

const formatCurrencyValue = (value: number) => {
	if (value > 1000) {
		return (value / 1000).toFixed(0) + 'k';
	} else return value;
};

const Compensation = ({
	handleSelectionChange,
}: {
	handleSelectionChange: (isSelectionMade: boolean) => void;
}) => {
	const {
		minimumSalary,
		setMinimumSalary,
		preferredCurrency,
		setPreferredCurrency,
		selectedTargetRoles,
		isUserOpenToAllCompanySize,
		isUserOpenToAllRoleLevel,
		selectedRoleLevel,
		selectedWorkIndustry,
		selectedCompanySize,
		selectedQualifications,
		selectedLocation,
		selectedPriority,
	} = usePreferenceStore();

	const componentsState = [
		selectedTargetRoles,
		isUserOpenToAllRoleLevel,
		selectedRoleLevel,
		selectedWorkIndustry,
		isUserOpenToAllCompanySize,
		selectedCompanySize,
		selectedQualifications,
		selectedLocation,
		selectedPriority,
		minimumSalary,
	];

	function isAllTabCompleted() {
		for (const item of componentsState) {
			if (
				item === null ||
				item === undefined ||
				item === 0 ||
				(typeof item === 'string' && item.trim() === '') ||
				(Array.isArray(item) && item.length === 0)
			) {
				return false;
			}
		}
		return true;
	}

	React.useEffect(() => {
		handleSelectionChange(isAllTabCompleted());
	}, [componentsState, handleSelectionChange]);

	return (
		<Flex.Column gap={32} className={styles.Compensation}>
			<Flex alignItems="center" gap={10}>
				<MoneyIcon />
				<Heading.h4 fontSize="18px">
					What is your minimum expected salary ?
				</Heading.h4>
			</Flex>
			<Flex>
				<Flex.Column gap={16}>
					<div className={styles.CompensationCounter}>
						<Text.p size="sm" weight={500}>
							Minimum
						</Text.p>
						<Heading.h5 fontSize="24px" weight={600}>
							{currencyList[preferredCurrency]}
							{formatCurrencyValue(minimumSalary)}
						</Heading.h5>
					</div>
					<Slider.Root
						className={styles.CompensationSliderRoot}
						defaultValue={[minimumSalary]}
						onValueChange={(value) => setMinimumSalary(value[0])}
						step={1000}
						max={500000}
					>
						<Slider.Track className={styles.CompensationSliderTrack}>
							<Slider.Range className={styles.CompensationSliderRange} />
						</Slider.Track>
						<Slider.Thumb
							className={styles.CompensationSliderThumb}
							aria-label="minimum salary"
						/>
					</Slider.Root>
				</Flex.Column>
			</Flex>
			<Flex className={styles.CompensationCurrencyList}>
				{Object.keys(currencyList).map((key) => (
					<button
						key={key}
						className={classNames([
							styles.CompensationCurrencyListItem,
							styles[
								`CompensationCurrencyListItem--${preferredCurrency === (key as Currency) ? 'selected' : ''}`
							],
						])}
						onClick={() => setPreferredCurrency(key as Currency)}
					>
						{currencyList[key as Currency]} {key}
					</button>
				))}
			</Flex>
		</Flex.Column>
	);
};

export default Compensation;
