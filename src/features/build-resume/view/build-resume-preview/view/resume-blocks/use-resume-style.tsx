import { StyleSheet } from '@react-pdf/renderer';
import { useMemo } from 'react';

export const useResumeStyles = (data?: any) => {
	const styles = useMemo(
		() =>
			StyleSheet.create({
				container: {
					flexDirection: 'column',
					padding: 24,
					gap: 14,
					color: '#0F1F2E',
					fontFamily: 'Lato',
				},
				subheading: {
					fontSize: 12,
					fontWeight: 'normal',
				},
				headingWrapper: {
					flexDirection: 'column',
					gap: 4,
				},
				heading: {
					fontSize: 20,
					fontWeight: 'heavy',
					letterSpacing: -0.2,
				},
				section: {
					marginBottom: 0,
				},
				sub_section: {
					flexDirection: 'column',
					gap: 4,
				},
				sectionTitle: {
					fontSize: 14,
					fontWeight: 'bold',
					marginBottom: 4,
					paddingBottom: 2,
					borderBottom: '1px solid #B7B7B7',
				},
				content: {
					fontSize: 10,
					lineHeight: 1.5,
				},
				inline: {
					flexDirection: 'row',
					flexWrap: 'wrap',
				},
				link: {
					color: '#0F1F2E',
					textDecoration: 'underline',
				},
				bulletPoint: {
					fontSize: 10,
					marginBottom: 2,
				},
			}),
		[]
	);

	return styles;
};
