import React from 'react';
import Link from 'next/link';
import classNames from 'classnames';

import { forwardRefWrapper } from '@labs/utils';

import type { NativeElementProps, Prettify } from '@labs/utils/types/utility';

import styles from './call-to-action.module.scss';
import { Spinner } from '../spinner';
import { Flex } from '../layout';

type CTASize = 'sm' | 'md' | 'lg' | 'block';
type CTATheme = 'primary' | 'secondary' | 'clear' | 'error';
type CTAElement = 'button' | 'a';

type Ref = HTMLButtonElement | HTMLAnchorElement;

/**
 * Creates the dynamic component type based on the passed in component
 * @param T - The component type
 */
type CallToActionComponent<T> = Prettify<
	CallToActionProps & (T extends CTAElement ? NativeElementProps<T> : never)
>;

export interface CallToActionProps {
	/**
	 * Decides whether the CTA is outlined or not
	 * @default false
	 */
	outline?: boolean;
	/**
	 * Decides whether the CTA is disabled or not
	 * @default false
	 */
	disabled?: boolean;
	/**
	 * Decides the CTA size
	 * @default 'md'
	 */
	size?: CTASize;
	/**
	 * Decides the CTA variant
	 * @default 'primary'
	 */
	variant?: CTATheme;
	/**
	 * Decides the CTA leading icon
	 * @default undefined
	 */
	leadingIcon?: React.ReactElement;
	/**
	 * Decides the CTA trailing icon
	 * @default undefined
	 */
	trailingIcon?: React.ReactElement;
	/**
	 * Decides whether the CTA is loading or not
	 */
	isLoading?: boolean;
	/**
	 * Decides the CTA loading module
	 */
	loadingText?: string | React.ReactNode;
}

const createCallToActionComponent = <T extends CTAElement>(component: T) =>
	forwardRefWrapper<NativeElementProps<T>, CallToActionComponent<T | 'button'>>(
		'CallToAction',
		{
			children: null,
			className: undefined,
			disabled: false,
			outline: false,
			variant: 'primary',
			size: 'md',
		},
		(
			{
				children,
				className,
				disabled = false,
				outline = false,
				variant = 'primary',
				size = 'md',
				isLoading = false,
				loadingText = null,
				leadingIcon,
				trailingIcon,
				...otherProps
			},
			ref
		) => {
			const Component = (component || 'button') as React.ElementType;

			const classes = classNames([
				styles.CallToAction,
				outline && styles[`CTA${variant}-outline`],
				variant && !outline && styles[`CTA${variant}`],
				size && styles[size],
				disabled && styles.disabled,
				leadingIcon || trailingIcon ? styles.icon : '',
				className,
			]);

			const spinnerSize = {
				sm: 14,
				md: 16,
				lg: 18,
				block: 20,
			};

			return (
				<Component
					ref={ref}
					className={classes}
					disabled={disabled || isLoading}
					data-bc-component="CallToAction"
					{...otherProps}
				>
					{isLoading && (
						<Spinner
							size={spinnerSize[size as keyof typeof spinnerSize]}
							thickness="2"
							spinner="logo"
							isLoading={isLoading}
							color={variant === 'primary' && !outline ? '#fff' : undefined} // we need explicit colors here so we can get the right contrast
						/>
					)}

					<>
						{isLoading ? (
							loadingText
						) : (
							<>
								{leadingIcon && (
									<span className={styles.leadingIcon}>{leadingIcon}</span>
								)}
								{children}
								{trailingIcon && (
									<span className={styles.trailingIcon}>{trailingIcon}</span>
								)}
							</>
						)}
					</>
				</Component>
			);
		}
	);

/**
 * Component that renders a call to action button
 * @param {CallToActionProps} props - The CallToAction props
 * @returns {React.ReactElement} - The CallToAction component
 *
 * @example
 * <CallToAction>Click Me</CallToAction>
 * <CallToAction variant="secondary">Click Me</CallToAction>
 * <CallToAction variant="secondary" outline>Click Me</CallToAction>
 * <CallToAction variant="secondary" size="lg">Click Me</CallToAction>
 */
export const CallToAction = Object.assign(
	createCallToActionComponent('button'),
	{
		a: createCallToActionComponent(Link as unknown as 'a'),
		button: createCallToActionComponent('button'),
	}
);
