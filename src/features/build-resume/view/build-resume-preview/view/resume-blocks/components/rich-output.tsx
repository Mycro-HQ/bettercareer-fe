import React from 'react';
import { Link, StyleSheet, Text } from '@react-pdf/renderer';
import { parse } from 'node-html-parser';

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

// export const parseHtmlToReactPdf = (htmlContent: string) => {
// 	if (!htmlContent || typeof window === 'undefined') return null;

// 	const parser = new DOMParser();
// 	const doc = parser.parseFromString(htmlContent, 'text/html');

// 	const walkNodes = (nodes: any) => {
// 		return Array.from(nodes).map((node: any, index) => {
// 			if (node.nodeType === Node.TEXT_NODE) {
// 				return <Text key={node.nodeValue}>{node.nodeValue}</Text>;
// 			}

// 			if (node.nodeType === Node.ELEMENT_NODE) {
// 				const { nodeName, childNodes } = node;

// 				let style = {};
// 				if (nodeName === 'B' || nodeName === 'STRONG') {
// 					style = styles.bold;
// 				} else if (nodeName === 'U') {
// 					style = styles.underline;
// 				} else if (nodeName === 'S' || nodeName === 'STRIKE') {
// 					style = styles.lineThrough;
// 				}

// 				if (nodeName === 'P') {
// 					return (
// 						<Text style={[styles.paragraph, style]} key={node.innerText}>
// 							{walkNodes(childNodes)}
// 						</Text>
// 					);
// 				}

// 				if (nodeName === 'BR') {
// 					return <Text key={node.innerText}>{'\n'}</Text>;
// 				}

// 				if (nodeName === 'A') {
// 					return (
// 						<Link
// 							style={[style, styles.link]}
// 							href={node.getAttribute('href')}
// 							key={node.innerText}
// 						>
// 							{walkNodes(childNodes)}
// 						</Link>
// 					);
// 				}

// if (['OL'].includes(nodeName)) {
// 	let _index = 0;

// 	const listItems = Array.from(childNodes).filter(
// 		(childNode: any) => childNode.nodeName === 'LI'
// 	) as any[];

// 	return listItems.map((listItem, $index) => {
// 		_index += 1;
// 		return (
// 			<Text key={listItem.innerText} style={[style]}>
// 				{index}. {walkNodes(listItem.childNodes)}
// 				{$index === listItems.length - 1 ? null : '\n'}
// 			</Text>
// 		);
// 	});
// }

// if (['UL'].includes(nodeName)) {
// 	const listItems = Array.from(childNodes).filter(
// 		(childNode: any) => childNode.nodeName === 'LI'
// 	) as any[];

// 	return listItems.map((listItem, $index) => {
// 		return (
// 			<Text key={listItem.innerText} style={[style]}>
// 				• {walkNodes(listItem.childNodes)}
// 				{$index === listItems.length - 1 ? null : '\n'}
// 			</Text>
// 		);
// 	});
// }

// 				return (
// 					<Text style={style} key={node.innerText}>
// 						{walkNodes(childNodes)}
// 					</Text>
// 				);
// 			}
// 		});
// 	};

// 	return walkNodes(doc.body.childNodes);
// };

const parseHtmlToReactPdf = (htmlContent: string) => {
	if (!htmlContent) return null;
	const root = parse(htmlContent);

	const walkNodes = (nodes: any) => {
		return nodes.map((node: any, i: number) => {
			let style = {};
			switch (node.tagName) {
				case 'B':
				case 'STRONG':
					style = styles.bold;
					break;
				case 'U':
					style = styles.underline;
					break;
				case 'S':
				case 'STRIKE':
					style = styles.lineThrough;
					break;
			}

			if (node.nodeType === 3) {
				// Text node
				return <Text key={i}>{node.rawText}</Text>;
			}

			if (node.tagName === 'P') {
				return (
					<Text style={[styles.paragraph, style]} key={i}>
						{walkNodes(node.childNodes)}
					</Text>
				);
			}

			if (node.tagName === 'BR') {
				return <Text key={i}>{'\n'}</Text>;
			}

			if (node.tagName === 'A') {
				return (
					<Link
						style={[style, styles.link]}
						href={node.attributes.href}
						key={i}
					>
						{walkNodes(node.childNodes)}
					</Link>
				);
			}

			if (['ol'].includes(node.rawTagName)) {
				let _index = 0;

				const listItems = Array.from(node.childNodes).filter(
					(childNode: any) => childNode.rawTagName === 'li'
				) as any[];

				return listItems.map((listItem, $index) => {
					_index += 1;
					return (
						<Text key={listItem.innerText} style={[style]}>
							{_index}. {walkNodes(listItem.childNodes)}
							{$index === listItems.length - 1 ? null : '\n'}
						</Text>
					);
				});
			}

			if (['ul'].includes(node.rawTagName)) {
				const listItems = Array.from(node.childNodes).filter(
					(childNode: any) => childNode.rawTagName === 'li'
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
				<Text style={style} key={i}>
					{walkNodes(node.childNodes)}
				</Text>
			);
		});
	};

	return walkNodes(root.childNodes);
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
