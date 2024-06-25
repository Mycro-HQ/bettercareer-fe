import React from 'react';
import classNames from 'classnames';
import { DropdownMenu } from '@radix-ui/themes';
import { useQueryClient } from '@tanstack/react-query';

import type { ApplicationOptions } from '../types';
import { applicationData } from '../data';
import styles from '../applications.module.scss';

import { Flex, Text, useFeedback } from '@labs/components';
import DownIcon from '@labs/icons/dashboard/down.svg';
import { UserJobData } from '@/queries/types/job';
import { useUpdateJobStatusMutation } from '@/queries/job';

export default function ApplicationModal({
	options,
	userJob,
}: {
	options: ApplicationOptions[];
	userJob: UserJobData;
}) {
	const { createToast } = useFeedback();
	const queryClient = useQueryClient();

	const { mutateAsync: updateJobStatus, isPending: isLoading } =
		useUpdateJobStatusMutation();

	const handleChoice = async (status: string) => {
		if (isLoading) return;
		try {
			await updateJobStatus({ id: userJob.id, status });
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
		<Flex.Column gap={40}>
			<Flex.Row justifyContent="space-between">
				<Flex.Row gap={18}>
					{userJob.job.logo}
					<Flex.Column gap={4} className="font-[Figtree]">
						<Text as="span" weight={600} fontSize="18px" inheritFont>
							{userJob.job.title}
						</Text>
						<Text
							color="var(--text-gray)"
							weight={500}
							lineHeight="24px"
							inheritFont
						>
							{userJob.job.company} . {userJob.job.location} .{' '}
							{userJob.job.compensation}
						</Text>
					</Flex.Column>
				</Flex.Row>
				<DropdownMenu.Root>
					<DropdownMenu.Trigger>
						<Flex.Row
							gap={8}
							className="items-center cursor-pointer mt-2 sm:mt-0 my-2"
						>
							<Text>
								{isLoading
									? 'loading ...'
									: `${userJob.status.charAt(0).toUpperCase() + userJob.status.slice(1)}`}
							</Text>
							<DownIcon />
						</Flex.Row>
					</DropdownMenu.Trigger>
					<DropdownMenu.Content
						className={classNames('z-[1200]', styles.optionsDropdown)}
					>
						{options.map((data) => (
							<DropdownMenu.Item
								key={data.id}
								onClick={() => handleChoice(data.id.toLowerCase())}
								// onClick={() => updateApplicationCategory(id, data.id)}
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
			</Flex.Row>
			<Flex.Column gap={32}>
				<div>
					<Text as="span" weight={600} className="mb-3">
						Summary
					</Text>
					<div className="text-sm font-medium leading-5 text-[#273643]">
						{userJob.job.description}
					</div>
				</div>
				<div>
					<Text as="span" weight={600} className="mb-3">
						Requirements
					</Text>
					<div className="text-sm font-medium leading-5 text-[#273643]">
						<ul className="list-disc list-inside">
							{applicationData.requirementsArray.map((req) => (
								<li key={req.key} className="mb-4">
									{req.requirement}
								</li>
							))}
						</ul>
					</div>
				</div>
			</Flex.Column>
		</Flex.Column>
	);
}
