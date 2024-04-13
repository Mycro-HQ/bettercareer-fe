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

import { isEmpty } from '@labs/utils';

import { Dune } from './dune';
import { Classic } from './classic';
import { COLOR_MAPS, MARGIN_MAP, SCALE_MAP } from './utils';

const renderElements = {
	summary: Dune.Summary,
	experience: Dune.Experience,
	education: Classic.Education,
	certifications: Classic.Certification,
	skills: Classic.Skills,
	projects: Dune.Projects,
	custom: Dune.CustomSection,
};

const config = {
	title: 'Cosmos',
	details: 'Reach for the stars!',
	thumbnail: '/images/dashboard/resumes/cosmos.png',
	fontFamily: 'Playfair',
	colors: {
		primary: '#0F70C8',
	},
	complimentaryColors: COLOR_MAPS.primary,
};

const CosmosTemplate = ({
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
						direction="row"
						justifyContent="space-between"
						padding={margin}
						paddingBottom={0}
					>
						<DocFlex
							direction="column"
							gap={2}
							alignItems="flex-start"
							textAlign="left"
						>
							<DocText scale={scale} as="heading" marginBottom={0}>
								{heading?.name}
							</DocText>
							{heading?.title ? (
								<DocText scale={scale} as="subheading">
									{heading?.title}
								</DocText>
							) : null}
						</DocFlex>
						<DocText scale={scale} size="xs" textAlign="right">
							{heading?.subheading?.length
								? heading?.subheading?.map((subheading: any) => (
										<Fragment key={subheading.value}>
											<Link
												href={getHref(subheading.value)}
												style={{
													...styles.link,
												}}
											>
												{extractNameFromLink(subheading.value)} {'\n'}
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
							['certifications', 'skills', 'education'],
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
							['summary', 'experience', 'projects'],
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

export const Cosmos = Object.assign(CosmosTemplate, {
	config,
});
