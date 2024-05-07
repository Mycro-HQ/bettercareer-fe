import React from 'react';
import classNames from 'classnames';

import ExternalLinkIcon from '@labs/icons/dashboard/external.svg';
import { Flex, Heading } from '@labs/components';

import styles from './stack-card.module.scss';

interface StackCardProps {
	title: string;
	icon: React.ReactNode;
	color?: 'orange' | 'purple';
	tag?: string;
	onClick?: () => void;
	href?: string;
}

/**
 * StackCard component
 * @description
 * A component for rendering a stack card.
 *
 * @param title - The title of the stack card.
 * @param icon - The icon of the stack card.
 * @param color - The color of the stack card.
 * @param onClick - The onClick handler for the stack card.
 *
 * @returns {React.ReactNode} - The rendered component.
 *
 * @example
 * <StackCard
 *  title="Build Profile"
 *  icon="build-profile"
 *  color="blue"
 *  onClick={() => console.log('Clicked')}
 * />
 */
export const StackCard: React.FC<StackCardProps> = ({
	title,
	icon,
	color = 'purple',
	onClick,
	...props
}) => {
	const Wrapper = props.href ? 'a' : 'div';
	return (
		<Wrapper
			className={classNames([styles.StackCard, styles[`StackCard--${color}`]])}
			onClick={onClick}
			{...props}
		>
			{props.href ? <ExternalLinkIcon /> : null}
			<div className={classNames([styles.StackCard__icon])}>{icon}</div>
			<Flex
				gap={8}
				justifyContent="space-between"
				flexWrap="wrap"
				alignItems="flex-end"
			>
				<Heading.h6 weight={800}>{title}</Heading.h6>
				<div className={styles.StackCard__tag}>{props.tag}</div>
			</Flex>
		</Wrapper>
	);
};
