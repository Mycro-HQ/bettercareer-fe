import React from 'react';
import classNames from 'classnames';

import { TypographyProps as TypeProps } from '../heading';

import { forwardRefWrapper, useDynamicStyle } from '../../../utils';

import styles from './text.module.scss';

type TextElements = 'p' | 'b' | 'i' | 'u' | 's' | 'span';

interface TypographyProps extends Omit<TypeProps, 'as'> {
	/**
	 * The CSS `text-transform` property
	 * @default 'none'
	 */
	casing?: 'uppercase' | 'lowercase' | 'capitalize' | 'none';
	/**
	 * The CSS `text-align` property
	 * @default 'left'
	 */
	align?: 'left' | 'center' | 'right' | 'justify';
	/**
	 * The CSS `text-decoration` property
	 * @default 'none'
	 */
	decoration?: 'underline' | 'line-through' | 'none';
	/**
	 * The CSS `lineHeight` property
	 * @default ''
	 */
	lineHeight?: string;
	/**
	 * The CSS `text-decoration` property
	 * @default 'p'
	 */
	as?: TextElements;
	/**
	 * Text Color
	 */
	color?: string;
	/**
	 * Decided if we want this component to inherit its font
	 */
	inheritFont?: boolean;
	/**
	 *  The font size of the text.
	 */
	fontSize?: string;
}

export interface TextProps
	extends Omit<TypographyProps, 'as'>,
		TypographyProps {}

const TextBase = forwardRefWrapper<HTMLParagraphElement, TypographyProps>(
	'Text',
	{
		as: 'p',
	},

	(
		{
			as: Element = 'p',
			casing,
			color,
			inheritFont,
			fontSize,
			lineHeight,
			align,
			decoration,
			children,
			noOfLines,
			weight,
			...rest
		},
		ref
	) => {
		const dynamicClass = useDynamicStyle({
			fontSize,
			textTransform: casing,
			textAlign: align,
			color,
			lineHeight,
			textDecoration: decoration,
		});

		const _class = classNames([
			styles.Text,
			weight && styles[`weight-${weight}`],
			noOfLines && styles[`noOfLines-${noOfLines}`],
			inheritFont && styles.adapt,
			rest.className,
			dynamicClass,
		]);

		return (
			<Element ref={ref} className={_class}>
				{children}
			</Element>
		);
	}
);

/**
 * Text component
 * @type {React.ForwardRefExoticComponent<TypographyProps & React.RefAttributes<HTMLElement>>}
 * @interface TypographyProps
 *
 * @param {TextProps} props
 *
 * @example
 * <Text as="p" weight="bold" fontSize="1.5rem" casing="uppercase">
 *  Hello World
 * </Text>
 *
 * <Text.p weight="bold" casing="uppercase">
 * Hello World
 * </Text.p>
 */

export const Text = Object.assign(TextBase, {
	p: (props: TypographyProps) => <TextBase as="p" {...props} />,
	b: (props: TypographyProps) => <TextBase as="b" {...props} />,
	i: (props: TypographyProps) => <TextBase as="i" {...props} />,
	u: (props: TypographyProps) => <TextBase as="u" {...props} />,
	s: (props: TypographyProps) => <TextBase as="s" {...props} />,
	span: (props: TypographyProps) => <TextBase as="span" {...props} />,
});
