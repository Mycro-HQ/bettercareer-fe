import type { ApplicationJob, ApplicationOptions } from '../types';

import HeadPhonesIcon from '@labs/icons/dashboard/headphones.svg';
import CheckMarkIcon from '@labs/icons/dashboard/checkmark-circle.svg';
import ArchiveIcon from '@labs/icons/dashboard/archive.svg';
import RocketIcon from '@labs/icons/dashboard/rocket.svg';
import DribbbleIcon from '@labs/icons/dashboard/dribbble.svg';
import { generateUUID } from '@labs/utils';

export const applicationsOptions: ApplicationOptions[] = [
	{
		id: 'Applied',
		icon: <RocketIcon />,
	},
	{
		id: 'Interviewed',
		icon: <HeadPhonesIcon />,
	},
	{
		id: 'Offered',
		icon: <CheckMarkIcon />,
	},
	{
		id: 'Archived',
		icon: <ArchiveIcon />,
	},
];

const appStateDefaultData: ApplicationJob[] = [
	{
		id: 'Applied_1',
		icon: <DribbbleIcon />,
		title: 'Brand Designer Ap1',
		company: 'Dribbble',
		location: 'California',
		workMode: 'Remote',
	},
	{
		id: 'Applied_2',
		icon: <DribbbleIcon />,
		title: 'Brand Designer Ap2',
		company: 'Dribbble',
		location: 'California',
		workMode: 'Remote',
	},
	{
		id: 'Applied_3',
		icon: <DribbbleIcon />,
		title: 'Brand Designer Ap3',
		company: 'Dribbble',
		location: 'California',
		workMode: 'Remote',
	},
	{
		id: 'Applied_4',
		icon: <DribbbleIcon />,
		title: 'Brand Designer Ap4',
		company: 'Dribbble',
		location: 'California',
		workMode: 'Remote',
	},
	{
		id: 'Applied_5',
		icon: <DribbbleIcon />,
		title: 'Brand Designer Ap5',
		company: 'Dribbble',
		location: 'California',
		workMode: 'Remote',
	},
	{
		id: 'Applied_6',
		icon: <DribbbleIcon />,
		title: 'Brand Designer Ap6',
		company: 'Dribbble',
		location: 'California',
		workMode: 'Remote',
	},
	{
		id: 'Interviewed_1',
		icon: <DribbbleIcon />,
		title: 'Brand Designer I1',
		company: 'Dribbble',
		location: 'California',
		workMode: 'Remote',
	},
	{
		id: 'Interviewed_2',
		icon: <DribbbleIcon />,
		title: 'Brand Designer I2',
		company: 'Dribbble',
		location: 'California',
		workMode: 'Remote',
	},
	{
		id: 'Interviewed_3',
		icon: <DribbbleIcon />,
		title: 'Brand Designer I3',
		company: 'Dribbble',
		location: 'California',
		workMode: 'Remote',
	},
	{
		id: 'Offered_1',
		icon: <DribbbleIcon />,
		title: 'Brand Designer O1',
		company: 'Dribbble',
		location: 'California',
		workMode: 'Remote',
	},
];

export const applicationStateDefaultData = appStateDefaultData.map((job) => {
	// Return a new object with the modified id
	return {
		...job,
		id: job.id.split('_')[0] + '_' + generateUUID(),
	};
});

export const applicationData = {
	key: 1,
	companyLogo: <DribbbleIcon />,
	jobTitle: 'Brand Designer 1',
	companyName: 'Dribbble',
	location: 'California',
	salaryRange: '$120k - $140k',
	tags: ['Remote', 'Internship', 'Full-Time'],
	time: '1hr ago',
	summary: `
	Are you a creative visionary with a passion for crafting
	exceptional brand experiences? Do you thrive in translating
	brand strategies into captivating visuals that resonate with
	audiences? If so, then we want you on our team! We're
	searching for a talented Brand Designer to play a pivotal
	role in shaping the visual identity of our brand. You'll be
	the mastermind behind everything from our logo and brand
	guidelines to marketing materials and social media graphics.
	`,
	isRequirementsText: false,
	requirementsArray: [
		{
			key: 0,
			requirement: `
			Minimum 3+ years of experience in brand design or a
			related field, with a strong portfolio showcasing your
			design expertise and ability to create a cohesive
			brand identity.
			`,
		},
		{
			key: 1,
			requirement: `
			Software mastery: Proficiency in Adobe Creative Suite
			(Photoshop, Illustrator, InDesign) or similar design
			software is essential.
			`,
		},
		{
			key: 2,
			requirement: `
			Eye for detail: A keen eye for detail and a commitment
			to producing high-quality, pixel-perfect designs are
			non-negotiable.
			`,
		},
		{
			key: 3,
			requirement: `
			Brand storytelling: You possess a deep understanding
			of how visual design can shape brand perception and
			effectively communicate brand messages.
			`,
		},
		{
			key: 4,
			requirement: `
			Team player with a twist: You thrive in a
			collaborative environment while maintaining the
			creative independence to bring fresh ideas to the
			table.
			`,
		},
	],
};
