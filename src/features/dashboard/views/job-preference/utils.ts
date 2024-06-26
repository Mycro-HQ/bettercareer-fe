import Availability from './components/availability/availability';
import SearchPriority from './components/availability/search-priority';
import Compensation from './components/compensation/compensation';
import Qualifications from './components/qualifications/qualifications';
import TargetRole from './components/target-role';
import OpenToAllRoleLevel from './components/target-role/open-to-all-role-level';
import RoleLevel from './components/target-role/role-level';
import WorkEnvironment from './components/work-environment';
import CompanySize from './components/work-environment/company-size';
import OpenToAllCompanySize from './components/work-environment/open-to-all-company-size';

export const preferenceList = [
	{
		label: 'Target Role',
		component: [TargetRole, OpenToAllRoleLevel, RoleLevel],
	},
	{
		label: 'Work Environment',
		component: [WorkEnvironment, OpenToAllCompanySize, CompanySize],
	},
	{ label: 'Qualifications', component: [Qualifications] },
	{
		label: 'Availability',
		component: [Availability, SearchPriority],
	},
	{ label: 'Compensation', component: [Compensation] },
];

export const endpoints = [
	'role',
	'work-environment',
	'qualification',
	'availability',
	'compensation',
];

export type PreferenceDataType = {
	data: {
		targetRole: {
			roles: string[];
			roleLevels: string[];
			openToAllRoles: string;
		};
		workEnvironment: {
			companySize: string;
			openToAllCompanySizes: string;
			preferredIndustry: string[];
		};
		qualifications: {
			skills: string[];
		};
		availability: {
			jobStatus: string;
			workLocations: string[];
		};

		compensation: {
			minimumSalary: string;
			preferredCurrency: string;
		};
	};
	message: string;
};
