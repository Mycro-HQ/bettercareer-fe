import React, { useMemo } from 'react';
import { StyleSheet, Text } from '@react-pdf/renderer';

const asMap = {
	subheading: {
		fontSize: 12,
		fontWeight: 'normal',
	},
	heading: {
		fontSize: 24,
		fontWeight: 'heavy',
		letterSpacing: -0.4,
	},
	title: {
		fontWeight: 'bold',
		marginBottom: 4,
		paddingBottom: 2,
		borderBottom: '1px solid #c0c0c0',
	},
} as const;

const DocText = ({
	children,
	color,
	size,
	as,
	style,
	weight,
	theme,
	...rest
}: {
	children: string | number | React.ReactNode;
	color?: string;
	size?: 'xs' | 'sm' | 'md' | 'lg';
	as?: 'heading' | 'subheading' | 'title';
	style?: any;
	theme?: any;
	weight?: number | string;
} & React.CSSProperties) => {
	const sizeMap = {
		xs: 10,
		sm: 12,
		md: 14,
		lg: 16,
	} as const;

	const fontSize = sizeMap[size as keyof typeof sizeMap] || sizeMap.sm;

	const styles = useMemo(
		() =>
			StyleSheet.create({
				text: {
					fontFamily: theme?.font?.body || undefined,
					fontSize: fontSize / (theme?.font.scale || 1),
					lineHeight: 1.5,
					fontWeight: (weight as any) || 400,
					...(color && { color }),
				},
			}),
		[fontSize, color, weight, theme]
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
