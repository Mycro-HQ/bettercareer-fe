/**
 * 📝 Notes for Contributors:
 *
 * @description
 *
 * - When creating an interactive component, we recommend consuming the
 * component hook created.
 * - Ensure the component is composable and can adapt to multiple use-cases
 *
 * Bootstrapped by Plop
 */

import classNames from 'classnames';
import React, { Fragment, CSSProperties } from 'react';

import { Text } from '../layout';
import type { TextProps } from '../layout';
import { motion } from 'framer-motion';

import styles from './spinner.module.scss';

export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
	/**
	 * Whether the spinner is supposed to loading
	 */
	isLoading?: boolean;
	/**
	 * Spinner color
	 */
	color?: string;
	/**
	 * Spinner thickness
	 */
	thickness?: string;
	/**
	 * Whether the spinner should be full page
	 */
	fullPage?: boolean | string;
	/**
	 * Spinner Text
	 */
	text?: string;
	/**
	 * Spinner Text Props
	 */
	textProps?: TextProps;
	/**
	 * SVG Size
	 */
	size?: number;
	/**
	 * center the spinner
	 */
	center?: boolean;
	/**
	 * Spinner type
	 */
	spinner?: 'logo' | 'default';
}

export function Spinner(props: SpinnerProps) {
	const {
		isLoading,
		color = '#1388f2',
		fullPage,
		center,
		text,
		textProps,
		...rest
	} = props;

	const canRenderDiv = fullPage ?? center ?? text;

	return (
		<span
			className={classNames([
				canRenderDiv && styles.Spinner,
				!!fullPage && styles.fullPage,
				center && styles.Center,
				rest.className,
			])}
		>
			<SpinnerSVG color={color} {...rest} />
			{text && (
				<Text {...textProps} size="sm" weight={500}>
					{text}
				</Text>
			)}
		</span>
	);
}

const SpinnerSVG = ({
	color = '#1388f2',
	thickness = '2',
	size = 32,
	...rest
}: SpinnerProps) => {
	function convertHex(hexCode: string, opacity = 1) {
		let hex = hexCode.replace('#', '');

		if (hex.length === 3 && hex[0]) {
			hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
		}

		const r = parseInt(hex.substring(0, 2), 16),
			g = parseInt(hex.substring(2, 4), 16),
			b = parseInt(hex.substring(4, 6), 16);

		/* Backward compatibility for whole number based opacity values. */
		if (opacity > 1 && opacity <= 100) {
			opacity = opacity / 100;
		}

		return 'rgba(' + r + ',' + g + ',' + b + ',' + opacity + ')';
	}

	if (rest.spinner === 'logo')
		return <LogoSVG color={color} size={size} {...rest} />;

	return (
		<span
			aria-atomic="true"
			aria-busy="true"
			className={styles.SpinnerCircle}
			style={
				{
					'--spinner-color': color,
					'--spinner-color-rgba': `${convertHex(color!, 0.25)}`,
					'--spinner-thickness': +thickness,
					'--spinner-size': `${size}px`,
				} as CSSProperties
			}
		/>
	);
};

const LogoSVG = ({ size, color }: SpinnerProps) => {
	return (
		<span className="relative overflow-hidden block">
			<motion.svg
				width={size || 108}
				height={size || 119}
				viewBox="0 0 29 28"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				aria-atomic="true"
				aria-busy="true"
				initial={{ y: 10, opacity: 0 }}
				animate={{ y: [50, 0], opacity: 1 }}
				transition={{
					type: 'spring',
					duration: 1.5,
					repeatType: 'reverse',
					bounce: 0.25,
					repeat: Infinity,
				}}
			>
				<motion.path
					strokeWidth="14"
					fillRule="evenodd"
					clipRule="evenodd"
					fill={`${color ?? 'url(#paint0_linear_348_316)'}`}
					d="M13.1754 2.04983C13.8918 1.30471 15.0841 1.30471 15.8006 2.04983C18.3733 4.72757 21.9436 6.2502 25.6714 6.2502C26.1876 6.2502 26.4537 5.633 26.0992 5.25774L25.2514 4.36004C22.6787 1.6823 19.1084 0.159668 15.3805 0.159668H14.9605H14.0154H13.5954C9.86756 0.159668 6.29725 1.6823 3.72452 4.36004L2.87669 5.25774C2.52227 5.633 2.78832 6.2502 3.30449 6.2502C7.03231 6.2502 10.6026 4.72757 13.1754 2.04983ZM16.1154 7.82536C15.225 6.90619 13.7506 6.90619 12.8601 7.82536C9.70984 11.1331 5.29946 13.0233 0.731558 13.0233C0.0931621 13.0233 -0.237782 12.2617 0.197807 11.795L1.2566 10.6606C4.45938 7.35281 8.81727 5.51515 13.3852 5.51515H13.9102H15.0653H15.5904C20.1583 5.51515 24.5686 7.35281 27.7189 10.6606L28.764 11.7555C29.2007 12.213 28.8764 12.9708 28.244 12.9708C23.6761 12.9708 19.2657 11.1331 16.1154 7.82536ZM16.1154 13.7959C15.225 12.8768 13.7506 12.8768 12.8601 13.7959C9.70984 17.1037 5.29946 18.9939 0.731558 18.9939C0.0931621 18.9939 -0.237782 18.2323 0.197807 17.7656L1.2566 16.6312C4.45938 13.3234 8.81727 11.4857 13.3852 11.4857H13.9102H15.0653H15.5904C20.1583 11.4857 24.5686 13.3234 27.7189 16.6312L28.764 17.7261C29.2007 18.1836 28.8764 18.9414 28.244 18.9414C23.6761 18.9414 19.2657 17.1037 16.1154 13.7959ZM21.8775 25.4811C21.805 26.7627 20.4016 27.3374 19.2055 26.8713L15.5764 25.4571C15.0151 25.2384 14.3919 25.2399 13.8316 25.4612L10.2096 26.8924C9.01613 27.3641 7.61027 26.7966 7.5309 25.5157C7.50929 25.1671 7.51597 24.8163 7.55144 24.4663C7.66435 23.3521 8.06558 22.2815 8.71958 21.3493C9.37358 20.4171 10.2602 19.652 11.3008 19.1219C12.3414 18.5919 13.504 18.3131 14.6855 18.3103C15.867 18.3076 17.031 18.5809 18.0744 19.1062C19.1178 19.6314 20.0083 20.3923 20.6672 21.3214C21.326 22.2506 21.7328 23.3193 21.8515 24.433C21.8887 24.7824 21.8973 25.1328 21.8775 25.4811Z"
				/>
				<defs>
					<linearGradient
						id="paint0_linear_348_316"
						x1="20.1907"
						y1="0.159666"
						x2="12.8607"
						y2="25.998"
						gradientUnits="userSpaceOnUse"
					>
						<motion.stop stopColor="#339DFF" />
						<stop offset="1" stopColor="#2783D8" />
					</linearGradient>
				</defs>
			</motion.svg>
		</span>
	);
};
