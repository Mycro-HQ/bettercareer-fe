import React from 'react';
import { Link, StyleSheet, Text } from '@react-pdf/renderer';

const styles = StyleSheet.create({
	paragraph: {
		marginBottom: 4,
	},
	bold: {
		fontWeight: 'heavy',
	},
	italic: {
		textTransform: 'uppercase',
	},
	underline: {
		textDecoration: 'underline',
	},
	lineThrough: {
		textDecoration: 'line-through',
	},
	link: {
		textDecoration: 'underline',
	},
});

export const parseHtmlToReactPdf = (htmlContent: string) => {
	if (!htmlContent || typeof window === 'undefined') return null;

	const parser = new DOMParser();
	const doc = parser.parseFromString(htmlContent, 'text/html');

	const walkNodes = (nodes: any) => {
		return Array.from(nodes).map((node: any) => {
			if (node.nodeType === Node.TEXT_NODE) {
				return <Text key={node.nodeValue}>{node.nodeValue}</Text>;
			}

			if (node.nodeType === Node.ELEMENT_NODE) {
				const { nodeName, childNodes } = node;

				let style = {};
				if (nodeName === 'B' || nodeName === 'STRONG') {
					style = styles.bold;
				} else if (nodeName === 'I' || nodeName === 'EM') {
					style = styles.italic;
				} else if (nodeName === 'U') {
					style = styles.underline;
				} else if (nodeName === 'S' || nodeName === 'STRIKE') {
					style = styles.lineThrough;
				}

				if (nodeName === 'P') {
					return (
						<Text style={[styles.paragraph, style]} key={node.innerText}>
							{walkNodes(childNodes)}
						</Text>
					);
				}

				if (nodeName === 'BR') {
					return <Text key={node.innerText}>{'\n'}</Text>;
				}

				if (nodeName === 'A') {
					return (
						<Link
							style={[style, styles.link]}
							href={node.getAttribute('href')}
							key={node.innerText}
						>
							{walkNodes(childNodes)}
						</Link>
					);
				}

				if (['LI'].includes(nodeName)) {
					return (
						<Text key={node.innerText} style={[style]}>
							• {walkNodes(childNodes)}
							{'\n'}
						</Text>
					);
				}

				return (
					<Text style={style} key={node.innerText}>
						{walkNodes(childNodes)}
					</Text>
				);
			}
		});
	};

	return walkNodes(doc.body.childNodes);
};

export const RichOutput = ({ text, ...rest }: { text: string } & any) => {
	const content = parseHtmlToReactPdf(text);

	return <Text {...rest}>{content}</Text>;
};
