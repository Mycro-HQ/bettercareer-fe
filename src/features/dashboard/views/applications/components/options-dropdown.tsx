import React from 'react';
import classNames from 'classnames';
import { DropdownMenu } from '@radix-ui/themes';
// import { useRouter } from 'next/router';
import { useQueryClient } from '@tanstack/react-query';

import type { ApplicationOptions } from '../types';
import styles from '../applications.module.scss';

// import { useApplicationStore } from '@/store/z-store/application';
import { Text } from '@labs/components';
import OptionsIcon from '@labs/icons/dashboard/more-horizontal.svg';
import { Spinner, useFeedback } from '@labs/components';
import { useUpdateJobStatusMutation } from '@/queries/job';

export default function OptionsDropDown({
	id,
	options,
}: {
	id: string;
	options: ApplicationOptions[];
}) {
	const { createToast } = useFeedback();
	// const router = useRouter();
	// const { updateApplicationCategory } = useApplicationStore();
	const queryClient = useQueryClient();

	const { mutateAsync: updateJobStatus, isPending: isLoading } =
		useUpdateJobStatusMutation();

	const handleChoice = async (status: string) => {
		try {
			await updateJobStatus({ id, status });
			queryClient.refetchQueries({ queryKey: ['user-jobs'] });
		} catch (error) {
			const err = error as any;
			createToast({
				message: err?.message || 'An error occurred, please try again!',
				variant: 'error',
			});
		}
	};

	return (
		<>
			{isLoading && <Spinner fullPage text="Loading…" />}
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
							onClick={() => handleChoice(data.id.toLowerCase())}
							// onClick={() => updateApplicationCategory(id, data.id)}
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
		</>
	);
}
