import React, { useMemo } from 'react';
import { StyleSheet, Text } from '@react-pdf/renderer';

const DocText = ({
	children,
	color,
	size,
	style,
	weight,
	theme,
}: {
	children: string | number | React.ReactNode;
	color?: string;
	size?: 'xs' | 'sm' | 'md' | 'lg';
	style?: any;
	theme?: any;
	weight?: number | string;
}) => {
	const sizeMap = {
		xs: 10,
		sm: 12,
		md: 14,
		lg: 16,
	} as const;

	const fontSize = sizeMap[size as keyof typeof sizeMap] || sizeMap.md;

	const styles = useMemo(
		() =>
			StyleSheet.create({
				text: {
					fontWeight: (weight as any) || 400,
					fontFamily: theme?.font?.body || undefined,
					fontSize: fontSize / (theme?.font.scale || 1),
					color: color || '#273643',
					lineHeight: 1.5,
				},
			}),
		[]
	);

	return (
		<Text
			style={{
				...styles.text,
				...style,
			}}
		>
			{children}
		</Text>
	);
};

export default DocText;
