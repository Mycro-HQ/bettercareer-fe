import { createReportableStore } from '../middleware/report';

import { generateUUID } from '@labs/utils';
import { templatesConfig } from '@/features/build-resume/view/build-resume-preview/view/resume-blocks/utils';

interface BuildStore {
	loading: boolean;
	modules: typeof MODULES;
	setLoading: (loading: boolean) => void;
	setModules: (modules: Array<any>) => void;
	setModuleData: (
		key: string,
		data: any,
		options: {
			edit?: boolean;
		}
	) => void;
	removeModuleData: (
		key: string,
		data: any,
		options?: {
			removeModule: boolean;
		}
	) => void;
	editModuleData: (key: string, data: any) => void;
	setModuleAdd: (key: string, status: boolean) => void;
	moduleAdd: { [key: string]: boolean };
	setTheme: (theme: any) => void;
	template: {
		name: string;
		[key: string]: any;
	};
	resumeBlob: {
		blob: string | null;
		raw?: string | null;
		score?: number;
		thumbnail?: string | null;
		snapshots?: string[];
	};
	showPreview: boolean;
	setResumeBlob: (options?: {
		blob?: string | null;
		raw?: string | null;
		score?: number;
		thumbnail?: string | null;
		snapshots?: string[];
	}) => void;
	setTemplate: (template: any) => void;
	setShowPreview?: (showPreview: boolean) => void;
}

export const MODULES = [
	{ key: 'heading', title: 'Heading', data: {}, draggable: false },
	{ key: 'summary', title: 'Summary', data: {}, draggable: false },
	{ key: 'experiences', title: 'Experience', data: [] },
	{ key: 'educations', title: 'Education', data: [] },
	{ key: 'certifications', title: 'Certifications', data: [] },
	{ key: 'skills', title: 'Skills', data: [] },
	{ key: 'projects', title: 'Projects', data: [] },
];

const initialState: BuildStore = {
	loading: false,
	modules: MODULES,
	moduleAdd: {
		experiences: false,
		educations: false,
	},
	template: {
		...templatesConfig[0],
	},
	resumeBlob: {
		blob: null,
		raw: null,
	},
	showPreview: false,
	setLoading: () => {},
	setModules: () => {},
	setModuleData: () => {},
	removeModuleData: () => {},
	editModuleData: () => {},
	setModuleAdd: () => {},
	setResumeBlob: () => {},
	setTheme: () => {},
	setTemplate: () => {},
};

const useBuildStore = createReportableStore<BuildStore>((set, get) => ({
	...initialState,
	setLoading: (loading: boolean) => set({ loading }),
	setModules: (modules: Array<any>) => {
		const newModules = modules.map((module) => {
			return {
				...module,
				data: module.data || {},
			};
		});

		set({
			modules: newModules,
		});
	},

	setTemplate: (template: any) => {
		set({
			template: {
				...get().template,
				...Object.keys(template).reduce((acc: any, key) => {
					acc[key] = template[key];

					if (template[key] === 'Lato Body') {
						acc[key] = 'Lato';
					}

					return acc;
				}, {}),
			},
		});
	},
	setResumeBlob: (data: any) => {
		set({
			resumeBlob: {
				...get().resumeBlob,
				...data,
			},
		});
	},
	setShowPreview: (showPreview: boolean) => {
		set({
			showPreview,
		});
	},
	setModuleAdd: (key: string, status: boolean) => {
		const moduleAdd = get().moduleAdd[key];
		set({
			moduleAdd: {
				...get().moduleAdd,
				[key]: !!moduleAdd ? false : status,
			},
		});
	},
	setModuleData: (
		key: string,
		data: any,
		options: {
			edit?: boolean;
		} = {
			edit: true,
		}
	) => {
		const modules = get().modules.map((module) => {
			if (module.key === key) {
				if (!options.edit) {
					return {
						...module,
						data: data,
					};
				}

				return {
					...module,
					data: Array.isArray(MODULES.find((m) => m.key === key)?.data)
						? [
								...((module.data as Array<any>) || []),
								{
									$id: generateUUID(),
									...data,
								},
							]
						: {
								...module.data,
								...data,
							},
				};
			}
			return module;
		});

		set({
			modules,
		});
	},
	removeModuleData: (
		key: string,
		data: any,
		options?: {
			removeModule: boolean;
		}
	) => {
		let modules = get().modules;
		if (options?.removeModule && key) {
			modules = modules.filter((module) => module.key !== key);
		} else {
			modules = get().modules.map((module) => {
				if (module.key === key) {
					return {
						...module,
						data: Array.isArray(MODULES.find((m) => m.key === key)?.data)
							? [
									...((module.data as Array<any>) || []).filter(
										(d) => d?.$id !== data?.$id
									),
								]
							: {
									...module.data,
									...data,
								},
					};
				}
				return module;
			});
		}

		set({
			modules,
		});
	},

	editModuleData: (key: string, data: any) => {
		const modules = get().modules.map((module) => {
			if (module.key === key) {
				return {
					...module,
					data: Array.isArray(MODULES.find((m) => m.key === key)?.data)
						? [
								...((module.data as Array<any>) || []).map((d) =>
									d?.$id === data?.$id ? data : d
								),
							]
						: {
								...module.data,
								...data,
							},
				};
			}
			return module;
		});

		set({
			modules,
		});
	},
}));

export { useBuildStore };
