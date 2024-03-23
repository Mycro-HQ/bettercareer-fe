import { CallToAction, Flex, Text } from '@labs/components';
import React from 'react';
import AddIcon from '@labs/icons/misc/add.svg';

interface IEmptyStateContainer {
	buttonText: string;
	text: string;
	onClick: () => void;
}

const EmptyStateContainer: React.FC<IEmptyStateContainer> = ({
	buttonText,
	text,
	onClick,
}) => {
	return (
		<Flex.Column
			alignItems="center"
			justifyContent="space-between"
			className="bg-neutral-50 py-10"
		>
			<Text.p className="">{text}</Text.p>

			<CallToAction.button
				outline
				size="xs"
				leadingIcon={<AddIcon />}
				onClick={onClick}
				className="mt-5 bg-white"
			>
				{buttonText}
			</CallToAction.button>
		</Flex.Column>
	);
};

export default EmptyStateContainer;
