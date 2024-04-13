import DribbbleLogo from '../../../../../public/images/dashboard/dribbble.png';

import { IJobCard } from './components/job-card';
import { IJobDescriptionCard } from './components/job-description-card';

export const data: IJobCard[] = [
	{
		id: 1,
		companyLogo: DribbbleLogo,
		jobTitle: 'Brand Designer',
		companyName: 'Dribbble',
		companyLocation: 'California',
		minSalary: '$120k',
		maxSalary: '$140k',
		jobTag: ['Remote', 'Internship', 'Full-time'],
		time: '1hr ago',
	},
	{
		id: 2,
		companyLogo: DribbbleLogo,
		jobTitle: 'Product Designer',
		companyName: 'Dribbble',
		companyLocation: 'Nigeria',
		minSalary: '$100k',
		maxSalary: '$140k',
		jobTag: ['Hybrid', 'Internship', 'Full-time'],
		time: '4hr ago',
	},
	{
		id: 3,
		companyLogo: DribbbleLogo,
		jobTitle: 'Motion Designer',
		companyName: 'Meta',
		companyLocation: 'London',
		minSalary: '$200k',
		maxSalary: '$500k',
		jobTag: ['On-site', 'Internship', 'Full-time'],
		time: '10hr ago',
	},
];

export const descriptionData: IJobDescriptionCard[] = [
	{
		companyLogo: DribbbleLogo,
		jobTitle: 'Brand Designer',
		companyName: 'Dribbble',
		companyLocation: 'California',
		minSalary: '$120k',
		maxSalary: '$140k',
		summary:
			"Are you a creative visionary with a passion for crafting exceptional brand experiences? Do you thrive in translating brand strategies into captivating visuals that resonate with audiences? If so, then we want you on our team! We're searching for a talented Brand Designer to play a pivotal role in shaping the visual identity of our brand. You'll be the mastermind behind everything from our logo and brand guidelines to marketing materials and social media graphics.",
		requirements: [
			'Minimum 3+ years of experience in brand design or a related field, with a strong portfolio showcasing your design expertise and ability to create a cohesive brand identity.',
			'Software mastery: Proficiency in Adobe Creative Suite (Photoshop, Illustrator, InDesign) or similar design software is essential.',
			'Eye for detail: A keen eye for detail and a commitment to producing high-quality, pixel-perfect designs are non-negotiable.',
			'Brand storytelling: You possess a deep understanding of how visual design can shape brand perception and effectively communicate brand messages.',
			'Team player with a twist: You thrive in a collaborative environment while maintaining the creative independence to bring fresh ideas to the table.',
		],
	},
	{
		companyLogo: DribbbleLogo,
		jobTitle: 'Product Designer',
		companyName: 'Dribbble',
		companyLocation: 'Nigeria',
		minSalary: '$100k',
		maxSalary: '$140k',
		summary:
			"Are you a creative visionary with a passion for crafting exceptional brand experiences? Do you thrive in translating brand strategies into captivating visuals that resonate with audiences? If so, then we want you on our team! We're searching for a talented Brand Designer to play a pivotal role in shaping the visual identity of our brand. You'll be the mastermind behind everything from our logo and brand guidelines to marketing materials and social media graphics.",
		requirements: [
			'Minimum 3+ years of experience in brand design or a related field, with a strong portfolio showcasing your design expertise and ability to create a cohesive brand identity.',
			'Software mastery: Proficiency in Adobe Creative Suite (Photoshop, Illustrator, InDesign) or similar design software is essential.',
			'Eye for detail: A keen eye for detail and a commitment to producing high-quality, pixel-perfect designs are non-negotiable.',
			'Brand storytelling: You possess a deep understanding of how visual design can shape brand perception and effectively communicate brand messages.',
			'Team player with a twist: You thrive in a collaborative environment while maintaining the creative independence to bring fresh ideas to the table.',
		],
	},
	{
		companyLogo: DribbbleLogo,
		jobTitle: 'Motion Designer',
		companyName: 'Meta',
		companyLocation: 'London',
		minSalary: '$200k',
		maxSalary: '$500k',
		summary:
			"Are you a creative visionary with a passion for crafting exceptional brand experiences? Do you thrive in translating brand strategies into captivating visuals that resonate with audiences? If so, then we want you on our team! We're searching for a talented Brand Designer to play a pivotal role in shaping the visual identity of our brand. You'll be the mastermind behind everything from our logo and brand guidelines to marketing materials and social media graphics.",
		requirements: [
			'Minimum 3+ years of experience in brand design or a related field, with a strong portfolio showcasing your design expertise and ability to create a cohesive brand identity.',
			'Software mastery: Proficiency in Adobe Creative Suite (Photoshop, Illustrator, InDesign) or similar design software is essential.',
			'Eye for detail: A keen eye for detail and a commitment to producing high-quality, pixel-perfect designs are non-negotiable.',
			'Brand storytelling: You possess a deep understanding of how visual design can shape brand perception and effectively communicate brand messages.',
			'Team player with a twist: You thrive in a collaborative environment while maintaining the creative independence to bring fresh ideas to the table.',
		],
	},
];
