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
	title: 'Metropolitan',
	details: 'Dive into the city life!',
	thumbnail: '/images/dashboard/resumes/metropolitan.png',
	colors: {
		primary: '#0F1F2E',
		primary_text: '#ffffff',
		section: '#57636D',
	},
};

const MetropolitanTemplate = ({
	template,
	modules,
}: {
	modules: any;
	template: any;
}) => {
	const primaryColor = template.colors.primary;
	const styles = useMemo(
		() =>
			StyleSheet.create({
				container: {
					flexDirection: 'column',
					color: '#0F1F2E',
					fontFamily: 'Open Sans',
				},
				link: {
					color: 'inherit',
					textDecoration: 'underline',
				},
			}),
		[]
	);

	const heading = getData('heading', modules);

	return (
		<Document>
			<Page size="A4" style={styles.container}>
				{heading?.name ? (
					<DocFlex
						direction="row"
						justifyContent="space-between"
						backgroundColor={primaryColor}
						padding={24}
						color={template.colors.primary_text}
					>
						<DocFlex
							direction="column"
							gap={2}
							alignItems="flex-start"
							textAlign="left"
						>
							<DocText as="heading" marginBottom={0}>
								{heading?.name}
							</DocText>
							{heading?.title ? (
								<DocText as="subheading">{heading?.title}</DocText>
							) : null}
						</DocFlex>
						<DocText size="xs" textAlign="right">
							{heading?.subheading?.length
								? heading?.subheading?.map((subheading: any) => (
										<Fragment key={subheading.value}>
											<Link
												href={getHref(subheading.value)}
												style={{
													...styles.link,
													color: template.colors.primary_text,
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
					padding={24}
					gap={24}
					justifyContent="space-between"
				>
					<DocFlex direction="column" gap={12} flex={1}>
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
											color: template.colors.section || primaryColor,
											textTransform: 'uppercase',
											fontSize: 10,
											border: 0,
										},
									}}
								/>
							);
						})}
					</DocFlex>
					<DocFlex
						direction="column"
						gap={12}
						maxWidth={150}
						width="100%"
						height="100%"
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
											color: template.colors.section || primaryColor,
											textTransform: 'uppercase',
											fontSize: 10,
											border: 0,
										},
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

export const Metropolitan = Object.assign(MetropolitanTemplate, {
	config,
});
