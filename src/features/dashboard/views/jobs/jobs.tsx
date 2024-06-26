import { useState, useEffect, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import dynamic from 'next/dynamic';

import {
	Text,
	Flex,
	CallToAction,
	Spinner,
	useFeedback,
} from '@labs/components';
import { Modal } from '@labs/components/modal';
import DribbbleLogo from '@labs/icons/dashboard/dribbble-logo.svg';
import { JobResponseData } from '@/queries/types/job';
import { useGetJobsQuery } from '@/queries/job';

import JobCard, { Separator } from './components/job-card';
import { JobFilter } from './components/job-filter';
import { JobSearchForm } from './components/job-search-form';
import {
	JobDescriptionTitle,
	JobDescriptionBody,
} from './components/job-description';
import useWindowDimensions from './hooks/useWindowDimensions';
import JobAppliedModal from './components/modal';

const ResponsiveLayoutRenderer = dynamic(
	() =>
		import('./components/res-render').then(
			(mod) => mod.ResponsiveLayoutRenderer
		),
	{
		ssr: false,
	}
);
const JobData = [
	{
		key: 1,
		companyLogo: <DribbbleLogo />,
		jobTitle: 'Brand Designer 1',
		companyName: 'Dribbble',
		location: 'California',
		salaryRange: '$120k - $140k',
		tags: ['Remote', 'Internship', 'Full-Time'],
		time: '1hr ago',
		summary: `
		Are you a creative visionary with a passion for crafting
		exceptional brand experiences? Do you thrive in translating
		brand strategies into captivating visuals that resonate with
		audiences? If so, then we want you on our team! We're
		searching for a talented Brand Designer to play a pivotal
		role in shaping the visual identity of our brand. You'll be
		the mastermind behind everything from our logo and brand
		guidelines to marketing materials and social media graphics.
		`,
		isRequirementsText: false,
		requirementsArray: [
			{
				key: 0,
				requirement: `
				Minimum 3+ years of experience in brand design or a
				related field, with a strong portfolio showcasing your
				design expertise and ability to create a cohesive
				brand identity.
				`,
			},
			{
				key: 1,
				requirement: `
				Software mastery: Proficiency in Adobe Creative Suite
				(Photoshop, Illustrator, InDesign) or similar design
				software is essential.
				`,
			},
			{
				key: 2,
				requirement: `
				Eye for detail: A keen eye for detail and a commitment
				to producing high-quality, pixel-perfect designs are
				non-negotiable.
				`,
			},
			{
				key: 3,
				requirement: `
				Brand storytelling: You possess a deep understanding
				of how visual design can shape brand perception and
				effectively communicate brand messages.
				`,
			},
			{
				key: 4,
				requirement: `
				Team player with a twist: You thrive in a
				collaborative environment while maintaining the
				creative independence to bring fresh ideas to the
				table.
				`,
			},
		],
	},
	{
		key: 2,
		companyLogo: <DribbbleLogo />,
		jobTitle: 'Brand Designer 2',
		companyName: 'Dribbble',
		location: 'California',
		salaryRange: '$120k - $140k',
		tags: ['Remote', 'Internship', 'Full-Time'],
		time: '1hr ago',
		summary: `
		Are you a creative visionary with a passion for crafting
		exceptional brand experiences? Do you thrive in translating
		brand strategies into captivating visuals that resonate with
		audiences? If so, then we want you on our team! We're
		searching for a talented Brand Designer to play a pivotal
		role in shaping the visual identity of our brand. You'll be
		the mastermind behind everything from our logo and brand
		guidelines to marketing materials and social media graphics.
		`,
		isRequirementsText: false,
		requirementsArray: [
			{
				key: 0,
				requirement: `
				Minimum 3+ years of experience in brand design or a
				related field, with a strong portfolio showcasing your
				design expertise and ability to create a cohesive
				brand identity.
				`,
			},
			{
				key: 1,
				requirement: `
				Software mastery: Proficiency in Adobe Creative Suite
				(Photoshop, Illustrator, InDesign) or similar design
				software is essential.
				`,
			},
			{
				key: 2,
				requirement: `
				Eye for detail: A keen eye for detail and a commitment
				to producing high-quality, pixel-perfect designs are
				non-negotiable.
				`,
			},
			{
				key: 3,
				requirement: `
				Brand storytelling: You possess a deep understanding
				of how visual design can shape brand perception and
				effectively communicate brand messages.
				`,
			},
			{
				key: 4,
				requirement: `
				Team player with a twist: You thrive in a
				collaborative environment while maintaining the
				creative independence to bring fresh ideas to the
				table.
				`,
			},
		],
	},
	{
		key: 3,
		companyLogo: <DribbbleLogo />,
		jobTitle: 'Brand Designer 3',
		companyName: 'Dribbble',
		location: 'California',
		salaryRange: '$120k - $140k',
		tags: ['Remote', 'Internship', 'Full-Time'],
		time: '1hr ago',
		summary: `
		Are you a creative visionary with a passion for crafting
		exceptional brand experiences? Do you thrive in translating
		brand strategies into captivating visuals that resonate with
		audiences? If so, then we want you on our team! We're
		searching for a talented Brand Designer to play a pivotal
		role in shaping the visual identity of our brand. You'll be
		the mastermind behind everything from our logo and brand
		guidelines to marketing materials and social media graphics.
		`,
		isRequirementsText: false,
		requirementsArray: [
			{
				key: 0,
				requirement: `
				Minimum 3+ years of experience in brand design or a
				related field, with a strong portfolio showcasing your
				design expertise and ability to create a cohesive
				brand identity.
				`,
			},
			{
				key: 1,
				requirement: `
				Software mastery: Proficiency in Adobe Creative Suite
				(Photoshop, Illustrator, InDesign) or similar design
				software is essential.
				`,
			},
			{
				key: 2,
				requirement: `
				Eye for detail: A keen eye for detail and a commitment
				to producing high-quality, pixel-perfect designs are
				non-negotiable.
				`,
			},
			{
				key: 3,
				requirement: `
				Brand storytelling: You possess a deep understanding
				of how visual design can shape brand perception and
				effectively communicate brand messages.
				`,
			},
			{
				key: 4,
				requirement: `
				Team player with a twist: You thrive in a
				collaborative environment while maintaining the
				creative independence to bring fresh ideas to the
				table.
				`,
			},
		],
	},
];

export const Jobs = () => {
	const [activeJobCardIndex, setActiveJobCardIndex] = useState<number | null>(
		1
	);
	const [selectedJobId, setSelectedJobId] = useState<string | null | undefined>(
		null
	);
	const [filter, setFilter] = useState<string | undefined>();
	const [query, setQuery] = useState<Record<string, string>>({});
	const { width } = useWindowDimensions();

	const { data: jobs, isFetching } = useGetJobsQuery({ query });

	const selectedJob = useMemo(() => {
		return jobs?.data.find((job) => job.id === selectedJobId);
	}, [selectedJobId, jobs]);

	useEffect(() => {
		if (!selectedJobId) {
			setActiveJobCardIndex(1);
			setSelectedJobId(jobs?.data?.[0].id);
		}
	}, [jobs, selectedJobId]);

	useEffect(() => {
		if (filter) {
			setQuery({ filter });
		}
	}, [filter]);

	return (
		<div>
			{isFetching && <Spinner fullPage text="Loading…" />}
			<JobSearchForm setQuery={setQuery} />
			<JobFilter setFilter={setFilter} />
			<Flex.Row gap={32} className="mb-10 relative">
				<Flex.Column
					gap={24}
					css={{
						maxWidth: '480px',
						position: 'relative',
					}}
					flex="5"
				>
					{jobs &&
						jobs.data.map((job) => (
							<JobCard
								key={job.id}
								companyLogo={job.logo}
								jobTitle={job.title}
								companyName={job.company}
								location={job.location}
								salaryRange={job.compensation}
								tags={job.tags}
								time={job.createdAt}
								onClick={() => {
									setActiveJobCardIndex(1);
									setSelectedJobId(job.id);
								}}
								className={
									selectedJob?.id === job.id ? '!border-[#1388f2]' : ''
								}
							/>
						))}
				</Flex.Column>

				{activeJobCardIndex !== null && selectedJob ? (
					<AnimatePresence mode="wait">
						<motion.div
							initial={{ opacity: 0, y: 15 }}
							key={`job-details-${activeJobCardIndex}`}
							className="flex-[8] flex flex-col sticky top-[100px] h-fit"
							animate={{
								opacity: 1,
								y: 0,
								scale: 1,
							}}
							exit={{ opacity: 0, y: 15 }}
							transition={{
								duration: 0.2,
							}}
						>
							<ResponsiveLayoutRenderer
								width={width!}
								mobileLayout={
									<Modal
										in={!!activeJobCardIndex}
										onClose={() => setActiveJobCardIndex(null)}
									>
										<JobDetails
											activeJobCardIndex={activeJobCardIndex}
											selectedJob={selectedJob}
										/>
									</Modal>
								}
								desktopLayout={
									<Flex.Column
										flex="8"
										gap={40}
										className="py-8 px-[30px] rounded-2xl bg-white border border-[#f3f4f4] border-solid"
									>
										<JobDetails
											activeJobCardIndex={activeJobCardIndex}
											selectedJob={selectedJob}
										/>
									</Flex.Column>
								}
							/>
						</motion.div>
					</AnimatePresence>
				) : (
					<Flex.Column
						flex="8"
						gap={40}
						className="!hidden md:!flex py-8 px-[30px] rounded-2xl bg-white border border-[#f3f4f4] border-solid"
					>
						<p className="hidden md:block">Pick a job on the left</p>
					</Flex.Column>
				)}
			</Flex.Row>
		</div>
	);
};

function JobDetails({
	activeJobCardIndex,
	selectedJob,
}: {
	activeJobCardIndex: number;
	selectedJob: JobResponseData;
}) {
	const index = activeJobCardIndex - 1;
	const [isModalOpen, setIsModalOpen] = useState(false);
	const { createToast } = useFeedback();

	return (
		<>
			<Flex.Column gap={40}>
				<Flex.Row justifyContent="space-between">
					<Flex.Row gap={18}>
						{selectedJob.logo}
						<Flex.Column gap={4}>
							<Text weight={600} fontSize="18px" inheritFont>
								{selectedJob.title}
							</Text>
							<Text
								color="var(--text-gray)"
								weight={500}
								lineHeight="24px"
								inheritFont
							>
								{selectedJob.company}
								{selectedJob.location && <Separator />}
								{selectedJob.location}
								{selectedJob.compensation && <Separator />}
								{selectedJob.compensation}
							</Text>
						</Flex.Column>
					</Flex.Row>
					<Flex.Row gap={8} className="my-2">
						<CallToAction
							size="sm"
							onClick={() => {
								if (!selectedJob.url) {
									createToast({ message: 'Job has expired' });
									return;
								}
								window.open(selectedJob.url);
								setTimeout(() => setIsModalOpen(true), 1000);
							}}
						>
							Apply
						</CallToAction>
						<CallToAction outline size="sm">
							Save
						</CallToAction>
					</Flex.Row>
				</Flex.Row>
				<Flex.Column gap={32}>
					<div>
						<JobDescriptionTitle title="Summary" />
						<JobDescriptionBody>{selectedJob.description}</JobDescriptionBody>
					</div>
					<div>
						<JobDescriptionTitle title="Requirements" />
						<JobDescriptionBody isChildText={JobData[index].isRequirementsText}>
							<ul className="list-disc list-inside">
								{JobData[index].requirementsArray.map((req) => (
									<li key={req.key} className="mb-4">
										{req.requirement}
									</li>
								))}
							</ul>
						</JobDescriptionBody>
					</div>
				</Flex.Column>
			</Flex.Column>
			<Modal in={isModalOpen} onClose={() => setIsModalOpen(false)} size="sm">
				<JobAppliedModal
					setModalVisibility={setIsModalOpen}
					jobId={selectedJob.id}
				/>
			</Modal>
		</>
	);
}
