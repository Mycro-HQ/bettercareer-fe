import React, { Fragment, useMemo } from 'react';
import { Document, Link, Page, StyleSheet } from '@react-pdf/renderer';
import { format } from 'date-fns';

import { RichOutput } from '../components/rich-output';
import DocText from '../components/doc-text';
import {
	extractNameFromLink,
	generateDataByKey,
	getData,
	getHref,
} from '../utils';
import { DocFlex } from '../components/doc-flex';

import { fixText, isEmpty } from '@labs/utils';

import { ModuleData } from './types';
import { COLOR_MAPS, MARGIN_MAP, SCALE_MAP } from './utils';

const renderElements = {
	summary: Summary,
	experience: Experience,
	education: Education,
	certifications: Certification,
	skills: Skills,
	projects: Projects,
	custom: CustomSection,
};

const config = {
	title: 'Dune',
	name: 'dune',
	details: 'Crafted from the sands of Arrakis.',
	thumbnail: '/images/dashboard/resumes/dune.png',
	fontFamily: 'MerriWeather',
	colors: {
		primary: '#FFD37D',
	},
	complimentaryColors: COLOR_MAPS.secondary,
};

const DuneTemplate = ({
	template,
	modules,
}: {
	modules: any;
	template: any;
}) => {
	const padding =
		MARGIN_MAP[template.margin as keyof typeof MARGIN_MAP] || MARGIN_MAP.md;
	const scale =
		SCALE_MAP[template.fontSize as keyof typeof SCALE_MAP] || SCALE_MAP.md;

	const styles = useMemo(
		() =>
			StyleSheet.create({
				container: {
					flexDirection: 'column',
					padding: padding,
					fontFamily: template.fontFamily,
					gap: Math.max(padding - 14, 12),
					borderTop: `4px solid ${template.colors.primary}`,
					color: '#121210',
					backgroundColor: template.colors.primary + '06',
				},
				link: {
					color: '#121210',
					textDecoration: 'underline',
				},
			}),
		[template.fontFamily, template.colors.primary, padding]
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
					>
						<DocText scale={scale} as="heading">
							{heading?.name}
						</DocText>
						{heading?.title ? (
							<DocText scale={scale} as="subheading">
								{heading?.title}
							</DocText>
						) : null}
						<DocText scale={scale} size="xs">
							{heading?.subheading?.length
								? heading?.subheading?.map((subheading: any, index: number) => (
										<Fragment key={subheading.value}>
											{index > 0 && index < heading?.subheading?.length
												? ' | '
												: ''}
											<Link
												href={getHref(subheading.value)}
												style={styles.link}
											>
												{extractNameFromLink(subheading.value)}
											</Link>
										</Fragment>
									))
								: null}
						</DocText>
					</DocFlex>
				) : null}

				{generateDataByKey(
					[
						'summary',
						'experience',
						'education',
						'certifications',
						'skills',
						'projects',
						'skills',
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
							styles={{ ...styles, scale }}
						/>
					);
				})}
			</Page>
		</Document>
	);
};

function Skills({ data, styles }: ModuleData) {
	return (
		<DocFlex direction="column">
			{data?.length ? (
				<>
					<DocText scale={styles?.scale} as="title" {...styles?.title}>
						Skills
					</DocText>
					<DocFlex direction="column" gap={8}>
						{data.map(
							(skill: { name: string; value: string[]; $id: string }) => (
								<DocText scale={styles?.scale} key={skill?.$id}>
									•{' '}
									{skill?.name ? (
										<DocText scale={styles?.scale} size="xs" weight="heavy">
											{skill.name}:{' '}
										</DocText>
									) : null}
									{skill?.value?.map((value: any, index: number) => (
										<DocText scale={styles?.scale} size="xs" key={index}>
											{fixText(value, {
												prefix: index > 0 && index < data.length ? ', ' : '',
											})}
										</DocText>
									))}
								</DocText>
							)
						)}
					</DocFlex>
				</>
			) : null}
		</DocFlex>
	);
}

function Projects({ data, styles }: ModuleData) {
	return (
		<>
			{data?.length ? (
				<DocFlex direction="column">
					<DocText scale={styles?.scale} as="title" {...styles?.title}>
						Projects
					</DocText>
					<DocFlex direction="column" gap={4}>
						{data.map((exp: any) => {
							const { title: _title, name, from, to, url } = exp || {};

							const _date = from
								? `${format(new Date(from), 'MMM yyyy')} - ${to ? format(new Date(to), 'MMM yyyy') : 'Present'}`
								: '';

							return (
								<DocFlex direction="column" gap={4} key={exp?.$id}>
									<DocFlex
										direction="row"
										alignItems="center"
										justifyContent="space-between"
										width="100%"
									>
										<DocText scale={styles?.scale} size="xs" weight="heavy">
											<Link
												style={styles.link}
												href={url ?? `https://www.google.com/search?q=${name}`}
											>
												{name}
											</Link>
											{fixText(_title, {
												prefix: ' | ',
											})}
										</DocText>
										<DocText
											scale={styles?.scale}
											size="xs"
											weight="normal"
											style={styles.rightAlign}
										>
											{_date}
										</DocText>
									</DocFlex>

									<RichOutput
										scale={styles?.scale}
										text={exp.description?.value}
									/>
								</DocFlex>
							);
						})}
					</DocFlex>
				</DocFlex>
			) : null}
		</>
	);
}

