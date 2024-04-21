import React from 'react';

import { CallToAction, Flex } from '@labs/components';

import styles from './preference.module.scss';
import { Sidebar } from './sidebar/sidebar';

const preferenceList = [
	{ label: 'Target Role', component: <div></div>, done: true },
	{ label: 'Work Environment', component: <div></div>, done: false },
	{ label: 'Qualifications', component: <div></div>, done: false },
	{ label: 'Availability', component: <div></div>, done: false },
	{ label: 'Compensation', component: <div></div>, done: false },
];

export const JobPreference = () => {
	return (
		<Flex className={styles.JobPreference}>
			<aside className={styles.JobPreferenceAside}>
				<Sidebar preferenceList={preferenceList} />
			</aside>
			<Flex.Column className={styles.JobPreferenceContent}>
				<Flex.Column className={styles.JobPreferenceContentBody}></Flex.Column>
				<Flex alignItems="center" className={styles.JobPreferenceContentFooter}>
					<CallToAction disabled>Next</CallToAction>
				</Flex>
			</Flex.Column>
		</Flex>
	);
};
