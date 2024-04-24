import {
	BtnBulletList,
	BtnNumberedList,
	ContentEditableEvent,
	Editor,
	EditorProvider,
	Separator,
	Toolbar,
	createButton,
} from 'react-simple-wysiwyg';
import { Popover } from '@radix-ui/themes';
import { useState } from 'react';

import { generateUUID } from '@labs/utils';
import { CallToAction, Flex, Text } from '@labs/components';
import { Field } from '@labs/components/field';
import Bold from '@labs/icons/dashboard/editor/bold.svg';
import Italic from '@labs/icons/dashboard/editor/italics.svg';
import Underline from '@labs/icons/dashboard/editor/underline.svg';
import Link from '@labs/icons/dashboard/editor/links.svg';
import Clear from '@labs/icons/dashboard/editor/clear.svg';
import Undo from '@labs/icons/dashboard/editor/undo.svg';
import Redo from '@labs/icons/dashboard/editor/redo.svg';
import SparklesIcon from '@labs/icons/misc/sparkels.svg';
import AddAlt from '@labs/icons/misc/add-alt.svg';
import { useAiWriterMutation } from '@/queries/resume';

export const BtnBold = createButton('Bold', <Bold />, 'bold');

export const BtnRedo = createButton(
	'Redo',
	<Redo className="rotate-[180deg]" height={18} />,
	'redo'
);
export const BtnUndo = createButton(
	'Undo',
	<Undo className="rotate-[180deg]" height={18} />,
	'undo'
);

export const BtnClearFormatting = createButton(
	'Clear formatting',
	<Clear />,
	'removeFormat'
);

export const BtnItalic = createButton('Italic', <Italic />, 'italic');

export const BtnStrikeThrough = createButton(
	'Strike through',
	<s>ab</s>,
	'strikeThrough'
);

export const BtnLink = createButton(
	'Link',
	<Link />,
	({ $selection, ...rest }) => {
		if ($selection?.nodeName === 'A') {
			document.execCommand('unlink');
		} else {
			// eslint-disable-next-line no-alert
			document.execCommand('createLink', false, prompt('URL', '') || undefined);
		}
	}
);

export const BtnUnderline = createButton(
	'Underline',
	<Underline />,
	'underline'
);

