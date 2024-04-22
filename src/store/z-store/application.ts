import { createReportableStore } from '../middleware/report';

import type {
	ApplicationJob,
	ApplicationState,
} from '@/features/dashboard/views/applications/types';
import { applicationStateDefaultData } from '@/features/dashboard/views/applications/data';

type State = {
	applications: ApplicationJob[];
};

type Actions = {
	addNewApplication: (newApplication: ApplicationJob) => void;
	addNewApplicationAtIndex: (
		newApplication: ApplicationJob,
		index: number
	) => void;
	removeApplication: (applicationKey: string) => void;
	updateApplication: (
		applicationKey: string,
		newApplication: ApplicationJob
	) => void;
	updateApplicationCategory: (
		applicationKey: string,
		newCategoryID: ApplicationState
	) => void;
	setApplications: (applications: ApplicationJob[]) => void;
	reorderJobApplications: (
		job: ApplicationJob,
		oldJobIndex: number,
		newJobIndex: number
	) => void;
};

type Store = State & Actions;

const useApplicationStore = createReportableStore<Store>((set) => ({
	applications: applicationStateDefaultData,
	addNewApplication: (newApplication: ApplicationJob) =>
		set((store: Store) => ({
			...store,
			applications: [...store.applications, newApplication],
		})),
	addNewApplicationAtIndex: (newApplication: ApplicationJob, index: number) =>
		set((store: Store) => {
			const state = [...store.applications];
			state.splice(index, 0, newApplication);
			return {
				...store,
				applications: state,
			};
		}),
	removeApplication: (applicationKey: string) =>
		set((store: Store) => ({
			...store,
			applications: store.applications.filter(
				(app) => app.key !== applicationKey
			),
		})),
	updateApplication: (applicationKey: string, newApplication: ApplicationJob) =>
		set((store: Store) => ({
			...store,
			applications: store.applications.map((app) =>
				app.key === applicationKey ? newApplication : app
			),
		})),
	updateApplicationCategory: (
		applicationKey: string,
		newCategoryID: ApplicationState
	) =>
		set((store: Store) => ({
			...store,
			applications: store.applications.map((app) =>
				app.key === applicationKey ? { ...app, categoryID: newCategoryID } : app
			),
		})),
	setApplications: (applications: ApplicationJob[]) => set({ applications }),
	reorderJobApplications: (
		job: ApplicationJob,
		oldJobIndex: number,
		newJobIndex: number
	) =>
		set((store: Store) => {
			const items = [...store.applications];
			const [_reorderedItem] = items.splice(oldJobIndex, 1);
			items.splice(newJobIndex, 0, job);
			return { applications: items };
		}),
}));

export { useApplicationStore };
