import { MODULES } from '@/features/build-resume/lib';
import { createReportableStore } from '../middleware/report';

interface BuildStore {
	loading: boolean;
	modules: typeof MODULES;
	setLoading: (loading: boolean) => void;
	setModules: (modules: Array<any>) => void;
	setModuleData: (key: string, data: any) => void;
	removeModuleData: (key: string, data: any) => void;
	editModuleData: (key: string, data: any) => void;
}

const initialState: BuildStore = {
	loading: false,
	modules: MODULES,
	setLoading: () => {},
	setModules: () => {},
	setModuleData: () => {},
	removeModuleData: () => {},
	editModuleData: () => {},
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
