import { Flex, Input } from '@labs/components';
import React from 'react';

const Heading = () => {
	return (
		<Flex.Column>
			<Input
				label={{
					text: 'Name',
					align: 'top',
				}}
				placeholder="Name"
			/>
			<Input
				label={{
					text: 'Email',
					align: 'top',
				}}
				type="email"
				placeholder="Email"
			/>
		</Flex.Column>
	);
};

export default Heading;
