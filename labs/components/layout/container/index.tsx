import React from 'react';
import classNames from 'classnames';

import { forwardRefWrapper } from '../../../utils';

import type { NativeElementProps } from '../../../utils/types/utility';

import styles from './container.module.scss';

type MaxWidth = 'sm' | 'md' | 'lg' | 'xl' | (string & {});

export interface IContainer extends NativeElementProps<'div'> {
	/**
	 * Make container get a full bleed
	 */
	fluid?: boolean;
	/**
	 * Container max width on restraint elements
	 */
	maxWidth?: MaxWidth;
	/**
	 * Remove container gutters
	 */
	noGutter?: boolean;
}

/**
 * Container is a component that is used to create a container.
 * @type {React.ForwardRefExoticComponent<IContainer & React.RefAttributes<HTMLDivElement>>}
 * @interface IContainer
 *
 * @param fluid Make container get a full bleed
 * @param maxWidth Container max width on restraint elements
 * @param noGutter Remove container gutters
 * @returns {React.ReactElement}
 *
 * @example
 * <Container>
 *  <div>Content</div>
 * </Container>
 *
 * <Container fluid>
 *  <div>Content</div>
 * </Container>
 *
 * <Container maxWidth="sm">
 *  <div>Content</div>
 * </Container>
 */
export const Container = forwardRefWrapper<HTMLDivElement, IContainer>(
	'Container',
	{
		fluid: false,
		noGutter: false,
	},

	(props, ref) => {
		const { fluid, maxWidth, noGutter, ...rest } = props;
		const maxWidths = ['sm', 'md', 'lg', 'xl'];

		const _class = classNames([
			styles.Container,
			fluid && styles.Fluid,
			noGutter && styles.noGutter,
			maxWidths.includes(maxWidth!) && styles[`maxWidth--${maxWidth}`],
			rest.className,
		]);

		const _style = {
			maxWidth: !maxWidths.includes(maxWidth!) ? maxWidth : undefined,
			...rest.style,
		};

		return (
			<div
				ref={ref}
				{...rest}
				style={_style}
				className={_class}
				role="region"
			/>
		);
	}
);
