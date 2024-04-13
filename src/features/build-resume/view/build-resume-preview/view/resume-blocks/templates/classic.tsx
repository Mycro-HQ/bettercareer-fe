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
import { MARGIN_MAP, SCALE_MAP } from './utils';

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
	title: 'Classic',
	details: '1995 called, they want their resume back.',
	thumbnail: '/images/dashboard/resumes/classic.png',
	fontFamily: 'Lato Body',
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
								<DocText scale={scale} as="subheading">
									, {heading?.title}
								</DocText>
							) : null}
						</DocText>
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
					<DocFlex direction="column" gap={8}>
						{data.map(
							(skill: { name: string; value: string[]; $id: string }) => (
								<DocText scale={styles?.scale} key={skill?.$id}>
									{isSide ? null : <>• </>}
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

function Summary({ data, styles }: Partial<ModuleData>) {
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

function CustomSection({ data, styles }: Partial<ModuleData>) {
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

function Projects({ data, styles }: ModuleData) {
	return (
		<>
			{data?.length ? (
				<DocFlex direction="column">
					<DocText scale={styles?.scale} as="title" {...styles?.title}>
						Projects
					</DocText>
					<DocFlex direction="column" gap={8}>
						{data.map((exp: any) => {
							const { title: _title, name, from, to, url } = exp || {};
							const title = `${name}${fixText(_title, {
								prefix: ', ',
							})}`;

							const _date = from
								? `${format(new Date(from), 'MMM yyyy')} - ${to ? format(new Date(to), 'MMM yyyy') : 'Present'}`
								: '';

							return (
								<DocFlex gap={4} direction="column" key={exp?.$id}>
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
								<DocFlex gap={4} direction="column" key={exp?.$id}>
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
											text={exp.description?.value}
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
						{data.map((exp: any) => {
							const { degree, study, institution, grade, from, to } = exp || {};
							const title = `${degree}${fixText(study, {
								prefix: ' in ',
							})}`;
							const _date = from
								? `${format(new Date(from), 'MMM yyyy')} - ${to ? format(new Date(to), 'MMM yyyy') : 'Present'}`
								: '';

							return (
								<DocFlex gap={4} direction="column" key={exp?.$id}>
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
								<DocFlex gap={8} direction="column" key={exp?.$id}>
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
