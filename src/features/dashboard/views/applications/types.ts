export type ApplicationJob = {
	key: string;
	categoryID: ApplicationState;
	icon: any;
	title: string;
	company: string;
	location: string;
	workMode: 'Remote' | 'Onsite' | 'Hybrid';
};

export type ApplicationState =
	| 'Applied'
	| 'Interviewed'
	| 'Offered'
	| 'Archived';

export type ApplicationOptions = {
	id: ApplicationState;
	icon: React.JSX.Element;
};

export type ApplicationContext = {
	applicationState: ApplicationJob[];
	setApplicationState: React.Dispatch<React.SetStateAction<ApplicationJob[]>>;
};
