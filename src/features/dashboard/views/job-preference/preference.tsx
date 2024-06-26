import React from 'react';

import { CallToAction, Flex, Modal, useToast } from '@labs/components';
import {
	useGetUserPreferenceQuery,
	useSetUserPreferenceMutation,
} from '@/queries/user';

import styles from './preference.module.scss';
import { Sidebar } from './sidebar/sidebar';
import { endpoints, preferenceList } from './utils';
import usePreferenceStore from './store/preference-store';

export const JobPreference = ({
	setIsModalOpen,
}: {
	setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	const [activeTab, setActiveTab] = React.useState(0);
	const [activeComponentIndex, setActiveComponentIndex] = React.useState(0);
	const [isButtonDisabled, setIsButtonDisabled] = React.useState(false);
	const store = usePreferenceStore((state) => state);
	const { createToast } = useToast();
	const { mutateAsync: setUserPreference, isPending } =
		useSetUserPreferenceMutation();
	const { data: userPreference } = useGetUserPreferenceQuery({});

	const handleSelectionChange = (isSelectionMade: boolean) => {
		setIsButtonDisabled(!isSelectionMade);
	};

	const JumpToTab = (tab: number) => {
		setActiveTab(tab);
		setActiveComponentIndex(0);
	};

	const handleTabChange = () => {
		if (activeComponentIndex < preferenceList[activeTab].component.length - 1) {
			setActiveComponentIndex((prev) => prev + 1);
		} else {
			handleAllTabsComplete();
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

	const handleAllTabsComplete = async () => {
		const data = [
			{
				roles: store.selectedTargetRoles,
				roleLevels: store.selectedRoleLevel,
				openToAllRoles: store.isUserOpenToAllRoleLevel === true ? 'yes' : 'no',
			},
			{
				preferredIndustry: store.selectedWorkIndustry,
				openToAllCompanySizes:
					store.isUserOpenToAllCompanySize === true ? 'yes' : 'no',
				companySize: store.selectedCompanySize,
			},
			{
				skills: store.selectedQualifications,
			},
			{
				workLocations: store.selectedLocation,
				jobStatus: store.selectedPriority,
			},
			{
				preferredCurrency: store.preferredCurrency,
				minimumSalary: store.minimumSalary.toString(),
			},
		];
		try {
			await setUserPreference({
				type: endpoints[activeTab],
				data: data[activeTab],
			});
			if (activeTab === preferenceList.length - 1) {
				store.resetAllState();
				setIsModalOpen(false);
			} else {
				setActiveTab((prev) => prev + 1);
				setActiveComponentIndex(0);
			}
		} catch (error: any) {
			console.error('Error:', error);
			return createToast({
				message: error?.message ?? 'An error occurred, please try again',
				variant: 'error',
			});
		}
	};

	const activeTabObject = preferenceList[activeTab];
	const ActiveComponent = activeTabObject.component[activeComponentIndex];

	return (
		<Modal in={true} onClose={() => setIsModalOpen(false)} size="lg">
			<Modal.Body noPadding={true}>
				<Flex className={styles.JobPreference}>
					<aside className={styles.JobPreferenceAside}>
						<Sidebar currentIndex={activeTab} jumpToTab={JumpToTab} />
					</aside>

					<Flex.Column className={styles.JobPreferenceContent}>
						<Flex.Column className={styles.JobPreferenceContentBody}>
							<ActiveComponent
								userPreference={userPreference}
								handleSelectionChange={handleSelectionChange}
							/>
						</Flex.Column>
					</Flex.Column>
				</Flex>
			</Modal.Body>

			<Modal.Footer className={styles.ModalFooter}>
				{activeTab > 0 || (activeTab === 0 && activeComponentIndex > 0) ? (
					<CallToAction outline onClick={handleBackButtonClick}>
						Back
					</CallToAction>
				) : null}
				<CallToAction
					isLoading={isPending}
					disabled={isButtonDisabled}
					onClick={handleTabChange}
				>
					{activeTab === preferenceList.length - 1 &&
					activeComponentIndex ===
						preferenceList[activeTab].component.length - 1
						? 'Finish'
						: 'Next'}
				</CallToAction>
			</Modal.Footer>
		</Modal>
	);
};
