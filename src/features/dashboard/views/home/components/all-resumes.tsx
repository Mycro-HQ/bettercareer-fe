import { formatDate } from 'date-fns';
import Link from 'next/link';

import {
	CallToAction,
	Flex,
	Heading,
	Text,
	useFeedback,
} from '@labs/components';
import FileIcon from '@labs/icons/dashboard/file.svg';
import { useDeleteResumeMutation, useGetResumesQuery } from '@/queries/resume';
import { getDataIcons, truncateText } from '@labs/utils';

import FetchContainer from '@/components/misc/fetch-container';
import { DropdownMenu } from '@radix-ui/themes';
import { useRouter } from 'next/router';

import styles from '../home.module.scss';

export const AllResumes = ({
	limit,
	hasAdd,
}: {
	limit: number;
	hasAdd?: boolean;
}) => {
	const { data: resumes, isPending } = useGetResumesQuery({
		limit: limit || 20,
	});
	const { createDisclosure, createToast } = useFeedback();
	const { mutateAsync: deleteResume } = useDeleteResumeMutation();

	const router = useRouter();

	const handleDelete = async (id: string) => {
		await createDisclosure({
			message: 'Are you sure you want to delete this resume?',
			title: 'Delete Resume',
		});
		try {
			await deleteResume(id);
			router.reload();
		} catch (error) {
			createToast({
				message: 'An error occurred while deleting the resume',
				variant: 'error',
			});
		}
	};

	return (
		<FetchContainer
			isLoading={isPending}
			shouldBeEmpty={resumes?.data?.length === 0}
			emptyMessage="You have any resumes yet."
			emptyActions={
				<CallToAction.a size="sm" href="/dashboard/resume/build">
					Create a new resume
				</CallToAction.a>
			}
		>
			{resumes?.data?.length > 0 && (
				<>
					<Flex fullWidth gap={32} flexWrap="wrap">
						{hasAdd && (
							<Link
								href="/dashboard/resume/build"
								className={styles.PastResumeAdd}
							>
								<img src={getDataIcons('add')} />
								Add New Resume
							</Link>
						)}

						{resumes?.data?.map((resume: any) => (
							<Link
								href={`/dashboard/resume/b/${resume.id}`}
								key={resume.id}
								className={styles.PastResume}
							>
								<img
									src={resume?.thumbnail || '/images/dashboard/thumbnail.png'}
									className={styles.PastResumeThumbnail}
									alt={resume.name}
								/>
								<DropdownMenu.Root>
									<DropdownMenu.Trigger onClick={(e) => e.stopPropagation()}>
										<img
											src={getDataIcons('more')}
											className={styles.PastResumeMore}
										/>
									</DropdownMenu.Trigger>
									<DropdownMenu.Content>
										<DropdownMenu.Item>
											<Link href={`/dashboard/resume/b/${resume.id}`}>
												Edit Resume
											</Link>
										</DropdownMenu.Item>
										<DropdownMenu.Item>Set as default</DropdownMenu.Item>
										<DropdownMenu.Item
											onClick={(e) => {
												e.stopPropagation();
												handleDelete(resume.id!);
											}}
										>
											Delete
										</DropdownMenu.Item>
									</DropdownMenu.Content>
								</DropdownMenu.Root>
								<Flex gap={12} className={styles.PastResumeWrapper}>
									<div className={styles.PastResumeInfo}>
										<Heading.h6 weight={800} fontSize="16px">
											{truncateText(resume.name, 36)}
										</Heading.h6>
										<Flex gap={2} alignItems="center">
											<FileIcon />
											<Text size="sm" color="var(--text-gray-light)">
												Opened{' '}
												{formatDate(
													new Date(resume.updatedAt),
													'MMM dd, yyyy | p'
												)}
											</Text>
										</Flex>
									</div>
								</Flex>
							</Link>
						))}
					</Flex>
				</>
			)}
		</FetchContainer>
	);
};
