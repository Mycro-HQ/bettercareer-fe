/**
 * CheckableInteractive Component
 *
 * This component provides an interactive switch, checkbox, or radio input with a customizable
 * appearance and behavior. It's built with accessibility in mind, and offers a flexible API
 * for various use-cases.
 *
 * Usage Guidelines:
 * - Consume the component hook when creating an interactive component.
 * - Ensure the component is adaptable to multiple scenarios.
 *
 * Originally Bootstrapped by Plop.
 */

import React, { FC, useState, useMemo } from 'react';
import classNames from 'classnames';

import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { NativeElementProps } from '@labs/utils/types/utility';
import { generateUUID, useDynamicStyle } from '@labs/utils';

import styles from './checkable-interactive.module.scss';

export type CheckableInteractiveSize = 'sm' | 'lg';

export interface CheckableInteractiveProps
	extends Omit<NativeElementProps<'input'>, 'size' | 'onChange'> {
	/**
	 * Initiates the CheckableInteractive Name
	 * @default undefined
	 */
	name?: string;
	/**
	 * Controls the CheckableInteractive Disabled state
	 * @default false
	 */
	isDisabled?: boolean;
	/**
	 * Controls the CheckableInteractive ID, usually used for accessibility
	 * @default 'switch'
	 */
	id?: string;
	/**
	 * Controls the CheckableInteractive Size state
	 * @default 'lg'
	 */
	size?: CheckableInteractiveSize;
	/**
	 * Controls the CheckableInteractive onChange event
	 * @default undefined
	 */
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	/**
	 * Controls the CheckableInteractive Checked state (controlled)
	 * @default false
	 */
	isChecked?: boolean;
	/**
	 * Controls the CheckableInteractive Label
	 * @default ''
	 */
	label?: string;
	/**
	 * Controls the CheckableInteractive Input Type
	 * @default 'switch'
	 */
	inputType?: 'checkbox' | 'radio' | 'switch';
	/**
	 * Controls the CheckableInteractive variant
	 */
	variant?: 'primary' | 'error';
}

const CheckableInteractive: FC<CheckableInteractiveProps> = ({
	name,
	isDisabled = false,
	isChecked = false,
	label = '',
	size = 'lg',
	id,
	inputType = 'switch',
	onChange,
	variant,
	...rest
}) => {
	const [_checked, setChecked] = useState(isChecked);
	const interactiveId = useMemo(() => generateUUID(), []);

	const resolvedCheck = useMemo(
		() => (onChange ? isChecked : _checked),
		[isChecked, _checked, onChange]
	);

	const handleKeyDown = (event: React.KeyboardEvent) => {
		if ([' ', 'Enter'].includes(event.key)) {
			event.preventDefault();
			setChecked(!resolvedCheck);
		}
	};

	const componentClass = classNames(styles.CheckableInteractiveWrapper, {
		[styles[`CheckableInteractive--${inputType}`]]: true,
		[styles.sm]: size === 'sm',
		[styles.disabled]: isDisabled,
		[styles.isChecked]: resolvedCheck,
		[rest.className || '']: !!rest.className,
	});

	const _classes = useDynamicStyle({
		'--checkable-color': variant === 'error' ? 'var(--primary-red)' : undefined,
		'--checkable-transform': variant === 'error' ? '90deg' : undefined,
	} as React.CSSProperties);

	return (
		<div
			{...rest}
			className={componentClass}
			role={inputType}
			aria-checked={resolvedCheck}
			tabIndex={isDisabled ? -1 : 0}
			data-amlabs-checkable-interactive-wrapper={inputType}
		>
			<span className={styles.CheckableInteractive}>
				<input
					type={inputType === 'switch' ? 'checkbox' : inputType}
					name={name}
					data-amlabs-checkable-interactive={inputType}
					checked={resolvedCheck}
					onChange={(e) => {
						if (!onChange) setChecked(!resolvedCheck);
						onChange?.(e);
					}}
					onKeyDown={handleKeyDown}
					id={id || interactiveId}
					disabled={isDisabled}
				/>
				<span className={classNames([styles.Interactive, _classes])} />
			</span>

			{label && (
				<label htmlFor={id || interactiveId} className={styles.Label}>
					{label}
				</label>
			)}
			<VisuallyHidden>{resolvedCheck ? 'Checked' : 'Unchecked'}</VisuallyHidden>
		</div>
	);
};

CheckableInteractive.defaultProps = {
	name: undefined,
	isDisabled: false,
	checked: false,
	label: '',
	size: 'lg',
	onChange: undefined,
};

/**
 * This is a TypeScript React component for a switch with customizable props such as label, size, and
 * onChange function.
 * @param {CheckableInteractiveProps} props - The `props` parameter is an object that contains the following
 * properties:
 * @returns A React functional component named `Switch` is being returned.
 *
 * @example
 * import { Switch } from '@audiomack/am-labs';
 *
 * <Switch
 *   name="switch"
 *   isDisabled={false}
 *   size="lg"
 *   onChange={(e) => console.log(e)}
 *   checked={false}
 *   label="hello"
 * />
 */
export const Switch = (props: CheckableInteractiveProps) => (
	<CheckableInteractive inputType="switch" {...props} />
);

/**
 * This is a TypeScript React component for a checkbox with customizable props such as label, size, and
 * onChange function.
 * @param {CheckableInteractiveProps} props - The `props` parameter is an object that contains the following
 * properties:
 * @returns A React functional component named `Checkbox` is being returned.
 *
 * @example
 * import { Checkbox } from '@audiomack/am-labs';
 *
 * <Checkbox
 *   name="checkbox"
 *   isDisabled={false}
 *   size="lg"
 *   onChange={(e) => console.log(e)}
 *   checked={false}
 *   label="hello"
 * />
 */
export const Checkbox = (props: CheckableInteractiveProps) => (
	<CheckableInteractive inputType="checkbox" {...props} />
);

/**
 * This is a TypeScript React component for a checkbox with customizable props such as label, size, and
 * onChange function.
 * @param {CheckableInteractiveProps} props - The `props` parameter is an object that contains the following
 * properties:
 * @returns A React functional component named `Radio` is being returned.
 *
 * @example
 * import { Radio } from '@audiomack/am-labs';
 *
 * <Radio
 *   name="radio"
 *   isDisabled={false}
 *   size="lg"
 *   onChange={(e) => console.log(e)}
 *   checked={false}
 *   label="hello"
 * />
 */
export const Radio = (props: CheckableInteractiveProps) => (
	<CheckableInteractive inputType="radio" {...props} />
);
