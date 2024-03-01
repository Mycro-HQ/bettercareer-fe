/* -------------------------------------------------------------------------- */
/*                            External Dependencies                           */
/* -------------------------------------------------------------------------- */
import React from 'react';
import type { CSSProperties } from 'react';

import classNames from 'classnames';

import styles from './flex.module.scss';
import { forwardRefWrapper, useDynamicStyle, useStyles } from '@labs/utils';
import { useMediaQuery } from '@labs/components';

type MainAxisAlignment =
	| 'normal'
	| 'flex-start'
	| 'flex-end'
	| 'center'
	| 'left'
	| 'right'
	| 'baseline'
	| 'first baseline'
	| 'last baseline'
	| 'space-between'
	| 'space-around'
	| 'space-evenly'
	| 'stretch'
	| 'safe'
	| 'unsafe';

type CrossAxisAlignment =
	| 'normal'
	| 'flex-start'
	| 'flex-end'
	| 'self-start'
	| 'self-end'
	| 'center'
	| 'baseline'
	| 'first baseline'
	| 'last baseline'
	| 'stretch'
	| 'safe'
	| 'unsafe';

type FlexDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse';
type FlexWrap = 'nowrap' | 'wrap' | 'wrap-reverse';

interface IFlex {
	/**
	 * Defines the direction of the flex container
	 */
	justifyContent?: MainAxisAlignment;
	alignItems?: CrossAxisAlignment;
	alignSelf?: CrossAxisAlignment | 'auto';
	alignContent?: CrossAxisAlignment;
	flexWrap?: FlexWrap;

	/**
	 * Flexbox properties
	 */
	flex?: string;
	direction?: FlexDirection;
	grow?: number;
	shrink?: number;
	basis?: string;
	responsiveScroll?: boolean;
	scrollable?: boolean;
	fullWidth?: boolean;
	gap?: string | number;
	css?: CSSProperties;

	sm?: CSSProperties;
	md?: CSSProperties;
	lg?: CSSProperties;
	xl?: CSSProperties;
}

export interface IFlexProps
	extends React.HTMLAttributes<HTMLDivElement>,
		IFlex {}

interface IFlexRow extends React.HTMLAttributes<HTMLDivElement>, IFlex {
	noGutters?: boolean;
}

const FlexBase = forwardRefWrapper<HTMLDivElement, IFlexProps>(
	'FlexBase',
	({ children, responsiveScroll, scrollable = false, ...rest }, ref) => {
		const dynamicClassName = useDynamicStyle({
			gap: rest.gap,
			flexBasis: rest.basis,
			flex: rest.flex,
		});

		const _class = classNames([
			styles.Flex,
			scrollable && 'custom-scrollbar',
			scrollable && styles.FlexScroll,
			responsiveScroll && styles.FlexResponsiveScroll,
			rest.className,
			dynamicClassName,
		]);
		const isMediaQuery =
			(Object.keys(rest).some((key) => key.match(/sm|md|lg|xl/)) && rest.sm) ??
			rest.md ??
			rest.lg ??
			rest.xl ??
			false;
		const matchQuery = useMediaQuery(
			Object.keys(rest).find((key) => key.match(/sm|md|lg|xl/)) ?? 'sm',
			'greaterThan'
		);

		return (
			<div
				ref={ref}
				className={`${_class} ${buildProperties(rest)}`}
				style={{
					...rest.css,
					...(matchQuery && isMediaQuery),
				}}
			>
				{children}
			</div>
		);
	}
);

export const FlexColumn = forwardRefWrapper<HTMLDivElement, IFlexProps>(
	'FlexColumn',
	({ children, responsiveScroll, scrollable = false, ...rest }, ref) => {
		const dynamicClassName = useDynamicStyle({
			gap: rest.gap,
			flexBasis: rest.basis,
			flex: rest.flex,
		});

		const _class = classNames([
			styles.FlexColumn,
			scrollable && 'custom-scrollbar',
			scrollable && styles.FlexScroll,
			responsiveScroll && styles.FlexResponsiveScroll,
			rest.className,
			dynamicClassName,
		]);
		const isMediaQuery =
			(Object.keys(rest).some((key) => key.match(/sm|md|lg|xl/)) && rest.sm) ??
			rest.md ??
			rest.xl ??
			(rest.lg || false);
		const matchQuery = useMediaQuery(
			Object.keys(rest).find((key) => key.match(/sm|md|lg|xl/)) ?? 'sm',
			'greaterThan'
		);

		return (
			<div
				ref={ref}
				className={`${_class}  ${buildProperties(rest)}`}
				style={{
					...rest.css,
					...(matchQuery && isMediaQuery),
				}}
			>
				{children}
			</div>
		);
	}
);

