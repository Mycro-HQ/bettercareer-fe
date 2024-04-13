export interface UserData {
	id: string;
	name: string;
	photo: string;
	email: string;
	suspended: boolean;
	deleted: boolean;
	verified: boolean;
	session: Record<string, unknown>;
	onboardingChecklist: {
		hasBuiltResume: boolean;
		hasJobPreferences: boolean;
		hasUploadedResume: boolean;
		hasConnectedAccount: boolean;
	};
	languages: string[];
	links: Record<string, string>;
	createdAt: string;
	updatedAt: string;
}
