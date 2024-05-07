import React, { Fragment, useMemo } from 'react';
import { Document, Link, Page, StyleSheet } from '@react-pdf/renderer';
import { format, isDate } from 'date-fns';

import { RichOutput } from '../components/rich-output';
import DocText from '../components/doc-text';
import {
	extractNameFromLink,
	generateDataByKey,
	getData,
	getHref,
} from '../utils';
import { DocFlex } from '../components/doc-flex';

import { fixText, isEmpty, parseValue } from '@labs/utils';

import { ModuleData } from './types';
import { MARGIN_MAP, SCALE_MAP, toDate } from './utils';

const renderElements = {
	summary: Summary,
	experiences: Experience,
	educations: Education,
	certifications: Certification,
	skills: Skills,
	projects: Projects,
	custom: CustomSection,
};

const config = {
	title: 'Classic',
	details: '1995 called, they want their resume back.',
	thumbnail: '/images/dashboard/resumes/classic.png',
	fontFamily: 'Lato',
	margin: 'md',
	colors: {
		primary: '#0F1F2E',
	},
	complimentaryColors: ['#000', '#0F1F2E', '#333333', '#545454'],
};

const ClassicTemplate = ({
	template,
	modules,
}: {
	template: any;
	modules: any;
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
					gap: Math.max(padding - 14, 12),
					color: template.colors.primary,
					fontFamily: template.fontFamily,
				},
				link: {
					color: template.colors.primary,
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
					<DocFlex direction="column" gap={4}>
						<DocText scale={scale} as="heading">
							{heading?.name}
							{heading?.title ? (
								<DocText scale={scale} as="subHeading">
									, {heading?.title}
								</DocText>
							) : null}
						</DocText>
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

				{generateDataByKey(
					[
						'summary',
						'experiences',
						'educations',
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
								scale,
							}}
						/>
					);
				})}
			</Page>
		</Document>
	);
};

