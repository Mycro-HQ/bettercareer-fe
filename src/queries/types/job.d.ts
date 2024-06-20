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
