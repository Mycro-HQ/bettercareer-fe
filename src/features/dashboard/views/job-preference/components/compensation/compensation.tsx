import React from 'react';
import classNames from 'classnames';
import * as Slider from '@radix-ui/react-slider';

import { Flex, Heading, Text } from '@labs/components';
import MoneyIcon from '@labs/icons/misc/money.svg';

import styles from './compensation.module.scss';

type Currency = 'USD' | 'GBP' | 'EUR' | 'CAD';

const currencyList: Record<Currency, string> = {
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

export const Compensation = () => {
	const [currency, setcurrency] = React.useState<Currency>('USD');
	const [minimumSalary, setMinimumSalary] = React.useState(0);

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
							{currencyList[currency]}
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
								`CompensationCurrencyListItem--${currency === (key as Currency) ? 'selected' : ''}`
							],
						])}
						onClick={() => setcurrency(key as Currency)}
					>
						{currencyList[key as Currency]} {key}
					</button>
				))}
			</Flex>
		</Flex.Column>
	);
};