export const FlexRow = forwardRefWrapper<HTMLDivElement, IFlexRow>(
	'FlexRow',
	(
		{ children, responsiveScroll, scrollable = false, noGutters, ...rest },
		ref
	) => {
		const _class = classNames([
			'flex-row',
			styles.FlexRow,
			scrollable && 'custom-scrollbar',
			scrollable && styles.FlexScroll,
			responsiveScroll && styles.FlexResponsiveScroll,
			rest.className,
		]);
		const _style = useStyles({
			marginRight: (noGutters && 0) || undefined,
			marginLeft: (noGutters && 0) || undefined,
		});

		return (
			<div
				ref={ref}
				className={`${_class} ${buildProperties(rest)}`}
				style={_style}
			>
				{children}
			</div>
		);
	}
);

const buildProperties = (props: IFlex) => {
	const alignSelfMapping = {
		auto: 'self-auto',
		'flex-start': 'self-start',
		'flex-end': 'self-end',
		center: 'self-center',
		baseline: 'self-baseline',
		stretch: 'self-stretch',
	};

	// Mapping for alignContent
	const alignContentMapping = {
		'flex-start': 'content-start',
		'flex-end': 'content-end',
		center: 'content-center',
		'space-between': 'content-between',
		'space-around': 'content-around',
		'space-evenly': 'content-evenly',
		stretch: 'content-stretch',
	};

	// Mapping for flexWrap
	const flexWrapMapping = {
		nowrap: 'flex-nowrap',
		wrap: 'flex-wrap',
		'wrap-reverse': 'flex-wrap-reverse',
	};

	// Mapping for flexDirection
	const flexDirectionMapping = {
		row: 'flex-row',
		'row-reverse': 'flex-row-reverse',
		column: 'flex-col',
		'column-reverse': 'flex-col-reverse',
	};

	const justifyContentMapping = {
		'flex-start': 'justify-start',
		'flex-end': 'justify-end',
		center: 'justify-center',
		'space-between': 'justify-between',
		'space-around': 'justify-around',
		'space-evenly': 'justify-evenly',
	};

	const alignItemsMapping = {
		'flex-start': 'items-start',
		'flex-end': 'items-end',
		center: 'items-center',
		baseline: 'items-baseline',
		stretch: 'items-stretch',
	};

	const justifyContentClass =
		justifyContentMapping[
			props.justifyContent as keyof typeof justifyContentMapping
		];
	const alignItemsClass =
		alignItemsMapping[props.alignItems as keyof typeof alignItemsMapping];

	const alignSelfClass =
		alignSelfMapping[props.alignSelf as keyof typeof alignSelfMapping];
	const alignContentClass =
		alignContentMapping[props.alignContent as keyof typeof alignContentMapping];
	const flexWrapClass =
		flexWrapMapping[props.flexWrap as keyof typeof flexWrapMapping];
	const flexDirectionClass =
		flexDirectionMapping[props.direction as keyof typeof flexDirectionMapping];

	const flexGrowClass =
		props.grow !== undefined ? `flex-grow-${props.grow}` : '';
	const flexShrinkClass =
		props.shrink !== undefined ? `flex-shrink-${props.shrink}` : '';

	const classNames = [
		justifyContentClass,
		alignItemsClass,
		alignSelfClass,
		alignContentClass,
		flexWrapClass,
		flexDirectionClass,
		flexGrowClass,
		flexShrinkClass,
	]
		.filter(Boolean)
		.join(' ');

	return classNames;
};

/**
 * Flex is a component that is used to create a flex container.
 * @type {forwardRefWrapperExoticComponent<IFlexProps & React.RefAttributes<HTMLDivElement>>}
 * @interface IFlexProps
 *
 *
 * @example
 * <Flex></Flex>
 */
export const Flex = Object.assign(FlexBase, {
	Row: FlexRow,
	Column: FlexColumn,
});
