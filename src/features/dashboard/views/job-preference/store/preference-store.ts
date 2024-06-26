import { createReportableStore } from '@/store/middleware/report';

interface PreferenceStore {
	selectedTargetRoles: string[];
	setSelectedTargetRoles: (roles: string[]) => void;
	handleClickedRoles: (role: string) => void;

	isUserOpenToAllRoleLevel: boolean | null;
	handleIsUserOpenToAllRoleLevel: (option: boolean) => void;

	selectedRoleLevel: string[];
	setSelectedRoleLevel: (roleLevel: string[]) => void;
	handleClickedRoleLevel: (roleLevel: string) => void;

	selectedWorkIndustry: string[];
	setSelectedWorkIndustry: (industry: string[]) => void;
	handleClickedWorkIndustry: (industry: string) => void;

	isUserOpenToAllCompanySize: boolean | null;
	handleIsUserOpenToAllCompanySize: (option: boolean) => void;

	selectedCompanySize: string;
	handleClickedCompanySize: (companySize: string) => void;

	selectedQualifications: string[];
	setSelectedQualifications: (qualification: string[]) => void;
	handleSelectedQualification: (qualification: string) => void;

	selectedLocation: string[];
	setSelectedLocation: (location: string[]) => void;
	handleSelectedLocation: (location: string) => void;

	selectedPriority: string;
	handleSelectedPriority: (priority: string) => void;

	minimumSalary: number;
	setMinimumSalary: (salary: number) => void;

	preferredCurrency: string;
	setPreferredCurrency: (currency: string) => void;

	resetAllState: () => void;
}

const initialState = {
	selectedTargetRoles: [],
	isUserOpenToAllRoleLevel: null,
	selectedRoleLevel: [],
	selectedWorkIndustry: [],
	isUserOpenToAllCompanySize: null,
	selectedCompanySize: '',
	selectedQualifications: [],
	selectedLocation: [],
	selectedPriority: '',
	minimumSalary: 0,
	preferredCurrency: 'USD',
};

const usePreferenceStore = createReportableStore<PreferenceStore>((set) => ({
	...initialState,

	setSelectedTargetRoles: (roles) => {
		set({ selectedTargetRoles: roles });
	},
	handleClickedRoles: (role) => {
		set((state) => {
			if (state.selectedTargetRoles.includes(role)) {
				return {
					selectedTargetRoles: state.selectedTargetRoles.filter(
						(item) => item !== role
					),
				};
			} else {
				return {
					selectedTargetRoles: [...state.selectedTargetRoles, role],
				};
			}
		});
	},

	handleIsUserOpenToAllRoleLevel: (option) => {
		set({ isUserOpenToAllRoleLevel: option });
	},

	setSelectedRoleLevel: (roleLevel) => {
		set({ selectedRoleLevel: roleLevel });
	},
	handleClickedRoleLevel: (roleLevel) => {
		set((state) => {
			if (state.selectedRoleLevel.includes(roleLevel)) {
				return {
					selectedRoleLevel: state.selectedRoleLevel.filter(
						(item) => item !== roleLevel
					),
				};
			} else {
				return {
					selectedRoleLevel: [...state.selectedRoleLevel, roleLevel],
				};
			}
		});
	},

	setSelectedWorkIndustry: (industry) => {
		set({ selectedWorkIndustry: industry });
	},
	handleClickedWorkIndustry: (industry) => {
		set((state) => {
			if (state.selectedWorkIndustry.includes(industry)) {
				return {
					selectedWorkIndustry: state.selectedWorkIndustry.filter(
						(item) => item !== industry
					),
				};
			} else {
				return {
					selectedWorkIndustry: [...state.selectedWorkIndustry, industry],
				};
			}
		});
	},

	handleIsUserOpenToAllCompanySize: (option) => {
		set({ isUserOpenToAllCompanySize: option });
	},

	handleClickedCompanySize: (companySize) => {
		set(() => ({ selectedCompanySize: companySize }));
	},

	setSelectedQualifications: (qualification) => {
		set({ selectedQualifications: qualification });
	},
	handleSelectedQualification: (qualification) => {
		set((state) => {
			if (state.selectedQualifications.includes(qualification)) {
				return {
					selectedQualifications: state.selectedQualifications.filter(
						(item) => item !== qualification
					),
				};
			} else {
				return {
					selectedQualifications: [
						...state.selectedQualifications,
						qualification,
					],
				};
			}
		});
	},

	setSelectedLocation: (location) => {
		set({ selectedLocation: location });
	},
	handleSelectedLocation: (location) => {
		set((state) => {
			if (state.selectedLocation.includes(location)) {
				return {
					selectedLocation: state.selectedLocation.filter(
						(item) => item !== location
					),
				};
			} else {
				return {
					selectedLocation: [...state.selectedLocation, location],
				};
			}
		});
	},

	handleSelectedPriority: (priority) => {
		set(() => ({ selectedPriority: priority }));
	},

	setMinimumSalary: (salary) => {
		set(() => ({ minimumSalary: salary }));
	},

	setPreferredCurrency: (currency) => {
		set(() => ({ preferredCurrency: currency }));
	},

	resetAllState: () => {
		set(() => ({
			...initialState,
		}));
	},
}));

export default usePreferenceStore;
