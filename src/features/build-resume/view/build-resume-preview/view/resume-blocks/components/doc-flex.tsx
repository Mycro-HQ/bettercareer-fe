import { StyleSheet, View } from '@react-pdf/renderer';
import React, { useMemo } from 'react';

interface DocFlexProps {
	children: React.ReactNode;
	direction?: 'row' | 'column';
	wrap?: 'wrap' | 'nowrap';
	justifyContent?:
		| 'center'
		| 'space-between'
		| 'space-around'
		| 'flex-start'
		| 'flex-end';
	alignItems?: 'center' | 'flex-start' | 'flex-end';
	style?: any;
	gap?: number;
}
export const DocFlex = ({
	children,
	direction = 'row',
	wrap,
	justifyContent,
	alignItems,
	style,
	gap = 0,
	...props
}: DocFlexProps & Omit<React.CSSProperties, 'direction'>) => {
	const styles = useMemo(
		() =>
			StyleSheet.create({
				flex: {
					flexDirection: direction,
					flexWrap: wrap,
					justifyContent,
					alignItems,
					gap,
				},
			}),
		[direction, wrap, justifyContent, alignItems, gap]
	);

	return (
		<View
			style={{
				...styles.flex,
				...style,
				...props,
			}}
		>
			{children}
		</View>
	);
};
