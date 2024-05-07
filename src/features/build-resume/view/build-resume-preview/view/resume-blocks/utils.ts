import { Font } from '@react-pdf/renderer';

import { capitalize } from '@labs/utils';

import {
	Classic,
	Dune,
	Tokyo,
	Dublin,
	Cosmos,
	Metropolitan,
} from './templates';
import { COLOR_MAPS } from './templates/utils';

export const templateMaps = {
	classic: Classic,
	dune: Dune,
	tokyo: Tokyo,
	dublin: Dublin,
	cosmos: Cosmos,
	metropolitan: Metropolitan,
};

export const templatesConfig = Object.keys(templateMaps).map((key) => {
	const template = templateMaps[key as keyof typeof templateMaps];
	return {
		complimentaryColors: COLOR_MAPS.primary,
		...template.config,
		name: key,
	};
});

export const MOCK = [
	{
		key: 'heading',
		title: 'Heading',
		data: {
			name: 'Your Name',
			title: 'Senior Software Engineer',
			subheading: [
				{
					value: 'https://jack.dev',
				},
				{
					value: '+174637344934',
				},
			],
		},
		draggable: false,
	},
	{
		key: 'summary',
		title: 'Summary',
		data: {
			value:
				'Innovative educator dedicated to fostering academic excellence across diverse age groups. Specialized in curriculum innovation and the application of engaging teaching methodologies that promote active learning and student achievement.',
		},
		draggable: false,
	},
	{
		key: 'experiences',
		title: 'Experience',
		data: [
			{
				$id: 'u4kmwo',
				description: {
					value:
						'<ul><li>Developed and launched a multi-platform mobile application, leading to a 30% increase in user engagement and opening new revenue streams.</li></ul>',
					textContent:
						'Developed and launched a multi-platform mobile application, leading to a 30% increase in user engagement and opening new revenue streams.',
				},
				to: '',
				current: true,
				from: '2021-01-01T00:00:00.000Z',
				title: 'Frontend Developer',
				company: 'Jack Sparrow Inc',
				url: 'https://codewonders.dev ',
				location: 'New York',
			},
			{
				$id: 'o2sdwq',
				title: 'Senior Software Engineer',
				company: 'Apple',
				location: 'Remote',
				from: '2022-01-01T00:00:00.000Z',
				to: '2023-02-01T00:00:00.000Z',
				description: {
					value:
						'<ul><li>Developed a financial model for a startup that secured $5 million in funding, enabling the launch of an innovative service that disrupted the traditional market dynamics.</li><li><span style="font-family: Figtree, sans-serif; font-size: 16px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400;">Designed and implemented a comprehensive employee wellness program that led to a 30% decrease in sick days and a 20% increase in overall employee productivity.</span><br></li></ul>',
					textContent:
						'Developed a financial model for a startup that secured $5 million in funding, enabling the launch of an innovative service that disrupted the traditional market dynamics.\nDesigned and implemented a comprehensive employee wellness program that led to a 30% decrease in sick days and a 20% increase in overall employee productivity.\n',
				},
			},
		],
	},
	{
		key: 'educations',
		title: 'Education',
		data: [
			{
				$id: '4j17fp',
				institution: 'Harvard',
				degree: 'Bachelor of science',
				study: 'Mathematics',
				grade: '4.0',
				from: '2020-01-01T00:00:00.000Z',
				to: '2024-01-01T00:00:00.000Z',
			},
		],
	},
	{
		key: 'certifications',
		title: 'Certifications',
		data: [
			{
				$id: '99zrnj',
				name: 'Best Developer in 2030',
				organization: 'PluralSight',
				url: 'https://codewonders.dev ',
				issued: '2023-02-01T00:00:00.000Z',
				expires: '2023-01-01T00:00:00.000Z',
			},
		],
	},

	{
		key: 'skills',
		title: 'Skills',
		data: [
			{
				$id: 'epm22b',
				name: 'Frontend',
				value: [
					'HTML5, CSS3 (including preprocessors like SASS), JavaScript (ES6+), React.js, Vue.js (or Angular.js)',
				],
			},
		],
	},
	{
		key: 'projects',
		title: 'Projects',
		data: [
			{
				$id: '7umnk',
				name: 'BetaCareer',
				title: 'Software Engineer',
				url: 'https://google.com',
				from: '2024-01-01T00:00:00.000Z',
				to: '',
				current: true,
				description: {
					value:
						"<ul><li>Designed a corporate identity package that revitalized a brand's image, resulting in a 60% increase in customer engagement and a 40% increase in sales.</li></ul>",
					textContent:
						"Designed a corporate identity package that revitalized a brand's image, resulting in a 60% increase in customer engagement and a 40% increase in sales.",
				},
			},
		],
	},
];

