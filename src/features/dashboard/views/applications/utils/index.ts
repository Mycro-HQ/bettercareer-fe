import type { ApplicationState, ApplicationJob } from '../types';

export const filterApplicationsByID = (
	appState: ApplicationJob[],
	categoryID: ApplicationState
) => appState.filter((application) => application.categoryID === categoryID);

export const reorderJobApplications = (
	allJobs: ApplicationJob[],
	job: ApplicationJob,
	oldJobIndex: number,
	newJobIndex: number
) => {
	const items = [...allJobs];
	const [_reorderedItem] = items.splice(oldJobIndex, 1);
	items.splice(newJobIndex, 0, job);
	return items;
};