export default function CustomEditor({
	value,
	onChange,
	label,
	name,
	toolbar = [
		'bold',
		'underline',
		'strikeThrough',
		'link',
		'divider',
		'numberedList',
		'bulletList',
		'divider',
		'clearFormatting',
	],
}: {
	value: string;
	name: string;
	key?: string;
	onChange: (value: ContentEditableEvent) => void;
	label?: string;
	toolbar?: Array<
		| 'bold'
		| 'italic'
		| 'underline'
		| 'strikeThrough'
		| 'link'
		| 'divider'
		| 'clearFormatting'
		| 'numberedList'
		| 'bulletList'
	>;
}) {
	const fieldId = generateUUID();
	const randomMap = {
		summary: refinedSummary,
		description: refinedExperienceDescriptions,
	};
	const [acceptText, setAcceptText] = useState('');
	const [aiacceptText, setAiAcceptText] = useState({
		text: '',
		show: false,
	});
	const randomText = randomMap[name as 'summary' | 'description'] || null;
	const text = randomText?.[Math.floor(Math.random() * randomText?.length)];

	const typeMap = {
		description: 'experiences',
		summary: 'summary',
	};

	const { mutateAsync: aiWrite, isPending } = useAiWriterMutation();
	return (
		<Flex.Column fullWidth gap={8}>
			{label && (
				<label htmlFor={fieldId} className="rsw_label">
					{label}{' '}
				</label>
			)}
			<EditorProvider>
				<Editor value={value} onChange={onChange} id={fieldId}>
					<Toolbar>
						<BtnUndo />
						<BtnRedo />
						<Separator />

						{toolbar.map((item, index) => {
							const key = `${item}:${index}`;
							switch (item) {
								case 'bold':
									return <BtnBold key={key} />;
								case 'italic':
									return <BtnItalic key={key} />;
								case 'underline':
									return <BtnUnderline key={key} />;
								case 'strikeThrough':
									return <BtnStrikeThrough key={key} />;
								case 'link':
									return <BtnLink key={key} />;
								case 'divider':
									return <Separator key={key} />;
								case 'clearFormatting':
									return <BtnClearFormatting key={key} />;
								case 'numberedList':
									return <BtnNumberedList key={key} />;
								case 'bulletList':
									return <BtnBulletList key={key} />;
								default:
									return null;
							}
						})}
					</Toolbar>
				</Editor>
			</EditorProvider>
			<Flex gap={8} alignItems="center" className="mt-[8px]">
				<Popover.Root
					open={aiacceptText.show}
					onOpenChange={() => {
						setAiAcceptText((prev) => ({
							...prev,
							show: !prev.show,
						}));
					}}
				>
					<Popover.Trigger>
						<CallToAction.button
							size="sm"
							outline
							leadingIcon={
								<SparklesIcon
									width={16}
									className="text-[var(--primary-blue)]"
								/>
							}
						>
							AI write
						</CallToAction.button>
					</Popover.Trigger>
					<Popover.Content size="1" className="max-w-[500px]">
						<Flex.Column gap={8}>
							<Text size="sm">
								<SparklesIcon width={16} className="inline" /> AI Write
							</Text>
							<Text fontSize="12px" color="var(--text-gray)">
								Remember to be specific and unique in your ask e.g &quot;Write a{' '}
								{typeMap[name as 'summary' | 'description'] || 'summary'} for a
								software developer with 5 years experience&quot;
							</Text>
							<Field.Form
								onSubmit={async (e) => {
									e.preventDefault();
									setAiAcceptText((prev) => ({
										...prev,
										text: '',
									}));

									const res = await aiWrite({
										text: value,
										writeType: typeMap[name as 'summary' | 'description'] || '',
									});

									setAiAcceptText((prev) => ({
										...prev,
										text: res?.data?.text || text,
									}));
								}}
							>
								<Field.Textarea
									placeholder={`e.g write a descriptive summary`}
									style={{ height: 80 }}
								/>
								{aiacceptText?.text && (
									<>
										<Text
											size="sm"
											className="p-3 bg-[#0000000d] rounded-lg text-[#333] overflow-auto max-h-[200px]"
										>
											{aiacceptText?.text?.replace(/<[^>]*>?/gm, '')}
										</Text>
									</>
								)}
								<Flex.Row gap={8} alignItems="center">
									<CallToAction.button
										size="sm"
										variant="secondary"
										isLoading={isPending}
									>
										{aiacceptText?.text ? 'Re-write' : 'Write'}
									</CallToAction.button>
									{aiacceptText?.text && (
										<CallToAction.button
											size="sm"
											onClick={(e) => {
												e.preventDefault();
												const val = aiacceptText?.text?.replace(
													/<[^>]*>?/gm,
													''
												);

												onChange({
													currentTarget: {
														outerText: val,
													},
													target: {
														value: val || '',
													},
												} as any);

												setAiAcceptText({
													text: '',
													show: false,
												});
											}}
										>
											Accept
										</CallToAction.button>
									)}
								</Flex.Row>
							</Field.Form>
						</Flex.Column>
					</Popover.Content>
				</Popover.Root>
				{randomText?.length > 0 && (
					<Popover.Root
						open={!!acceptText}
						onOpenChange={() => {
							if (acceptText) {
								setAcceptText('');
							}
						}}
					>
						<Popover.Trigger>
							<CallToAction.button
								size="sm"
								outline
								onClick={(e) => {
									setAcceptText(text);
								}}
								leadingIcon={
									<AddAlt width={18} className="text-[var(--primary-blue)]" />
								}
							>
								Suggest {name}
							</CallToAction.button>
						</Popover.Trigger>
						<Popover.Content size="1" className="max-w-[400px]">
							<Flex.Column gap={8}>
								<Text
									size="sm"
									className="p-3 bg-[#0000000d] rounded-lg text-[#333]"
								>
									{acceptText?.replace(/<[^>]*>?/gm, '')}
								</Text>

								<Flex.Row gap={8}>
									<CallToAction.button
										size="sm"
										variant="secondary"
										onClick={() => {
											setAcceptText(text);
										}}
									>
										Suggest Another
									</CallToAction.button>
									<CallToAction.button
										size="sm"
										onClick={(e) => {
											e.preventDefault();
											const val = acceptText;

											onChange({
												currentTarget: {
													outerText: val?.replace(/<[^>]*>?/gm, ''),
												},
												target: {
													value: val,
												},
											} as any);

											setAcceptText('');
										}}
									>
										Accept
									</CallToAction.button>
								</Flex.Row>
							</Flex.Column>
						</Popover.Content>
					</Popover.Root>
				)}
			</Flex>
		</Flex.Column>
	);
}