function Skills({ data, styles, variant }: Partial<ModuleData>) {
	const isSide = variant === 'side';
	return (
		<DocFlex direction="column">
			{data?.length ? (
				<>
					<DocText scale={styles?.scale} as="title" {...styles?.title}>
						Skills
					</DocText>
					<DocFlex direction="row" gap={8} flexWrap="wrap">
						{data.map(
							(
								skill: { name: string; value: string[]; $id: string },
								index: number
							) => (
								<DocText scale={styles?.scale} key={`${skill?.$id}:${index}`}>
									{isSide ? null : <>• </>}
									{skill?.name ? (
										<DocText scale={styles?.scale} size="xs" weight="heavy">
											{fixText(skill.name, {
												suffix: parseValue(skill, true)?.length > 0 ? ': ' : '',
											})}
										</DocText>
									) : null}
									{parseValue(skill, true)?.map((value: any, index: number) => (
										<DocText
											scale={styles?.scale}
											size="xs"
											key={index}
											flex={
												parseValue(skill, true)?.length > 0 ? '1' : undefined
											}
										>
											{fixText(value, {
												prefix: index > 0 ? ', ' : '',
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

function Summary({ data, styles }: Partial<ModuleData>) {
	return (
		<DocFlex direction="column">
			{parseValue(data) ? (
				<>
					<DocText scale={styles?.scale} as="title" {...styles?.title}>
						Summary
					</DocText>
					<RichOutput scale={styles?.scale} text={parseValue(data)} />
				</>
			) : null}
		</DocFlex>
	);
}

function CustomSection({ data, styles }: Partial<ModuleData>) {
	return (
		<DocFlex direction="column">
			{data?.title ? (
				<>
					<DocText scale={styles?.scale} as="title" {...styles?.title}>
						{data.title}
					</DocText>
					<RichOutput scale={styles?.scale} text={parseValue(data)} />
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
					<DocFlex direction="column" gap={8}>
						{data.map((exp: any, index: number) => {
							const { title: _title, name, from, to, url } = exp || {};
							const title = `${name}${fixText(_title, {
								prefix: ', ',
							})}`;

							const _date = from
								? `${toDate(from)} - ${to ? toDate(to) : 'Present'}`
								: '';

							return (
								<DocFlex
									gap={4}
									direction="column"
									key={`${exp?.$id}:${index}`}
								>
									<DocText scale={styles?.scale} size="xs" weight="heavy">
										<Link
											style={styles.link}
											href={url ?? `https://www.google.com/search?q=${name}`}
										>
											{title}
										</Link>
										{fixText(_title, {
											prefix: ' | ',
										})}{' '}
										| {_date}
									</DocText>

									<RichOutput
										scale={styles?.scale}
										text={parseValue(exp.description)}
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

function Experience({ data, styles }: ModuleData) {
	return (
		<>
			{data?.length ? (
				<DocFlex direction="column">
					<DocText scale={styles?.scale} as="title" {...styles?.title}>
						Work Experience
					</DocText>
					<DocFlex direction="column" gap={8}>
						{data.map((exp: any, index: number) => {
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
								? `${toDate(from)} - ${to ? toDate(to) : 'Present'}`
								: '';

							return (
								<DocFlex
									gap={4}
									direction="column"
									key={`${exp?.$id}:${index}`}
								>
									<DocText scale={styles?.scale} size="xs" weight="heavy">
										<Link
											style={styles.link}
											href={url ?? `https://www.google.com/search?q=${company}`}
										>
											{title}
										</Link>
										{fixText(location, {
											prefix: ' | ',
										})}{' '}
										| {_date}
									</DocText>
									<DocFlex direction="column">
										<RichOutput
											scale={styles?.scale}
											text={parseValue(exp.description)}
										/>
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
function Education({ data, styles, variant }: ModuleData) {
	const isSide = variant === 'side';

	return (
		<>
			{data?.length ? (
				<DocFlex direction="column">
					<DocText scale={styles?.scale} as="title" {...styles?.title}>
						Education
					</DocText>
					<DocFlex direction="column" gap={8}>
						{data.map((exp: any, index: number) => {
							const { degree, study, institution, grade, from, to } = exp || {};
							const title = `${degree}${fixText(study, {
								prefix: (degree && ' in ') || '',
							})}`;
							const _date = from
								? `${toDate(from)} - ${to ? toDate(to) : 'Present'}`
								: '';

							return (
								<DocFlex
									gap={4}
									direction="column"
									key={`${exp?.$id}:${index}`}
								>
									<DocText
										scale={styles?.scale}
										size="xs"
										weight={isSide ? 'normal' : 'heavy'}
									>
										{isSide ? null : <>• </>}
										{title}
										{isSide ? '\n' : <>, </>}
										{institution ? (
											<Link
												style={{
													...styles.link,
													fontWeight: 'heavy',
												}}
												href={`https://www.google.com/search?q=${institution}`}
											>
												{institution}
											</Link>
										) : null}{' '}
										{fixText(grade, {
											prefix: ' | ',
										})}
										{isSide ? '\n' : ' | '}
										{_date}
									</DocText>
								</DocFlex>
							);
						})}
					</DocFlex>
				</DocFlex>
			) : null}
		</>
	);
}

function Certification({ data, styles, variant = 'full' }: ModuleData) {
	const isSide = variant === 'side';
	return (
		<>
			{data?.length ? (
				<DocFlex direction="column">
					<DocText scale={styles?.scale} as="title" {...styles?.title}>
						Certificates
					</DocText>
					<DocFlex direction="column" gap={8}>
						{data.map((exp: any, index: number) => {
							const {
								name,
								organization,
								url,
								issued: from,
								expires: to,
							} = exp || {};

							const _date = from
								? `${toDate(from)} - ${to ? toDate(to) : 'Present'}`
								: '';

							return (
								<DocFlex
									gap={8}
									direction="column"
									key={`${exp?.$id}:${index}`}
								>
									<DocText
										scale={styles?.scale}
										size="xs"
										weight={isSide ? 'normal' : 'heavy'}
									>
										{isSide ? null : <>• </>}
										<Link
											style={{
												...styles.link,
												fontWeight: 'heavy',
											}}
											href={
												url || `https://www.google.com/search?q=${organization}`
											}
										>
											{name}
										</Link>
										{fixText(organization, {
											prefix: isSide ? '\n' : ', ',
										})}{' '}
										{isSide ? '\n' : '| '}
										{_date}
									</DocText>
								</DocFlex>
							);
						})}
					</DocFlex>
				</DocFlex>
			) : null}
		</>
	);
}

export const Classic = Object.assign(ClassicTemplate, {
	config,
	Skills,
	Summary,
	CustomSection,
	Projects,
	Experience,
	Education,
	Certification,
});
