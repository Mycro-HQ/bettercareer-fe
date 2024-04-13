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
import { MARGIN_MAP, SCALE_MAP } from './utils';

const renderElements = {
	summary: Dune.Summary,
	experience: Dune.Experience,
	education: Dune.Education,
	certifications: Dune.Certification,
	skills: Dune.Skills,
	projects: Dune.Projects,
	custom: Dune.CustomSection,
};

const config = {
	title: 'Dublin',
	details: 'Reminiscent of the Irish capital',
	thumbnail: '/images/dashboard/resumes/dublin.png',
	fontFamily: 'Playfair',
	colors: {
		primary: '#1d885b',
	},
	complimentaryColors: ['#c6342a', '#0F70C8', '#4D18B8', '#0F1F2E', '#1d885b'],
};

const DublinTemplate = ({
	template,
	modules,
}: {
	modules: any;
	template: any;
}) => {
	const primaryColor = template.colors.primary;
	const padding =
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
					color: 'inherit',
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
						alignItems="flex-end"
						backgroundColor={primaryColor + '12'}
						border={`0.5px solid #efefef`}
						padding={padding}
						margin={8}
						marginBottom={0}
						borderRadius={10}
						color={primaryColor}
					>
						<DocFlex
							direction="column"
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
													color: primaryColor,
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
					direction="column"
					padding={padding}
					gap={Math.max(padding - 14, 12)}
				>
					{generateDataByKey(
						[
							'summary',
							'experience',
							'education',
							'certifications',
							'skills',
							'projects',
						],
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
										color: template.colors.section || primaryColor,
										textTransform: 'uppercase',
										border: 0,
									},
									scale,
								}}
							/>
						);
					})}
				</DocFlex>
			</Page>
		</Document>
	);
};

export const Dublin = Object.assign(DublinTemplate, {
	config,
});
