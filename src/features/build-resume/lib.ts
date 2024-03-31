import { HeadingModule } from './view/build-resume-pane/components';
import {
	EditorModule,
	SkillsModule,
} from './view/build-resume-pane/components/editor-frame';
import ExperienceFrame from './view/build-resume-pane/components/experience-frame';

export const COMPONENT_MAP = {
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
	skills: SkillsModule,
	...(['summary', 'default'] as const).reduce(
		(acc, key) => ({
			...acc,
			[key]: EditorModule,
		}),
		{}
	),
};
