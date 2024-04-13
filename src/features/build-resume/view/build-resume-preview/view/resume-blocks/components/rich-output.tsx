import React from 'react';
import { Link, StyleSheet, Text } from '@react-pdf/renderer';

const styles = StyleSheet.create({
	paragraph: {
		marginBottom: 4,
	},
	bold: {
		fontWeight: 'heavy',
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
		return Array.from(nodes).map((node: any, index) => {
			if (node.nodeType === Node.TEXT_NODE) {
				return <Text key={node.nodeValue}>{node.nodeValue}</Text>;
			}

			if (node.nodeType === Node.ELEMENT_NODE) {
				const { nodeName, childNodes } = node;

				let style = {};
				if (nodeName === 'B' || nodeName === 'STRONG') {
					style = styles.bold;
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

				if (['OL'].includes(nodeName)) {
					let _index = 0;

					const listItems = Array.from(childNodes).filter(
						(childNode: any) => childNode.nodeName === 'LI'
					) as any[];

					return listItems.map((listItem, $index) => {
						_index += 1;
						return (
							<Text key={listItem.innerText} style={[style]}>
								{index}. {walkNodes(listItem.childNodes)}
								{$index === listItems.length - 1 ? null : '\n'}
							</Text>
						);
					});
				}

				if (['UL'].includes(nodeName)) {
					const listItems = Array.from(childNodes).filter(
						(childNode: any) => childNode.nodeName === 'LI'
					) as any[];

					return listItems.map((listItem, $index) => {
						return (
							<Text key={listItem.innerText} style={[style]}>
								• {walkNodes(listItem.childNodes)}
								{$index === listItems.length - 1 ? null : '\n'}
							</Text>
						);
					});
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

export const RichOutput = ({
	text,
	scale,
	...rest
}: { text: string; scale?: number } & any) => {
	const content = parseHtmlToReactPdf(text);

	return (
		<Text
			{...rest}
			style={[
				rest.style,
				{
					flexDirection: 'column',
					gap: 2,
					fontSize: 10 / scale,
					lineHeight: 1.5,
				},
			]}
		>
			{content}
		</Text>
	);
};
