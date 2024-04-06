import {
	Paragraph,
	TextRun,
	HeadingLevel,
	AlignmentType,
	SectionType,
} from 'docx';

export function createResumeDocument(inputText: string) {
	const sections = [];

	// Split the text into sections
	const inputSections = inputText?.split(/\n\n/);

	// Extract the name and title
	const nameAndTitle = inputSections?.[0].split(/ +/);
	if (nameAndTitle.length >= 2) {
		sections.push({
			properties: {
				type: SectionType.CONTINUOUS,
			},
			children: [
				new Paragraph({
					children: [
						new TextRun({ text: nameAndTitle[0], bold: true, size: 28 }),
						new TextRun({
							text: nameAndTitle.slice(1).join(' '),
							size: 24,
						}),
					],
					alignment: AlignmentType.LEFT,
					spacing: { before: 14, after: 14 },
				}),
			],
		});
	}

	// Parse and add each section to the document
	sections.push(...parseSection('EDUCATION', inputSections));
	sections.push(...parseSection('CERTIFICATES', inputSections));
	sections.push(...parseSection('SKILLS', inputSections));
	sections.push(...parseSection('SUMMARY', inputSections));
	sections.push(...parseSection('WORK EXPERIENCE', inputSections));
	sections.push(...parseSection('PROJECTS', inputSections));

	return sections;
}

function parseSection(sectionTitle: string, inputSections: any[]) {
	const startIndex = inputSections.findIndex(
		(section: string) => section.trim() === sectionTitle
	);
	if (startIndex !== -1) {
		const paragraphs = [];
		paragraphs.push(
			new Paragraph({
				text: sectionTitle,
				heading: HeadingLevel.HEADING_1,
				spacing: { before: 200, after: 100 },
				style: 'Heading1',
			})
		);
		let currentParagraph = new Paragraph({
			spacing: { before: 100, after: 100 },
		});
		for (let i = startIndex + 1; i < inputSections.length; i++) {
			const line = inputSections[i].trim();
			if (line === '') {
				continue;
			}
			if (line.startsWith('•')) {
				currentParagraph = new Paragraph({
					text: line.slice(2),
					bullet: { level: 0 },
					spacing: { before: 50, after: 50 },
					style: 'ListParagraph',
				});
				paragraphs.push(currentParagraph);
			} else if (line.toUpperCase() === line) {
				break;
			} else {
				currentParagraph.addChildElement(new TextRun({ text: line, break: 1 }));
			}
		}
		return [
			{
				properties: {
					type: SectionType.CONTINUOUS,
				},
				children: paragraphs,
			},
		];
	}
	return [];
}
