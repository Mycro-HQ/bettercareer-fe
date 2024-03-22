import React from 'react';
import classNames from 'classnames';

import { forwardRefWrapper, useDynamicStyle } from '@labs/utils/index';

import styles from './input.module.scss';

type InputElements = 'input' | 'textarea';

// interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
// 	/**
// 	 * The CSS `text-align` property
// 	 * @default 'left'
// 	 */
// 	align?: 'left' | 'center' | 'right' | 'justify';
// 	/**
// 	 * The CSS `lineHeight` property
// 	 * @default ''
// 	 */
// 	lineHeight?: string;
// 	/**
// 	 * The CSS `text-transform` property
// 	 * @default 'none'
// 	 */
// 	casing?: 'uppercase' | 'lowercase' | 'capitalize' | 'none';
// 	/**
// 	 * Text Color
// 	 */
// 	color?: string;
// 	/**
// 	 * Decided if we want this component to inherit its font
// 	 */
// 	inheritFont?: boolean;
// 	/**
// 	 *  The font size of the input.
// 	 */
// 	fontSize?: string;
// 	/**
// 	 * size of the input
// 	 */
// 	size?: 'xs' | 'sm' | 'md';
// 	/**
// 	 * animate the input
// 	 */
// 	animate?: 'fade' | 'slide' | 'none';
// }
interface InputProps
	extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
	/**
	 * The CSS `text-align` property
	 * @default 'left'
	 */
	align?: 'left' | 'center' | 'right' | 'justify';
	/**
	 * The CSS `lineHeight` property
	 * @default ''
	 */
	lineHeight?: string;
	/**
	 * The CSS `text-transform` property
	 * @default 'none'
	 */
	casing?: 'uppercase' | 'lowercase' | 'capitalize' | 'none';
	/**
	 * Text Color
	 */
	color?: string;
	/**
	 * Decided if we want this component to inherit its font
	 */
	inheritFont?: boolean;
	/**
	 *  The font size of the input.
	 */
	fontSize?: string;
	/**
	 * size of the input
	 */
	size?: number | undefined; // Change type to number | undefined
	/**
	 * animate the input
	 */
	animate?: 'fade' | 'slide' | 'none';

	label?: {
		text: string;
		align?: 'top' | 'bottom' | 'left' | 'right';
	};

	containerClassName?: string;
}
const InputBase = forwardRefWrapper<HTMLInputElement, InputProps>(
	'Input',
	{
		// Remove 'as' from default props
	},

	(
		{
			casing,
			color,
			inheritFont,
			fontSize,
			lineHeight,
			align,
			children,
			animate = 'none',
			label,
			...rest
		},
		ref
	) => {
		const labelAlign = label?.align ? label.align : 'top';
		const dynamicClass = useDynamicStyle({
			fontSize,
			textTransform: casing,
			textAlign: align,
			color,
			lineHeight,
		});

		const _class = classNames([
			styles.Input,
			inheritFont && styles.adapt,
			animate && styles[`animate--${animate}`],
			rest.className,
			dynamicClass,
		]);

		const _containerClass = classNames([
			labelAlign === 'top' && styles.top,
			labelAlign === 'bottom' && styles.bottom,
			labelAlign === 'right' && styles.right,
			labelAlign === 'left' && styles.left,
			styles.InputContainer,
			rest.containerClassName,
		]);

		return (
			<div className={_containerClass}>
				{label && label.align && <label>{label.text}</label>}
				<input ref={ref} className={_class} {...rest} />
			</div>
		);
	}
);
/**
 * Input component
 * @type {React.ForwardRefExoticComponent<InputProps & React.RefAttributes<HTMLInputElement>>}
 * @interface InputProps
 *
 * @param {InputProps} props
 *
 * @example
 * <Input
 *   type="text"
 *   placeholder="Enter your text"
 *   casing="uppercase"
 *   size="md"
 *   animate="fade"
 * />
 */
export const Input = Object.assign(InputBase, {
	input: ({ as, ...props }: InputProps & { as?: never }) => (
		<InputBase {...props} />
	),
	textarea: ({ as, ...props }: InputProps & { as?: never }) => (
		<InputBase {...props} />
	),
});
