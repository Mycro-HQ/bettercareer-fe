import React from 'react';
import EmptyStateContainer from './empty-state-container';

const projects = () => {
	return (
		<div>
			<EmptyStateContainer
				text="Add a project: Share your accomplishments and impress potential employers."
				buttonText="Add Project"
				onClick={() => {}}
			/>
		</div>
	);
};

export default projects;