function Summary({ data, styles }: ModuleData) {
	return (
		<DocFlex direction="column">
			{data?.value ? (
				<>
					<DocText scale={styles?.scale} as="title" {...styles?.title}>
						Summary
					</DocText>
					<RichOutput scale={styles?.scale} text={data.value} />
				</>
			) : null}
		</DocFlex>
	);
}

function CustomSection({ data, styles }: ModuleData) {
	return (
		<DocFlex direction="column">
			{data?.title ? (
				<>
					<DocText scale={styles?.scale} as="title" {...styles?.title}>
						{data.title}
					</DocText>
					<RichOutput scale={styles?.scale} text={data?.value} />
				</>
			) : null}
		</DocFlex>
	);
}

function Experience({ data, styles }: ModuleData) {
	return (
		<>
			{data?.length ? (
				<DocFlex direction="column">
					<DocText scale={styles?.scale} as="title" {...styles?.title}>
						Work Experience
					</DocText>
					<DocFlex direction="column" gap={8}>
						{data.map((exp: any) => {
							const {
								title: _title,
								company,
								location,
								from,
								to,
								url,
							} = exp || {};
							const title = `${_title}${fixText(company, {
								prefix: ', ',
							})}`;
							const _date = from
								? `${format(new Date(from), 'MMM yyyy')} - ${to ? format(new Date(to), 'MMM yyyy') : 'Present'}`
								: '';

							return (
								<DocFlex direction="column" gap={4} key={exp?.$id}>
									<DocFlex
										direction="row"
										alignItems="center"
										justifyContent="space-between"
										width="100%"
									>
										<DocText scale={styles?.scale} size="xs" weight="heavy">
											<Link
												style={styles.link}
												href={
													url ?? `https://www.google.com/search?q=${company}`
												}
											>
												{title}
											</Link>
											{fixText(location, {
												prefix: ' | ',
											})}{' '}
										</DocText>
										<DocText
											scale={styles?.scale}
											size="xs"
											weight="normal"
											style={styles.rightAlign}
										>
											{_date}
										</DocText>
									</DocFlex>

									<RichOutput
										scale={styles?.scale}
										text={exp.description?.value}
									/>
								</DocFlex>
							);
						})}
					</DocFlex>
				</DocFlex>
			) : null}
		</>
	);
}
function Education({ data, styles }: ModuleData) {
	return (
		<>
			{data?.length ? (
				<DocFlex direction="column">
					<DocText scale={styles?.scale} as="title" {...styles?.title}>
						Education
					</DocText>
					<DocFlex direction="column" gap={8}>
						{data.map((exp: any) => {
							const { degree, study, institution, grade, from, to } = exp || {};
							const title = `${degree}${fixText(study, {
								prefix: ' in ',
							})}`;
							const _date = from
								? `${format(new Date(from), 'MMM yyyy')} - ${to ? format(new Date(to), 'MMM yyyy') : 'Present'}`
								: '';

							return (
								<DocFlex direction="column" gap={4} key={exp?.$id}>
									<DocFlex
										direction="row"
										alignItems="center"
										justifyContent="space-between"
										width="100%"
									>
										<DocText scale={styles?.scale} size="xs" weight="heavy">
											• {title},{' '}
											{institution ? (
												<Link
													style={styles.link}
													href={`https://www.google.com/search?q=${institution}`}
												>
													{institution}
												</Link>
											) : null}{' '}
											{fixText(grade, {
												prefix: ' | ',
											})}{' '}
										</DocText>
										<DocText
											scale={styles?.scale}
											size="xs"
											weight="normal"
											style={styles.rightAlign}
										>
											{_date}
										</DocText>
									</DocFlex>
								</DocFlex>
							);
						})}
					</DocFlex>
				</DocFlex>
			) : null}
		</>
	);
}

function Certification({ data, styles }: ModuleData) {
	return (
		<>
			{data?.length ? (
				<DocFlex direction="column">
					<DocText scale={styles?.scale} as="title" {...styles?.title}>
						Certificates
					</DocText>
					<DocFlex direction="column" gap={8}>
						{data.map((exp: any) => {
							const {
								name,
								organization,
								url,
								issued: from,
								expires: to,
							} = exp || {};

							const _date = from
								? `${format(new Date(from), 'MMM yyyy')} - ${to ? format(new Date(to), 'MMM yyyy') : 'Present'}`
								: '';

							return (
								<DocFlex direction="column" gap={4} key={exp?.$id}>
									<DocFlex
										direction="row"
										alignItems="center"
										justifyContent="space-between"
										width="100%"
									>
										<DocText scale={styles?.scale} size="xs" weight="heavy">
											•{' '}
											<Link
												style={styles.link}
												href={
													url ||
													`https://www.google.com/search?q=${organization}`
												}
											>
												{name}
											</Link>
											{fixText(organization, {
												prefix: ', ',
											})}{' '}
										</DocText>
										<DocText
											scale={styles?.scale}
											size="xs"
											weight="normal"
											style={styles.rightAlign}
										>
											{_date}
										</DocText>
									</DocFlex>
								</DocFlex>
							);
						})}
					</DocFlex>
				</DocFlex>
			) : null}
		</>
	);
}

export const Dune = Object.assign(DuneTemplate, {
	config,
	Summary,
	Experience,
	Education,
	Certification,
	Skills,
	Projects,
	CustomSection,
});
