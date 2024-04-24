import React from 'react';
import classNames from 'classnames';

import { CallToAction, Flex, Modal } from '@labs/components';

import styles from './preference.module.scss';
import { Sidebar } from './sidebar/sidebar';
import TargetRole from './components/target-role';
import OpenToAllRoleLevel from './components/target-role/open-to-all-role-level';
import RoleLevel from './components/target-role/role-level';
import WorkEnvironment from './components/work-environment';
import OpenToAllCompanySize from './components/work-environment/open-to-all-company-size';
import CompanySize from './components/work-environment/company-size';

const preferenceList = [
	{
		label: 'Target Role',
		component: [
			<TargetRole key={0} />,
			<OpenToAllRoleLevel key={1} />,
			<RoleLevel key={2} />,
		],
	},
	{
		label: 'Work Environment',
		component: [
			<WorkEnvironment key={0} />,
			<OpenToAllCompanySize key={1} />,
			<CompanySize key={2} />,
		],
	},
	{ label: 'Qualifications', component: [<div key={0}>Qualifications</div>] },
	{ label: 'Availability', component: [<div key={0}>Availability</div>] },
	{ label: 'Compensation', component: [<div key={0}>Compensation</div>] },
];

export const JobPreference = ({
	setIsModalOpen,
}: {
	setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	const [activeTab, setActiveTab] = React.useState(0);
	const [activeComponentIndex, setActiveComponentIndex] = React.useState(0);

	const handleTabChange = () => {
		if (activeComponentIndex < preferenceList[activeTab].component.length - 1) {
			setActiveComponentIndex((prev) => prev + 1);
		} else if (activeTab < preferenceList.length - 1) {
			setActiveTab((prev) => prev + 1);
			setActiveComponentIndex(0);
		} else {
			console.log('done!');
		}
	};

	const handleBackButtonClick = () => {
		if (activeComponentIndex > 0) {
			setActiveComponentIndex((prev) => prev - 1);
		} else if (activeTab > 0) {
			setActiveTab((prev) => prev - 1);
			const previousTabComponents = preferenceList[activeTab - 1].component;
			setActiveComponentIndex(previousTabComponents.length - 1);
		}
	};

	return (
		<Modal
			centered={true}
			in={true}
			onClose={() => setIsModalOpen(false)}
			size="lg"
			maxHeight={true}
		>
			<Modal.Body noPadding={true}>
				<Flex className={styles.JobPreference}>
					<aside className={styles.JobPreferenceAside}>
						<Sidebar currentIndex={activeTab} preferenceList={preferenceList} />
					</aside>
					<Flex.Column className={styles.JobPreferenceContent}>
						{preferenceList.map((pref, index) => (
							<Flex.Column
								key={index}
								className={classNames([
									styles.JobPreferenceContentMain,
									styles[`JobPreferenceContentMain--${index === activeTab}`],
								])}
							>
								<Flex.Column className={styles.JobPreferenceContentBody}>
									{pref.component[activeComponentIndex]}
								</Flex.Column>
							</Flex.Column>
						))}
					</Flex.Column>
				</Flex>
			</Modal.Body>

			<Modal.Footer
				style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}
			>
				{activeTab > 0 || (activeTab === 0 && activeComponentIndex > 0) ? (
					<CallToAction outline onClick={handleBackButtonClick}>
						Back
					</CallToAction>
				) : (
					<></>
				)}
				<CallToAction onClick={handleTabChange}>Next</CallToAction>
			</Modal.Footer>
		</Modal>
	);
};
