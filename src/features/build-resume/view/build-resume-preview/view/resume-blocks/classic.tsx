import React, { Fragment, useMemo } from 'react';
import {
	Document,
	Link,
	Page,
	StyleSheet,
	Text,
	View,
} from '@react-pdf/renderer';
import { format } from 'date-fns';

import { fixText } from '@labs/utils';

import DocText from './components/text';
import { parseHtmlToReactPdf } from './components/rich-output';

const renderElements = {
	summary: Summary,
	experience: Experience,
	education: Education,
	certifications: Certification,
};

export const ClassicTemplate = ({ modules }: { modules: any }) => {
	const styles = useMemo(
		() =>
			StyleSheet.create({
				container: {
					flexDirection: 'column',
					padding: 20,
					color: '#0F1F2E',
					fontFamily: 'Lato Body',
				},
				subheading: {
					fontSize: 12,
					fontWeight: 'normal',
				},
				headingWrapper: {
					marginBottom: 20,
					flexDirection: 'column',
					gap: 5,
				},
				heading: {
					fontSize: 18,
					fontWeight: 'heavy',
					letterSpacing: -0.2,
				},
				section: {
					marginBottom: 20,
				},
				sub_section: {
					marginBottom: 10,
					flexDirection: 'column',
					gap: 4,
				},
				sectionTitle: {
					fontSize: 14,
					fontWeight: 'bold',
					marginBottom: 5,
					paddingBottom: 2,
					borderBottom: '1px solid #6F7982',
				},
				content: {
					fontSize: 10,
					lineHeight: 1.5,
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
	const getData = (key: string) => {
		return modules.find((module: any) => module.key === key)?.data;
	};

	const heading = getData('heading');
	const summary = getData('summary');

	const generateDataByKey = (key: string[]) => {
		return modules.filter((module: any) => key.includes(module.key));
	};

	return (
		<Document>
			<Page size="A4" style={styles.container}>
				<View style={styles.headingWrapper}>
					<DocText style={styles.heading}>
						{heading?.name}
						{heading?.title ? (
							<DocText style={styles.subheading}>, {heading?.title}</DocText>
						) : null}
					</DocText>
					<DocText size="xs">
						<Link href={`mailto:${heading.email}`} style={styles.link}>
							{heading.email}
						</Link>
					</DocText>
				</View>

				<Summary data={summary} styles={styles} />

				{generateDataByKey(['experience', 'education', 'certifications']).map(
					(module: any) => {
						const Component =
							renderElements[module.key as keyof typeof renderElements];
						return (
							<Component key={module.key} data={module.data} styles={styles} />
						);
					}
				)}
			</Page>
		</Document>
	);
};

function Summary({ data, styles }: { data: any; styles: any }) {
	const parsedContent = parseHtmlToReactPdf(data?.value);
	return (
		<View style={styles.section}>
			{data?.value ? (
				<>
					<Text style={styles.sectionTitle}>Summary</Text>
					<Text style={styles.content}>{parsedContent}</Text>
				</>
			) : null}
		</View>
	);
}

function Experience({ data, styles }: { data: any; styles: any }) {
	return (
		<>
			{data?.length ? (
				<View style={styles.section}>
					<DocText style={styles.sectionTitle}>Work Experience</DocText>
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
							<View style={styles.sub_section} key={exp?.$id}>
								<DocText size="xs" weight="heavy">
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
								<View style={styles.content}>
									{exp.description
										.split('\n')
										.map((detail: any, index: any) => (
											<Fragment key={detail + index}>
												<DocText style={styles.bulletPoint}>
													{detail ? `• ${detail}` : ''}
												</DocText>
											</Fragment>
										))}
								</View>
							</View>
						);
					})}
				</View>
			) : null}
		</>
	);
}
function Education({ data, styles }: { data: any; styles: any }) {
	return (
		<>
			{data?.length ? (
				<View style={styles.section}>
					<DocText style={styles.sectionTitle}>Education</DocText>
					{data.map((exp: any) => {
						const { degree, study, institution, grade, from, to } = exp || {};
						const title = `${degree}${fixText(study, {
							prefix: ' in',
						})}`;
						const _date = from
							? `${format(new Date(from), 'MMM yyyy')} - ${to ? format(new Date(to), 'MMM yyyy') : 'Present'}`
							: '';

						return (
							<View style={styles.sub_section} key={exp?.$id}>
								<DocText size="xs" weight="heavy" style={styles.bulletPoint}>
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
									| {_date}
								</DocText>
							</View>
						);
					})}
				</View>
			) : null}
		</>
	);
}

function Certification({ data, styles }: { data: any; styles: any }) {
	return (
		<>
			{data?.length ? (
				<View style={styles.section}>
					<DocText style={styles.sectionTitle}>Certificates</DocText>
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
							<View style={styles.sub_section} key={exp?.$id}>
								<DocText size="xs" weight="heavy" style={styles.bulletPoint}>
									•
									<Link
										style={styles.link}
										href={
											url || `https://www.google.com/search?q=${organization}`
										}
									>
										{name}
									</Link>
									{fixText(organization, {
										prefix: ', ',
									})}{' '}
									| {_date}
								</DocText>
							</View>
						);
					})}
				</View>
			) : null}
		</>
	);
}
