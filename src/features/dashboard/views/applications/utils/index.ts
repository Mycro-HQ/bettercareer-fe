import React from 'react';

import type { ApplicationState, ApplicationJob } from '../types';

export function handleCategoryChange(
	key: string,
	newCategoryID: ApplicationState,
	state: ApplicationJob[],
	setState: React.Dispatch<React.SetStateAction<ApplicationJob[]>>
) {
	const job = state.find((job) => job.key === key);
	if (job) {
		setState((prev) => {
			const newApplications = prev.filter(
				(application) => application.key !== key
			);
			const newJob = { ...job, categoryID: newCategoryID };
			return [...newApplications, newJob];
		});
	}
}

export const filterApplicationsByID = (
	appState: ApplicationJob[],
	categoryID: ApplicationState
) => appState.filter((application) => application.categoryID === categoryID);
