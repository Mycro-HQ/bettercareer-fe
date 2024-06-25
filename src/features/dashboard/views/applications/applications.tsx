import React from 'react';
import {
	DragDropContext,
	DropResult,
	ResponderProvided,
} from 'react-beautiful-dnd';
import classNames from 'classnames';

import SearchIcon from '@labs/icons/dashboard/search.svg';
import BriefcaseIcon from '@labs/icons/dashboard/briefcase.svg';
import { Flex, Heading, Spinner, Text, useFeedback } from '@labs/components';
import { useGetUserJobsQuery, useUpdateJobStatusMutation } from '@/queries/job';

import ApplicationsGridColumn from './components/grid-column';
import { applicationsOptions } from './data';
import styles from './applications.module.scss';

export const Applications = () => {
	return (
		<>
			<Header />
			<ApplicationsGrid />
		</>
	);
};

function Header() {
	const [searchState, setSearchState] = React.useState<string>('');
	function searchApplications() {
		// Implement application search here
	}
	return (
		<Flex
			alignItems="center"
			justifyContent="space-between"
			className="flex-col mb-4 min-[900px]:flex-row"
		>
			<Flex.Column gap={6}>
				<Flex alignItems="center" gap={14}>
					<Heading.h3 weight={400} animate="slide">
						Applications
					</Heading.h3>
					<BriefcaseIcon />
				</Flex>

				<Text color="var(--text-gray)" animate="fade" className="mb-9">
					Start your application journey here - explore, apply, and get started
				</Text>
			</Flex.Column>
			<div
				className={classNames(
					styles.searchInputContainer,
					'bg-white rounded-2xl py-[14px] px-6'
				)}
			>
				<label htmlFor="searchApplications" className="hidden">
					Search Applications...
				</label>
				<input
					id="searchApplications"
					name="searchApplications"
					type="text"
					className="outline-none mr-4 md:mr-6 xl:mr-12"
					placeholder="Search applications..."
					value={searchState}
					onChange={(e) => setSearchState(e.target.value)}
				/>
				<button
					className="bg-[#1286f3] p-3 rounded-xl"
					title="Search"
					type="button"
					onClick={searchApplications}
				>
					<SearchIcon className="w-4 h-4 [&>g>path]:stroke-white" />
				</button>
			</div>
		</Flex>
	);
}

function ApplicationsGrid() {
	const { createToast } = useFeedback();
	const { data: applications, isPending, refetch } = useGetUserJobsQuery({});

	const { mutateAsync: updateJobStatus, isPending: isLoading } =
		useUpdateJobStatusMutation();

	const statusChangeRequest = React.useCallback(
		async (id?: string, status?: string) => {
			if (!id) {
				createToast({
					message: 'Please refresh page and try again!',
					variant: 'error',
				});
			}
			try {
				await updateJobStatus({ id, status });
				refetch();
			} catch (error) {
				const err = error as any;
				createToast({
					message: err?.message || 'An error occurred, please try again!',
					variant: 'error',
				});
			}
		},
		[createToast, refetch, updateJobStatus]
	);

	const handleOnDragEnd = React.useCallback(
		(result: DropResult, _provided: ResponderProvided): void => {
			if (!applications) return;
			// const source = result.source;
			const destination = result.destination;
			const job = applications.data.find(
				(job) => `draggable-${job.id}` === result.draggableId
			);
			// const jobIndex = applications.data.findIndex(
			// 	(job) => `draggable-${job.id}` === result.draggableId
			// );

			statusChangeRequest(job?.id, destination?.droppableId.toLowerCase());

			/*
			if (!destination) {
				return;
			} else {
				const sourceIndex = source.index;
				const destinationIndex = destination.index;
				const newJobIndex =
					sourceIndex > destinationIndex
						? jobIndex - (sourceIndex - destinationIndex)
						: jobIndex + (destinationIndex - sourceIndex);

				if (destination.droppableId === source.droppableId) {
					// reorderJobApplications(job!, jobIndex, newJobIndex);
				} else {
					if (job) {
						const jobIndex = applications.data.findIndex(
							(job_) => job_.status === job?.status
						);
						const newJob = {
							...job,
							categoryID: destination.droppableId as ApplicationState,
						};

						// reorderJobApplications(newJob, jobIndex, newJobIndex);
					}
				}
			}
        
      */
		},
		[applications, statusChangeRequest]
	);

	return (
		<>
			{(isPending || isLoading) && <Spinner fullPage text="Loading…" />}
			<DragDropContext onDragEnd={handleOnDragEnd}>
				<div
					className={classNames(
						styles.applicationsGrid,
						'-top-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:min-h-screen'
					)}
				>
					{applications?.data &&
						applicationsOptions.map((option) => (
							<ApplicationsGridColumn
								key={option.id}
								icon={option.icon}
								categoryID={option.id}
								applications={applications.data}
							/>
						))}
				</div>
			</DragDropContext>
		</>
	);
}
