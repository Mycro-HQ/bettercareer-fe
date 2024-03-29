import { HeadingModule } from './view/build-resume-pane/components';
import ExperienceFrame from './view/build-resume-pane/components/experience-frame';

export const COMPONENTMAP = {
	heading: HeadingModule,
	...(
		['experience', 'education', 'certifications', 'projects'] as const
	).reduce(
		(acc, key) => ({
			...acc,
			[key]: ExperienceFrame,
		}),
		{}
	),
};

export const MODULES = [
	{ key: 'heading', title: 'Heading', data: {} },
	{ key: 'summary', title: 'Summary', data: {} },
	{ key: 'skills', title: 'Skills', data: [] },
	{ key: 'education', title: 'Education', data: [] },
	{ key: 'experience', title: 'Experience', data: [] },
	{ key: 'certifications', title: 'Certifications', data: [] },
	{ key: 'projects', title: 'Projects', data: [] },
];
