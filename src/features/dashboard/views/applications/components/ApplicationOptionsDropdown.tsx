import React from 'react';
import classNames from 'classnames';
import { DropdownMenu } from '@radix-ui/themes';

import type { ApplicationOptions } from '../types';
import { handleCategoryChange } from '../utils';
import { ApplicationStateContext } from '../applications';
import styles from '../applications.module.scss';

import { Text } from '@labs/components';
import OptionsIcon from '@labs/icons/dashboard/more-horizontal.svg';

export default function OptionsDropDown({
	id,
	options,
}: {
	id: string;
	options: ApplicationOptions[];
}) {
	const { applicationState, setApplicationState } = React.useContext(
		ApplicationStateContext
	);
	return (
		<DropdownMenu.Root>
			<DropdownMenu.Trigger>
				<div className="cursor-pointer mt-2 sm:mt-0">
					<OptionsIcon />
				</div>
			</DropdownMenu.Trigger>
			<DropdownMenu.Content className={styles.optionsDropdown}>
				{options.map((data) => (
					<DropdownMenu.Item
						key={data.id}
						onClick={() =>
							handleCategoryChange(
								id,
								data.id,
								applicationState,
								setApplicationState
							)
						}
						className={classNames('group', styles.optionsDropdownItem)}
					>
						<div className="group-hover:[&>svg>path]:stroke-white">
							{data.icon}
						</div>
						<Text
							as="span"
							color="#273643"
							size="sm"
							weight={500}
							className="group-hover:text-white"
						>
							Move to {data.id}
						</Text>
					</DropdownMenu.Item>
				))}
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	);
}
