import React from 'react';
import classNames from 'classnames';

import { CallToAction, Flex } from '@labs/components';

import styles from './preference.module.scss';
import { Sidebar } from './sidebar/sidebar';

const preferenceList = [
	{ label: 'Target Role', component: <div>Target Role</div> },
	{ label: 'Work Environment', component: <div>Work Environment</div> },
	{ label: 'Qualifications', component: <div>Qualifications</div> },
	{ label: 'Availability', component: <div>Availability</div> },
	{ label: 'Compensation', component: <div>Compensation</div> },
];

export const JobPreference = () => {
	const [activeTab, setActiveTab] = React.useState(0);

	const handleTabChange = (index: number) => {
		if (index < preferenceList.length - 1) {
			// check for valid responses before proceeding
			setActiveTab((prev) => prev + 1);
		} else {
			// submit logic goes here
			console.log('done!');
		}
	};

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
						<Flex className={styles.JobPreferenceContentFooter}>
							<CallToAction onClick={() => handleTabChange(index)}>
								Next
							</CallToAction>
						</Flex>
					</Flex.Column>
				))}
			</Flex.Column>
		</Flex>
	);
};
