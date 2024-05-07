import type { ApplicationState, ApplicationJob } from '../types';

export const filterApplicationsByID = (
	appState: ApplicationJob[],
	categoryID: ApplicationState
) => appState.filter((application) => application.categoryID === categoryID);
