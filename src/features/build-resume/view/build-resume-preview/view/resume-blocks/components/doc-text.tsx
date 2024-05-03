import React, { useMemo } from 'react';
import { StyleSheet, Text } from '@react-pdf/renderer';

const DocText = ({
	children,
	color,
	size,
	as,
	style,
	weight,
	theme,
	scale,
	...rest
}: {
	children: string | number | React.ReactNode;
	color?: string;
	size?: 'xs' | 'sm' | 'md' | 'lg';
	as?: 'heading' | 'subheading' | 'title';
	style?: any;
	theme?: any;
	scale?: number;
	weight?: number | string;
} & React.CSSProperties) => {
	const sizeMap = {
		xs: 10,
		sm: 12,
		md: 14,
		lg: 16,
	} as const;

	const asMap = {
		subheading: {
			fontSize: 12 / (scale || 1),
			fontWeight: 'normal',
		},
		heading: {
			fontSize: 24 / (scale || 1),
			fontWeight: 'heavy',
			letterSpacing: -0.4,
		},
		title: {
			fontWeight: 'bold',
			marginBottom: 6,
			paddingBottom: 1,
			borderBottom: '1px solid #c0c0c0',
		},
	} as const;

	const fontSize = sizeMap[size as keyof typeof sizeMap] || sizeMap.sm;
	const fontFamily = theme?.font?.body || undefined;

	const styles = useMemo(
		() =>
			StyleSheet.create({
				text: {
					fontFamily: fontFamily,
					fontSize: fontSize / (scale || 1),
					lineHeight: 1.5,
					letterSpacing: -0.12,
					fontWeight: (weight as any) || 400,
					...(color && { color }),
				},
			}),
		[fontSize, color, weight, theme, scale, fontFamily]
	);

	return (
		<Text
			style={{
				...styles.text,
				...(asMap[as!] || {}),
				...rest,
				...style,
			}}
		>
			{children}
		</Text>
	);
};

export default DocText;
