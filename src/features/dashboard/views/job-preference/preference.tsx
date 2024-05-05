import React from 'react';

import { CallToAction, Flex, Modal } from '@labs/components';

import styles from './preference.module.scss';
import { Sidebar } from './sidebar/sidebar';
import { preferenceList } from './utils';

export const JobPreference = ({
	setIsModalOpen,
}: {
	setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	const [activeTab, setActiveTab] = React.useState(0);
	const [activeComponentIndex, setActiveComponentIndex] = React.useState(0);
	const [isButtonDisabled, setIsButtonDisabled] = React.useState(false);

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
		} else if (activeTab < preferenceList.length - 1) {
			setActiveTab((prev) => prev + 1);
			setActiveComponentIndex(0);
		} else {
			setIsModalOpen(false);
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

	const activeTabObject = preferenceList[activeTab];
	const ActiveComponent = activeTabObject.component[activeComponentIndex];

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
						<Sidebar
							currentIndex={activeTab}
							preferenceList={preferenceList}
							jumpToTab={JumpToTab}
						/>
					</aside>

					<Flex.Column className={styles.JobPreferenceContent}>
						<Flex.Column className={styles.JobPreferenceContentBody}>
							<ActiveComponent handleSelectionChange={handleSelectionChange} />
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
				<CallToAction disabled={isButtonDisabled} onClick={handleTabChange}>
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
