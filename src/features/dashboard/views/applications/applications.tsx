import React from 'react';
import {
	DragDropContext,
	DropResult,
	ResponderProvided,
} from 'react-beautiful-dnd';
import classNames from 'classnames';

import SearchIcon from '@labs/icons/dashboard/search.svg';
import BriefcaseIcon from '@labs/icons/dashboard/briefcase.svg';
import { Flex, Heading, Text } from '@labs/components';

import ApplicationsGridColumn from './components/grid-column';
import { applicationsOptions, applicationStateDefaultData } from './data';
import { ApplicationJob, ApplicationContext, ApplicationState } from './types';
import { reorderJobApplications } from './utils';
import styles from './applications.module.scss';

export const ApplicationStateContext = React.createContext<ApplicationContext>({
	applicationState: applicationStateDefaultData,
	setApplicationState: () => {},
});

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
	const [applicationState, setApplicationState] = React.useState<
		ApplicationJob[]
	>(applicationStateDefaultData);

	const handleOnDragEnd = React.useCallback(
		(result: DropResult, _provided: ResponderProvided): void => {
			const source = result.source;
			const destination = result.destination;
			const job = applicationState.find(
				(job) => `draggable-${job.key}` === result.draggableId
			);
			const jobIndex = applicationState.findIndex(
				(job) => `draggable-${job.key}` === result.draggableId
			);

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
					setApplicationState((prev) =>
						reorderJobApplications(prev, job!, jobIndex, newJobIndex)
					);
				} else {
					setApplicationState((prev) => {
						if (job) {
							// Index of the job in prev
							const jobIndex = prev.findIndex((job_) => job_.key === job.key);
							console.log('Job Index Before:', jobIndex);
							console.log('Job Index After:', newJobIndex);
							const otherApplications = prev.filter(
								(application) => application.key !== job.key
							);
							const newJob = {
								...job,
								categoryID: destination.droppableId as ApplicationState,
							};
							const newJobApplications = [...otherApplications, newJob];

							return reorderJobApplications(
								newJobApplications,
								newJob,
								newJobApplications.length - 1,
								newJobIndex
							);
						} else {
							return prev;
						}
					});
					console.log('HANDLE CHANGE RAN.');
				}
				console.log(
					`Source:\n\tDroppableId: ${source.droppableId}\n\tIndex:${sourceIndex}`
				);
				console.log(
					`Destination:\n\tDroppableId: ${destination.droppableId}\n\tIndex:${destinationIndex}`
				);
			}
		},
		[applicationState]
	);

	return (
		<ApplicationStateContext.Provider
			value={{
				applicationState,
				setApplicationState,
			}}
		>
			<DragDropContext onDragEnd={handleOnDragEnd}>
				<div
					className={classNames(
						styles.applicationsGrid,
						'-top-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:min-h-screen'
					)}
				>
					{applicationsOptions.map((option) => (
						<ApplicationsGridColumn
							key={option.id}
							icon={option.icon}
							categoryID={option.id}
							applications={applicationState}
						/>
					))}
				</div>
			</DragDropContext>
		</ApplicationStateContext.Provider>
	);
}
