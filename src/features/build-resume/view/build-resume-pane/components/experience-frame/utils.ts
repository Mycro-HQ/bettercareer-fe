import { Field } from '@labs/components/field';
import CustomEditor from '../simple-rich-text';

export const MODULE_OPTIONS = {
	experience: {
		name: 'Experience',
		emptyMessage:
			'Add your work experience: Include past and present positions to build your resume',
		card: {
			title: ['title', 'company'],
			subtitle: ['location'],
			date: ['from', 'to', 'current'],
			description: ['description'],
		},
		fields: [
			{
				title: 'Title',
				type: 'text',
				key: 'title',
				span: 1,
				required: true,
			},
			{
				title: 'Company',
				type: 'text',
				key: 'company',
				span: 1,
				required: true,
			},
			{
				title: 'Location',
				type: 'text',
				key: 'location',
				span: 1,
			},
			{
				title: 'URL',
				type: 'text',
				key: 'url',
				span: 1,
			},
			{
				title: 'From',
				type: 'date',
				span: 1,
				key: 'from',
				required: true,
			},
			{
				title: 'To',
				type: 'date',
				key: 'to',
				span: 1,
				required: true,
			},
			{
				title: "I'm still working here",
				type: 'checkbox',
				key: 'current',
				span: 1,
			},
			{
				title: 'Description',
				type: 'textarea',
				key: 'description',
				span: 2,
			},
		],
	},
	education: {
		name: 'Education',
		emptyMessage:
			'Add your education: Simply fill in the details to showcase your academic background.',
		card: {
			title: ['degree', 'institution'],
			subtitle: ['study'],
			date: ['from', 'to', 'current'],
			description: ['grade'],
		},
		fields: [
			{
				title: 'Institution Name',
				type: 'text',
				key: 'institution',
				span: 1,
				required: true,
			},
			{
				title: 'Degree',
				type: 'text',
				key: 'degree',
				span: 1,
				required: true,
			},
			{
				title: 'Field of Study',
				type: 'text',
				key: 'study',
				span: 1,
			},
			{
				title: 'Grade',
				type: 'text',
				key: 'grade',
				span: 1,
			},
			{
				title: 'From',
				type: 'date',
				key: 'from',
				span: 1,
				required: true,
			},
			{
				title: 'To',
				type: 'date',
				key: 'to',
				span: 1,
				required: true,
			},
			{
				title: "I'm still studying here",
				type: 'checkbox',
				key: 'current',
				span: 1,
			},
		],
	},
	certifications: {
		name: 'Certifications',
		emptyMessage:
			'Add your certifications to demonstrate relevant skills and knowledge.',
		card: {
			title: ['name', 'organization'],
			subtitle: ['url'],
			date: ['issued', 'expires'],
		},
		fields: [
			{
				title: 'Certificate Name',
				type: 'text',
				key: 'name',
				span: 2,
			},
			{
				title: 'Issuing Organization',
				type: 'text',
				key: 'organization',
				span: 1,
			},
			{
				title: 'URL',
				type: 'text',
				key: 'url',
				span: 1,
			},
			{
				title: 'Issued',
				key: 'issued',
				type: 'date',
				span: 1,
			},
			{
				title: 'Expires',
				type: 'date',
				key: 'expires',
				span: 1,
			},
		],
	},
	projects: {
		name: 'Projects',
		emptyMessage:
			'Add a project: Share your accomplishments and impress potential employers.',
		card: {
			title: ['name', 'title'],
			subtitle: ['url'],
			date: ['from', 'to', 'current'],
			description: ['description'],
		},
		fields: [
			{
				title: 'Project Name',
				type: 'text',
				key: 'name',
				span: 2,
			},
			{
				title: 'Position Title',
				type: 'text',
				key: 'title',
				span: 1,
			},
			{
				title: 'URL',
				type: 'text',
				key: 'url',
				span: 1,
			},
			{
				title: 'From',
				type: 'date',
				key: 'from',
				span: 1,
			},
			{
				title: 'To',
				type: 'date',
				key: 'to',
				span: 1,
			},
			{
				title: "I'm still working on this project",
				type: 'checkbox',
				key: 'current',
				span: 2,
			},
			{
				title: 'Description',
				type: 'textarea',
				key: 'description',
				span: 2,
			},
		],
	},
};

export const MODULE_COMPONENTS = {
	text: Field,
	textarea: CustomEditor,
	date: Field.Date,
	checkbox: Field.Checkbox,
};
