import { create } from 'zustand';

interface PreferenceStore {
	selectedTargetRoles: string[];
	handleClickedRoles: (role: string) => void;

	isUserOpenToAllRoleLevel: boolean | null;
	handleIsUserOpenToAllRoleLevel: (option: boolean) => void;

	selectedRoleLevel: string[];
	handleClickedRoleLevel: (roleLevel: string) => void;

	selectedWorkIndustry: string[];
	handleClickedWorkIndustry: (industry: string) => void;

	isUserOpenToAllCompanySize: boolean | null;
	handleIsUserOpenToAllCompanySize: (option: boolean) => void;

	selectedCompanySize: string[];
	handleClickedCompanySize: (companySize: string) => void;

	selectedQualifications: string[];
	handleSelectedQualification: (qualification: string) => void;

	selectedLocation: string;
	handleSelectedLocation: (location: string) => void;

	selectedPriority: string;
	handleSelectedPriority: (priority: string) => void;

	selectedCompensation: string;
	handleSelectedCompensation: (compensation: string) => void;
}

const initialState: PreferenceStore = {
	selectedTargetRoles: [],
	handleClickedRoles: () => {},
	isUserOpenToAllRoleLevel: null,
	handleIsUserOpenToAllRoleLevel: () => {},
	selectedRoleLevel: [],
	handleClickedRoleLevel: () => {},
	selectedWorkIndustry: [],
	handleClickedWorkIndustry: () => {},
	isUserOpenToAllCompanySize: null,
	handleIsUserOpenToAllCompanySize: () => {},
	selectedCompanySize: [],
	handleClickedCompanySize: () => {},
	selectedQualifications: [],
	handleSelectedQualification: () => {},
	selectedLocation: '',
	handleSelectedLocation: () => {},
	selectedPriority: '',
	handleSelectedPriority: () => {},
	selectedCompensation: '',
	handleSelectedCompensation: () => {},
};

const usePreferenceStore = create<PreferenceStore>((set) => ({
	...initialState,
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

	selectedCompanySize: [],
	handleClickedCompanySize: (companySize) => {
		set((state) => {
			if (state.selectedCompanySize.includes(companySize)) {
				return {
					selectedCompanySize: state.selectedCompanySize.filter(
						(item) => item !== companySize
					),
				};
			} else {
				return {
					selectedCompanySize: [...state.selectedCompanySize, companySize],
				};
			}
		});
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

	handleSelectedLocation: (location) => {
		set(() => ({ selectedLocation: location }));
	},

	handleSelectedPriority: (priority) => {
		set(() => ({ selectedPriority: priority }));
	},

	handleSelectedCompensation: (compensation) => {
		set(() => ({ selectedCompensation: compensation }));
	},
}));

export default usePreferenceStore;
