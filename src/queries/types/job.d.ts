export interface JobResponseData {
	id: string;
	company: string;
	title: string;
	description: string;
	url: string;
	logo: string | null;
	location: string | null;
	compensation: string | null;
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
		'company' | 'title' | 'location' | 'compensation' | 'logo' | 'description'
	>;

	// company: true,
	// title: true,
	// location: true,
	// compensation: true,
	// logo: true,
	// description: true,

	createdAt: string;
	updatedAt: string;
}
