export interface JobResponseData {
	id: string;
	company: string;
	title: string;
	description: string;
	url: string;
	logo: string | null;
	location: string | null;
	compensation: string | null;
	requirements: string | null;
	tags: string | null;
	archived: boolean;
	createdAt: string;
	updatedAt: string;
}

export interface UserJobData {
	id: string;
	status: string;
	job: Pick<
		JobResponseData,
		| 'company'
		| 'title'
		| 'location'
		| 'compensation'
		| 'logo'
		| 'description'
		| 'requirements'
	>;

	createdAt: string;
	updatedAt: string;
}

export interface JobsStatData {
	jobsThisWeek: number;
	sponsoredJobs: number;
	jobsByResume: number;
	jobsByBestMatch: number;
}