export const registerFonts = () => {
	Font.registerEmojiSource({
		format: 'png',
		url: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/',
	});

	Font.register({
		family: 'MerriWeather',
		fonts: [
			{
				src: `https://fonts.gstatic.com/s/merriweather/v30/u-440qyriQwlOrhSvowK_l5OeyxNV-bnrw.ttf`,
				fontWeight: 400,
			},
			{
				src: `https://fonts.gstatic.com/s/merriweather/v30/u-4n0qyriQwlOrhSvowK_l52xwNpX837pvjxPA.ttf`,
				fontWeight: 700,
			},
			{
				src: `https://fonts.gstatic.com/s/merriweather/v30/u-4n0qyriQwlOrhSvowK_l52xwNpX837pvjxPA.ttf`,
				fontWeight: 800,
			},
			{
				src: `https://fonts.gstatic.com/s/merriweather/v30/u-4n0qyriQwlOrhSvowK_l52xwNpX837pvjxPA.ttf`,
				fontWeight: 900,
			},
		],
	});

	Font.register({
		family: 'Open Sans',
		fonts: [
			{
				src: `https://fonts.gstatic.com/s/opensans/v40/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgsjZ0C4nY1M2xLER.ttf`,
				fontWeight: 400,
			},
			{
				src: `https://fonts.gstatic.com/s/opensans/v40/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgsg-1y4nY1M2xLER.ttf`,
				fontWeight: 600,
			},
			{
				src: `https://fonts.gstatic.com/s/opensans/v40/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgsg-1y4nY1M2xLER.ttf`,
				fontWeight: 700,
			},
		],
	});

	Font.register({
		family: 'Playfair',
		fonts: [
			{
				src: `https://fonts.gstatic.com/s/lora/v35/0QI6MX1D_JOuGQbT0gvTJPa787weuyJGmKxemMeZ.ttf`,
				fontWeight: 400,
			},
			{
				src: `https://fonts.gstatic.com/s/lora/v35/0QI6MX1D_JOuGQbT0gvTJPa787z5vCJGmKxemMeZ.ttf`,
				fontWeight: 600,
			},
			{
				src: `https://fonts.gstatic.com/s/lora/v35/0QI6MX1D_JOuGQbT0gvTJPa787z5vCJGmKxemMeZ.ttf`,
				fontWeight: 700,
			},
			{
				src: `https://fonts.gstatic.com/s/lora/v35/0QI6MX1D_JOuGQbT0gvTJPa787z5vCJGmKxemMeZ.ttf`,
				fontWeight: 800,
			},
		],
	});

	Font.register({
		family: 'Inter',
		fonts: [
			{
				src: `https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfMZhrib2Bg-4.ttf`,
				fontWeight: 400,
			},
			{
				src: `https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFuYMZhrib2Bg-4.ttf`,
				fontWeight: 500,
			},
			{
				src: `https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFuYMZhrib2Bg-4.ttf`,
				fontWeight: 600,
			},
			{
				src: `https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFuYMZhrib2Bg-4.ttf`,
				fontWeight: 700,
			},
			{
				src: `https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFuYMZhrib2Bg-4.ttf`,
				fontWeight: 800,
			},
		],
	});
	Font.register({
		family: 'Lato',
		fonts: [
			{
				src: `https://fonts.gstatic.com/s/lato/v24/S6uyw4BMUTPHvxk6XweuBCY.ttf`,
				fontWeight: 400,
			},
			{
				src: `https://fonts.gstatic.com/s/lato/v24/S6u9w4BMUTPHh6UVSwiPHA3q5d0N7w.ttf`,
				fontWeight: 700,
			},
			{
				src: `https://fonts.gstatic.com/s/lato/v24/S6u9w4BMUTPHh6UVSwiPHA3q5d0N7w.ttf`,
				fontWeight: 800,
			},
			{
				src: `https://fonts.gstatic.com/s/lato/v24/S6u9w4BMUTPHh6UVSwiPHA3q5d0N7w.ttf`,
				fontWeight: 900,
			},
		],
	});
};

export const getHref = (text: string) => {
	if (!text) return '';

	if (text?.startsWith('http')) return text;

	if (text.includes('@')) return `mailto:${text}`;

	if (text.match(/(\d{3})\D*(\d{3})\D*(\d{4})/)) return `tel:${text}`;

	return `https://www.google.com/search?q=${text}`;
};

export const extractNameFromLink = (link: string) => {
	if (!link) return '';
	const brands = ['facebook', 'twitter', 'linkedin', 'github', 'instagram'];
	const brand = brands.find((b) => link.includes(b));
	if (brand) return capitalize(brand);
	return link;
};

export const getData = (key: string, modules: any) => {
	return modules.find((module: any) => module.key === key)?.data;
};

export const generateDataByKey = (key: string[], modules: any) => {
	return modules.filter((module: any) => {
		return key.includes(module.key) || module.key.startsWith('new_section:');
	});
};
