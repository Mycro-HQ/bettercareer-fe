/**
 * 📝 Notes for Contributors:
 *
 * @description Shows empty component
 *
 * - When creating an interactive component, we recommend consuming the
 * component hook created.
 * - Ensure the component is composable and can adapt to multiple use-cases
 *
 * Bootstrapped by Plop
 */

import classNames from 'classnames';
import React, { PropsWithChildren } from 'react';

import { Text } from '../../components/layout/text';

import EmptyIcon from '../../icons/misc/empty.svg';
import styles from './empty.module.scss';
import { Flex } from '../layout';

export interface EmptyProps extends PropsWithChildren<{}> {
	/**
	 * Empty message to display
	 * @default No results found
	 */
	message: string | React.ReactNode;
	/**
	 * Size of the empty component
	 * @default lg
	 */
	size?: 'sm' | 'lg' | 'md';
	/**
	 * Whether to stack the empty component
	 * @default true
	 */
	stack?: boolean;
	/**
	 * Empty color variant
	 */
	variant?: 'pop' | 'default';
	/**
	 * Whether to show the Audiomack logo
	 */
	noLogo?: boolean;
}

/**
 * @name Empty
 * @description Shows empty component when there are no results
 *
 * @example
 * <Empty message="No results found" />
 *
 * @example
 * <Empty message="No results found" size="sm" />
 * <Empty message="No results found" size="sm" stack={false} />
 * <Empty message="No results found" size="sm" variant="pop" />
 * <Empty message="No results found" size="sm" variant="pop" noLogo />
 */
export function Empty(props: EmptyProps) {
	const { message, size, stack, variant, noLogo = false } = props;

	return (
		<div
			className={classNames([
				styles.isEmpty,
				styles[`isEmpty--${size}`],
				stack && styles[`isEmpty--stack`],
				variant && styles[`isEmpty--${variant}`],
			])}
		>
			{!noLogo && <EmptyIcon />}
			<Text fontSize="16px" weight={700} color="var(--text-gray)">
				{message}
			</Text>
			{props.children && <Flex.Column gap={8}>{props.children}</Flex.Column>}
		</div>
	);
}

Empty.defaultProps = {
	message: 'No results found',
	size: 'md',
	stack: true,
	variant: 'pop',
};