const refinedSummary = [
	'Dynamic sales and customer service professional, distinguished by surpassing sales targets consistently and fostering outstanding customer relationships. Known for exceptional motivational skills and a deep commitment to excellence in service.',
	'Experienced in sales and customer service, I am distinguished by my ability to exceed sales goals and cultivate excellent client relations, driven by a profound commitment to service quality and team success.',
	'Skilled software developer with expertise in Python and JavaScript, adept in full-stack development, agile methodologies, and leveraging cloud technologies. I have a track record of successfully delivering innovative web and mobile applications.',
	'Empathetic healthcare professional specializing in geriatric medicine, with over a decade of experience in enhancing patient care. Recognized for exceptional communication and the development of personalized care plans that significantly improve patient outcomes.',
	'Energetic marketing specialist with a solid foundation in digital marketing, including SEO, PPC, and social media strategies. Proven success in elevating brand visibility and driving sales through creative and targeted marketing campaigns.',
	'Analytical financial analyst with a keen acumen for market trends, financial modeling, and strategic investment. Noted for producing insightful financial analyses that drive informed strategic business decisions.',
	'Creative graphic designer with a flair for crafting compelling visual identities across web, branding, and print mediums. Expert in Adobe Creative Suite, committed to translating client visions into impactful and engaging designs.',
	'Innovative educator dedicated to fostering academic excellence across diverse age groups. Specialized in curriculum innovation and the application of engaging teaching methodologies that promote active learning and student achievement.',
	'Environmental scientist with a zeal for developing sustainable solutions to contemporary environmental issues. Skilled in data analysis, impact assessments, and advocating for evidence-based environmental policy and practice.',
	'Human resources manager with a comprehensive background in shaping HR policies, talent management, and fostering positive workplace environments. Recognized for enhancing organizational culture and employee engagement through strategic HR initiatives.',
	'Forward-thinking engineer with a robust background in civil engineering and project management. Proven expertise in designing and supervising the construction of infrastructure projects, with a steadfast commitment to upholding industry standards and sustainability.',
	'High-performing sales expert with a proven history of achieving and exceeding targets in competitive environments. Renowned for building lasting relationships and mastering negotiations to secure mutually beneficial outcomes.',
	'Strategic IT consultant with extensive experience in crafting and executing technology strategies that bolster business objectives. Proficient in cybersecurity, network design, and cloud services, aiming to optimize operational efficiency and security.',
	'Dedicated investigative journalist with a reputation for uncovering compelling stories through meticulous research and ethical journalism. Committed to delivering truth and transparency, supported by a strong network of sources.',
];

const refinedExperienceDescriptions = [
	'<ul><li>Led a sales team to achieve a 150% increase in sales targets through strategic planning and exceptional leadership, resulting in significant market share growth.</li></ul>',
	'<ul><li>Implemented innovative customer service strategies that enhanced customer satisfaction rates by 40%, driving repeat business and loyalty.</li></ul>',
	'<ul><li>Developed and launched a multi-platform mobile application, leading to a 30% increase in user engagement and opening new revenue streams.</li></ul>',
	'<ul><li>Directed patient care for geriatric patients, achieving a 20% improvement in patient health outcomes through personalized care plans and dedicated follow-up.</li></ul>',
	'<ul><li>Executed a digital marketing campaign that increased brand awareness by 50% and sales by 35% through targeted social media ads and content marketing.</li></ul>',
	'<ul><li>Conducted comprehensive market analysis that informed a pivotal shift in investment strategy, yielding a 25% increase in portfolio performance.</li></ul>',
	"Designed a corporate identity package that revitalized a brand's image, resulting in a 60% increase in customer engagement and a 40% increase in sales.",
	'<ul><li>Revamped an outdated curriculum with innovative teaching methods, leading to a 15% improvement in student test scores and a 25% increase in student engagement.</li></ul>',
	'<ul><li>Led a research project on sustainable urban development, influencing local government policies and contributing to a 10% reduction in urban carbon emissions.</li></ul>',
	'<ul><li>Overhauled the HR recruitment process, reducing hiring times by 30% and improving employee retention rates by 25% through strategic talent acquisition and management.</li></ul>',
	'<ul><li>Managed the design and construction of a major infrastructure project, completing it 20% under budget and 30% ahead of schedule, while ensuring compliance with all safety and quality standards.</li></ul>',
	'<ul><li>Achieved top salesperson status for three consecutive years by consistently exceeding sales targets and cultivating key relationships with high-value clients.</li></ul>',
	'<ul><li>Developed a cybersecurity protocol that reduced data breaches by 90%, safeguarding company and customer data and enhancing trust and compliance.</li></ul>',
	'<ul><li>Uncovered a major political scandal through investigative reporting, leading to national policy changes and receiving prestigious journalism awards for ethical reporting.</li></ul>',
	'<ul><li>Led a team in developing an award-winning software solution that streamlined operational processes, resulting in a 40% increase in efficiency and significant cost savings.</li></ul>',
	'<ul><li>Implemented a cloud migration strategy for a Fortune 500 company, leading to a 50% reduction in IT costs and a 35% increase in operational agility.</li></ul>',
	'<ul><li>Directed a grassroots environmental campaign that successfully lobbied for the passage of critical legislation aimed at protecting local waterways from industrial pollution.</li></ul>',
	'<ul><li>Designed and implemented a comprehensive employee wellness program that led to a 30% decrease in sick days and a 20% increase in overall employee productivity.</li></ul>',
	'<ul><li>Coordinated a major international conference on climate change, bringing together stakeholders from over 50 countries to collaborate on actionable solutions, significantly raising awareness and funding for climate initiatives.</li></ul>',
	'<ul><li>Developed a financial model for a startup that secured $5 million in funding, enabling the launch of an innovative service that disrupted the traditional market dynamics.</li></ul>',
];
