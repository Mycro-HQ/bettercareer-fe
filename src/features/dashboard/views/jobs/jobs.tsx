import { Text, Flex, CallToAction, Heading } from '@labs/components';
import { DropdownMenu } from '@radix-ui/themes';
import React from 'react';
import JobCard from './components/job-card';
import DribbbleLogo from '../../../../../public/images/dashboard/Company_Logo.svg';
import BriefCaseIcon from '../../../../../public/images/dashboard/Briefcase.svg';
import SearchIcon from '../../../../../public/images/dashboard/Search.svg';
import SearchWhiteIcon from '../../../../../public/images/dashboard/SearchWhite.svg';
import JobTypeIcon from '../../../../../public/images/dashboard/job-search.svg';
import LocationIcon from '../../../../../public/images/dashboard/location.svg';
import DownIcon from '../../../../../public/images/dashboard/Down.svg';
import { Separator } from './components/job-card';
import { Modal } from '@labs/components/modal';
import useWindowDimensions from './useWindowDimensions';
import classNames from 'classnames';
import styles from './jobs.module.scss';

function JobSearchForm() {
	const [formData, setFormData] = React.useState({
		search: '',
		location: '',
		jobType: '',
	});

	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	}

	function JobSearchFormItem({
		icon,
		name,
		placeholder,
		value,
	}: {
		icon: any;
		name: 'search' | 'location' | 'jobType';
		placeholder: string;
		value: string;
	}) {
		return (
			<Flex
				alignItems="center"
				gap={8}
				className="bg-white mb-4 rounded-2xl pl-4 w-full"
			>
				{icon}
				<input
					name={name}
					type="text"
					placeholder={placeholder}
					value={value}
					onChange={handleChange}
					className="outline-none rounded-tr-2xl rounded-br-2xl py-[14px]"
				/>
			</Flex>
		);
	}

	function JobSearchSeparator() {
		return (
			<div className="hidden md:block text-[#CFD2D5] mr-3 scale-y-150">|</div>
		);
	}

	return (
		<form
			action=""
			className="flex flex-col md:flex-row w-full md:w-min max-w-screen-[700px] bg-transparent md:bg-white py-[10px] md:px-6 gap-x-4 rounded-2xl"
		>
			<Flex alignItems="center" className="flex-col md:flex-row mb-4 md:mb-0">
				<JobSearchFormItem
					icon={<SearchIcon />}
					name="search"
					placeholder="Search jobs"
					value={formData.search}
				/>
				<JobSearchSeparator />
				<JobSearchFormItem
					icon={<LocationIcon />}
					name="location"
					placeholder="Location"
					value={formData.location}
				/>
				<JobSearchSeparator />
				<JobSearchFormItem
					icon={<JobTypeIcon />}
					name="jobType"
					placeholder="Job Type"
					value={formData.jobType}
				/>
			</Flex>
			<button
				type="submit"
				title="Search"
				className="hidden md:block rounded-xl p-3 bg-[#1388F2]"
			>
				<SearchWhiteIcon />
			</button>
			<CallToAction size="sm" className="md:!hidden self-center">
				Search
			</CallToAction>
		</form>
	);
}

function Header() {
	return (
		<Flex
			alignItems="center"
			justifyContent="space-between"
			className="flex-col lg:flex-row mb-4 md:mb-16"
		>
			<Flex.Column gap={8}>
				<Flex alignItems="center" gap={12}>
					<Heading.h3 weight={600} animate="slide" fontSize="28px">
						Search for Jobs
					</Heading.h3>
					<BriefCaseIcon width="24" height="24" />
				</Flex>

				<Text
					color="var(--text-gray)"
					animate="fade"
					className="mb-4 md:mb-[40px]"
				>
					See all open positions and dive into a fulfilling career
				</Text>
			</Flex.Column>
			<JobSearchForm />
		</Flex>
	);
}

function JobFilter() {
	return (
		<Flex
			justifyContent="space-between"
			className="items-center lg:items-start mb-4 md:mb-0 flex-col md:flex-row"
		>
			<div className="flex gap-x-6 lg:gap-x-12 flex-col md:flex-row mb-4 md:mb-8 py-2 items-center">
				<Text weight={600} fontSize="18px" as="span" className="cursor-pointer">
					All Jobs
				</Text>
				<Text
					weight={600}
					fontSize="18px"
					color="var(--text-gray)"
					as="span"
					className="cursor-pointer"
				>
					Best Matches
				</Text>
				<Text
					weight={600}
					fontSize="18px"
					color="var(--text-gray)"
					as="span"
					className="cursor-pointer"
				>
					Based on Resume
				</Text>
				<Text
					weight={600}
					fontSize="18px"
					color="var(--text-gray)"
					as="span"
					className="cursor-pointer"
				>
					Posted this Week
				</Text>
				<Text
					weight={600}
					fontSize="18px"
					color="var(--text-gray)"
					as="span"
					className="cursor-pointer"
				>
					Sponsored Jobs
				</Text>
			</div>
			<JobFilterDropDown />
		</Flex>
	);
}

function JobFilterDropDown() {
	const dropDownDataArray = ['Newest', 'Oldest', 'Most Popular'];
	const [dropDownData, setDropDownData] = React.useState(dropDownDataArray[0]);
	const filterDropDownDataArray = dropDownDataArray.filter(
		(data) => data !== dropDownData
	);
	return (
		<DropdownMenu.Root>
			<DropdownMenu.Trigger>
				<CallToAction
					outline
					size="sm"
					className="transition-all flex items-center gap-x-[6px] [&[data-state=open]>svg]:rotate-180"
				>
					<span>{dropDownData}</span>
					<DownIcon className="transition-transform duration-200" />
				</CallToAction>
			</DropdownMenu.Trigger>
			<DropdownMenu.Content>
				{filterDropDownDataArray.map((data) => (
					<DropdownMenu.Item key={data} onClick={() => setDropDownData(data)}>
						{data}
					</DropdownMenu.Item>
				))}
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	);
}

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

function JobDescriptionTitle({ title }: { title: string }) {
	return (
		<Text as="span" weight={600} className="mb-3">
			{title}
		</Text>
	);
}

function JobDescriptionBody({
	children,
	isChildText = true,
}: {
	children: React.ReactNode;
	isChildText?: boolean;
}) {
	return isChildText ? (
		<Text
			as="p"
			size="sm"
			weight={500}
			lineHeight="20px"
			className="text-[#273643]"
		>
			{children}
		</Text>
	) : (
		<div className="text-sm font-medium leading-5 text-[#273643]">
			{children}
		</div>
	);
}

export const Jobs = () => {
	const [activeJobCardIndex, setActiveJobCardIndex] = React.useState<
		number | null
	>(null);
	const { width } = useWindowDimensions();

	return (
		<div>
			<Header />
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
