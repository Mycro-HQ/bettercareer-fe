import { createReportableStore } from '../middleware/report';

interface BuildStore {
	loading: boolean;
	modules: typeof MODULES;
	setLoading: (loading: boolean) => void;
	setModules: (modules: Array<any>) => void;
	setModuleData: (key: string, data: any) => void;
	removeModuleData: (key: string, data: any) => void;
	editModuleData: (key: string, data: any) => void;
	setModuleAdd: (key: string, status: boolean) => void;
	moduleAdd: { [key: string]: boolean };
	setTheme: (theme: any) => void;
	theme: {
		font: {
			heading: string;
			body: string;
			scale: number;
		};
		colors: {
			primary: string;
			primary_text: string;
			text: string;
			border: string;
		};
	};
	resumeBlob: {
		blob: string | null;
		raw?: string | null;
	};
	setResumeBlob: (options?: {
		blob?: string | null;
		raw?: string | null;
	}) => void;
}

const themes = {
	classic: {
		colors: {
			primary: '#F0F0F0',
			primary_text: '#000',
			border: '#6F7982',
		},
	},
	dublin: {
		colors: {
			primary: '#0F1F2E',
			primary_text: '#FFFFFF',
		},
	},
	tokyo: {
		colors: {
			primary: '#F0F0F0',
			primary_text: '#000',
			border: '#6F7982',
		},
	},
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

const initialState: BuildStore = {
	loading: false,
	modules: MODULES,
	moduleAdd: {
		experience: false,
		education: false,
	},
	theme: {
		font: {
			heading: 'Oswald',
			body: 'Open Sans',
			scale: 1,
		},
		colors: {
			primary: '#007bff',
			primary_text: '#ffffff',
			text: '#333333',
			border: '#e5e5e5',
		},
	},
	resumeBlob: {
		blob: null,
		raw: null,
	},
	setLoading: () => {},
	setModules: () => {},
	setModuleData: () => {},
	removeModuleData: () => {},
	editModuleData: () => {},
	setModuleAdd: () => {},
	setResumeBlob: () => {},
	setTheme: () => {},
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
	setTheme: (theme: any) => {
		set({
			theme: {
				...get().theme,
				...theme,
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
	setModuleAdd: (key: string, status: boolean) => {
		const module = get().moduleAdd[key];
		set({
			moduleAdd: {
				...get().moduleAdd,
				[key]: !!module ? false : status,
			},
		});
	},
	setModuleData: (key: string, data: any) => {
		const modules = get().modules.map((module) => {
			if (module.key === key) {
				return {
					...module,
					data: Array.isArray(MODULES.find((m) => m.key === key)?.data)
						? [
								...((module.data as Array<any>) || []),
								{
									$id: Math.random().toString(36).substring(7),
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
	removeModuleData: (key: string, data: any) => {
		const modules = get().modules.map((module) => {
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
