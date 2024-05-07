import React, { Fragment, useMemo } from 'react';
import { Document, Link, Page, StyleSheet } from '@react-pdf/renderer';

import DocText from '../components/doc-text';
import {
	extractNameFromLink,
	generateDataByKey,
	getData,
	getHref,
} from '../utils';
import { DocFlex } from '../components/doc-flex';

import { isEmpty, parseValue } from '@labs/utils';

import { Dune } from './dune';
import { Classic } from './classic';
import { COLOR_MAPS, MARGIN_MAP, SCALE_MAP } from './utils';

const renderElements = {
	summary: Dune.Summary,
	experiences: Dune.Experience,
	educations: Classic.Education,
	certifications: Classic.Certification,
	skills: Classic.Skills,
	projects: Dune.Projects,
	custom: Dune.CustomSection,
};

const config = {
	title: 'Nairobi',
	details: 'The calm and wild side of resumes.',
	thumbnail: '/images/dashboard/resumes/yaba.png',
	fontFamily: 'Playfair',
	colors: {
		primary: '#E1574D',
	},
	complimentaryColors: COLOR_MAPS.primary,
};

const NairobiTemplate = ({
	template,
	modules,
}: {
	modules: any;
	template: any;
}) => {
	const primaryColor = template.colors.primary;
	const margin =
		MARGIN_MAP[template.margin as keyof typeof MARGIN_MAP] || MARGIN_MAP.md;
	const scale =
		SCALE_MAP[template.fontSize as keyof typeof SCALE_MAP] || SCALE_MAP.md;
	const styles = useMemo(
		() =>
			StyleSheet.create({
				container: {
					flexDirection: 'column',
					color: '#0F1F2E',
					fontFamily: template.fontFamily,
				},
				link: {
					color: '#0F1F2E',
					textDecoration: 'underline',
				},
			}),
		[template.fontFamily]
	);

	const heading = getData('heading', modules);

	return (
		<Document>
			<Page size="A4" style={styles.container}>
				{heading?.name ? (
					<DocFlex
						direction="column"
						gap={4}
						alignItems="center"
						textAlign="center"
						margin={margin}
						style={{
							borderBottom: '2px dotted #d8d8d8',
							paddingBottom: margin,
						}}
						marginBottom={margin / 4}
					>
						<DocText scale={scale} as="heading">
							{heading?.name}
						</DocText>
						{heading?.title ? (
							<DocText scale={scale} weight={800} as="subHeading">
								{heading?.title}
							</DocText>
						) : null}
						<DocText scale={scale} size="xs">
							{heading?.subHeading?.length
								? heading?.subHeading?.map((subHeading: any, index: number) => (
										<Fragment key={parseValue(subHeading)}>
											{index > 0 && index < heading?.subHeading?.length
												? ' | '
												: ''}
											<Link
												href={getHref(parseValue(subHeading))}
												style={styles.link}
											>
												{extractNameFromLink(parseValue(subHeading))}
											</Link>
										</Fragment>
									))
								: null}
						</DocText>
					</DocFlex>
				) : null}

				<DocFlex
					direction="row"
					padding={margin}
					gap={margin}
					justifyContent="space-between"
				>
					<DocFlex
						direction="column"
						gap={Math.max(margin - 14, 12)}
						maxWidth={150}
						width="100%"
					>
						{generateDataByKey(
							['certifications', 'skills', 'educations'],
							modules
						).map((module: any) => {
							const Component =
								renderElements[module.key as keyof typeof renderElements];

							if (isEmpty(module.data)) return null;
							return (
								<Component
									key={module.key}
									data={module.data}
									variant="side"
									styles={{
										...styles,
										title: {
											color: primaryColor,
											textTransform: 'uppercase',
											fontSize: 10 / scale,
											border: 0,
										},
										scale,
									}}
								/>
							);
						})}
					</DocFlex>
					<DocFlex direction="column" gap={Math.max(margin - 14, 12)} flex={1}>
						{generateDataByKey(
							['summary', 'experiences', 'projects'],
							modules
						).map((module: any) => {
							const Component =
								renderElements[module.key as keyof typeof renderElements] ||
								renderElements.custom;

							if (isEmpty(module.data)) return null;
							return (
								<Component
									key={module.key}
									data={module.data}
									styles={{
										...styles,
										title: {
											color: primaryColor,
											textTransform: 'uppercase',
											fontSize: 10 / scale,
											border: 0,
										},
										scale,
									}}
								/>
							);
						})}
					</DocFlex>
				</DocFlex>
			</Page>
		</Document>
	);
};

export const Nairobi = Object.assign(NairobiTemplate, {
	config,
});
