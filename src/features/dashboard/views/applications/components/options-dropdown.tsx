import React from 'react';
import classNames from 'classnames';
import { DropdownMenu } from '@radix-ui/themes';

import type { ApplicationOptions } from '../types';
import styles from '../applications.module.scss';

import { useApplicationStore } from '@/store/z-store/application';
import { Text } from '@labs/components';
import OptionsIcon from '@labs/icons/dashboard/more-horizontal.svg';

export default function OptionsDropDown({
	id,
	options,
}: {
	id: string;
	options: ApplicationOptions[];
}) {
	const { updateApplicationCategory } = useApplicationStore();

	return (
		<DropdownMenu.Root>
			<DropdownMenu.Trigger>
				<div className="cursor-pointer mt-2 sm:mt-0 !h-4">
					<OptionsIcon />
				</div>
			</DropdownMenu.Trigger>
			<DropdownMenu.Content className={styles.optionsDropdown}>
				{options.map((data) => (
					<DropdownMenu.Item
						key={data.id}
						onClick={() => updateApplicationCategory(id, data.id)}
						className={classNames('group', styles.optionsDropdownItem)}
					>
						<div>{data.icon}</div>
						<Text as="span" color="#273643" size="sm" weight={500}>
							Move to {data.id}
						</Text>
					</DropdownMenu.Item>
				))}
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	);
}
