import React from 'react';
import classNames from 'classnames';

import { CallToAction, Flex } from '@labs/components';

import styles from './preference.module.scss';
import { Sidebar } from './sidebar/sidebar';
import { Availability, Compensation, Qualifications } from './components';

export const JobPreference = () => {
	const [activeTab, setActiveTab] = React.useState(0);

	const handlePreviousTab = (index: number) => {
		if (index > 0) {
			setActiveTab((prev) => prev - 1);
		}
	};

	const handleNextTab = (index: number) => {
		if (index < preferenceList.length - 1) {
			// check for valid responses before proceeding
			setActiveTab((prev) => prev + 1);
		} else {
			// submit logic goes here
			console.log('done!');
		}
	};

	const preferenceList = [
		{ label: 'Target Role', component: <div>Target Role</div> },
		{ label: 'Work Environment', component: <div>Work Environment</div> },
		{ label: 'Qualifications', component: <Qualifications /> },
		{ label: 'Availability', component: <Availability /> },
		{ label: 'Compensation', component: <Compensation /> },
	];

	return (
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
							{pref.component}
						</Flex.Column>
						<Flex gap={10} className={styles.JobPreferenceContentFooter}>
							{activeTab > 0 && (
								<CallToAction outline onClick={() => handlePreviousTab(index)}>
									Back
								</CallToAction>
							)}
							<CallToAction onClick={() => handleNextTab(index)}>
								Next
							</CallToAction>
						</Flex>
					</Flex.Column>
				))}
			</Flex.Column>
		</Flex>
	);
};
