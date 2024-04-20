import React from 'react';

import type { ApplicationState, ApplicationJob } from '../types';

export function handleCategoryChange(
	from: string,
	to: ApplicationState,
	state: ApplicationJob[],
	setState: React.Dispatch<React.SetStateAction<ApplicationJob[]>>
) {
	const job = state.find((job) => job.id === from);
	if (job) {
		setState((prev) => {
			const newApplications = prev.filter(
				(application) => application.id !== from
			);
			const oldApplicationJobString = job.id.split('_')[1];
			job.id = to + '_' + oldApplicationJobString;
			return [...newApplications, job];
		});
	}
}

export const filterApplicationsByID = (
	appState: ApplicationJob[],
	id: string
) => appState.filter((application) => application.id.startsWith(id));
