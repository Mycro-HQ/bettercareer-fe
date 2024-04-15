import React from 'react';
import { Text, Flex, CallToAction } from '@labs/components';
import JobCard, { Separator } from './components/job-card';
import { JobFilter } from './components/job-filter';
import { JobSearchForm } from './components/job-search-form';
import {
	JobDescriptionTitle,
	JobDescriptionBody,
} from './components/job-description';
import useWindowDimensions from './hooks/useWindowDimensions';
import { Modal } from '@labs/components/modal';
import DribbbleLogo from '@public/images/dashboard/Company_Logo.svg';

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
			`
			Minimum 3+ years of experience in brand design or a
			related field, with a strong portfolio showcasing your
			design expertise and ability to create a cohesive
			brand identity.
			`,
			`
			Software mastery: Proficiency in Adobe Creative Suite
			(Photoshop, Illustrator, InDesign) or similar design
			software is essential.
			`,
			`
			Eye for detail: A keen eye for detail and a commitment
			to producing high-quality, pixel-perfect designs are
			non-negotiable.
			`,
			`
			Brand storytelling: You possess a deep understanding
			of how visual design can shape brand perception and
      effectively communicate brand messages.
			`,
			`
			Team player with a twist: You thrive in a
			collaborative environment while maintaining the
			creative independence to bring fresh ideas to the
			table.
			`,
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
			`
			Minimum 3+ years of experience in brand design or a
			related field, with a strong portfolio showcasing your
			design expertise and ability to create a cohesive
			brand identity.
			`,
			`
			Software mastery: Proficiency in Adobe Creative Suite
			(Photoshop, Illustrator, InDesign) or similar design
			software is essential.
			`,
			`
			Eye for detail: A keen eye for detail and a commitment
			to producing high-quality, pixel-perfect designs are
			non-negotiable.
			`,
			`
			Brand storytelling: You possess a deep understanding
			of how visual design can shape brand perception and
      effectively communicate brand messages.
			`,
			`
			Team player with a twist: You thrive in a
			collaborative environment while maintaining the
			creative independence to bring fresh ideas to the
			table.
			`,
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
			`
			Minimum 3+ years of experience in brand design or a
			related field, with a strong portfolio showcasing your
			design expertise and ability to create a cohesive
			brand identity.
			`,
			`
			Software mastery: Proficiency in Adobe Creative Suite
			(Photoshop, Illustrator, InDesign) or similar design
			software is essential.
			`,
			`
			Eye for detail: A keen eye for detail and a commitment
			to producing high-quality, pixel-perfect designs are
			non-negotiable.
			`,
			`
			Brand storytelling: You possess a deep understanding
			of how visual design can shape brand perception and
      effectively communicate brand messages.
			`,
			`
			Team player with a twist: You thrive in a
			collaborative environment while maintaining the
			creative independence to bring fresh ideas to the
			table.
			`,
		],
	},
];

export const Jobs = () => {
	const [activeJobCardIndex, setActiveJobCardIndex] = React.useState<
		number | null
	>(null);
	const { width } = useWindowDimensions();

	return (
		<div>
			<JobSearchForm />
			<JobFilter />
			<Flex.Row gap={32} className="mb-10">
				<Flex.Column gap={24} flex="6">
					{JobData.map((job) => (
						<JobCard
							{...job}
							onClick={() => {
								setActiveJobCardIndex(job.key);
							}}
							className={
								activeJobCardIndex === job.key ? '!border-[#1388f2]' : ''
							}
						/>
					))}
				</Flex.Column>

				{activeJobCardIndex !== null ? (
					<ResponsiveLayoutRenderer
						width={width!}
						mobileLayout={
							<Modal
								in={!!activeJobCardIndex}
								onClose={() => setActiveJobCardIndex(null)}
							>
								<JobDetails activeJobCardIndex={activeJobCardIndex} />
							</Modal>
						}
						desktopLayout={
							<Flex.Column
								flex="8"
								gap={40}
								className="py-8 px-[30px] rounded-2xl bg-white border border-[#f3f4f4] border-solid"
							>
								<JobDetails activeJobCardIndex={activeJobCardIndex} />
							</Flex.Column>
						}
					/>
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

function ResponsiveLayoutRenderer({
	width,
	mobileLayout,
	desktopLayout,
}: {
	width: number;
	mobileLayout: React.ReactNode;
	desktopLayout: React.ReactNode;
}) {
	return width < 768 ? mobileLayout : desktopLayout;
}

function JobDetails({ activeJobCardIndex }: { activeJobCardIndex: number }) {
	const index = activeJobCardIndex - 1;

	return (
		<Flex.Column gap={40}>
			<Flex.Row justifyContent="space-between">
				<Flex.Row gap={18}>
					{JobData[index].companyLogo}
					<Flex.Column gap={4} className="font-[Figtree]">
						<Text as="span" weight={600} fontSize="18px" inheritFont>
							{JobData[index].jobTitle}
						</Text>
						<Text
							color="var(--text-gray)"
							weight={500}
							lineHeight="24px"
							inheritFont
						>
							{JobData[index].companyName}
							<Separator />
							{JobData[index].location}
							<Separator />
							{JobData[index].salaryRange}
						</Text>
					</Flex.Column>
				</Flex.Row>
				<Flex.Row gap={8} className="my-2">
					<CallToAction size="sm">Apply</CallToAction>
					<CallToAction outline size="sm">
						Save
					</CallToAction>
				</Flex.Row>
			</Flex.Row>
			<Flex.Column gap={32}>
				<div>
					<JobDescriptionTitle title="Summary" />
					<JobDescriptionBody children={JobData[index].summary} />
				</div>
				<div>
					<JobDescriptionTitle title="Requirements" />
					<JobDescriptionBody
						isChildText={JobData[index].isRequirementsText}
						children={
							<ul className="list-disc list-inside">
								{JobData[index].requirementsArray.map((req) => (
									<li key={req.slice(0, 10)} className="mb-4">
										{req}
									</li>
								))}
							</ul>
						}
					/>
				</div>
			</Flex.Column>
		</Flex.Column>
	);
}
