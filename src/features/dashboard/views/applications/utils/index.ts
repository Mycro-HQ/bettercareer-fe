import type { ApplicationState } from '../types';

import { UserJobData } from '@/queries/types/job';

export const filterApplicationsByID = (
	appState: UserJobData[],
	categoryID: ApplicationState
) =>
	appState.filter(
		(application) => application.status === categoryID.toLowerCase()
	);
