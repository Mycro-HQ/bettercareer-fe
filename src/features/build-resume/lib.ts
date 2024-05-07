import { HeadingModule } from './view/build-resume-pane/components';
import { EditorModule } from './view/build-resume-pane/components/editor-frame';
import ExperienceFrame from './view/build-resume-pane/components/experience-frame';

export const COMPONENT_MAP = {
	heading: HeadingModule,
	...(
		[
			'experiences',
			'educations',
			'certifications',
			'projects',
			'skills',
		] as const
	).reduce(
		(acc, key) => ({
			...acc,
			[key]: ExperienceFrame,
		}),
		{}
	),
	...(['summary', 'default'] as const).reduce(
		(acc, key) => ({
			...acc,
			[key]: EditorModule,
		}),
		{}
	),
};
