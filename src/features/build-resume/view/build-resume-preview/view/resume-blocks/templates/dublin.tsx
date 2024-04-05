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
	colors: {
		primary: '#1C885B',
		primary_text: '#fff',
	},
};

const DublinTemplate = ({
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
					fontFamily: 'Playfair',
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

				<DocFlex direction="column" padding={24} gap={12}>
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
