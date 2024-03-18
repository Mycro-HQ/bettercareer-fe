import React from 'react';
import styles from '@/styles/home.module.scss';
import { Flex, Text, CallToAction, Heading } from '@labs/components';
import Image from 'next/image';
import Logo from '../../public/images/Logo.svg';
import PeopleOnWaitlist from '../../public/images/people_on_waitlist.svg';
import FirstToGetAccess from '../../public/images/first_to_get_access.svg';
import classNames from 'classnames';
import {
	AccordionWrapper,
	AccordionContent,
	AccordionTrigger,
	AccordionItem,
} from '@labs/components/accordion';

function PeoplePill({
	text,
	imageElement,
	wrapperClass = '',
}: {
	text: string;
	wrapperClass: string;
	imageElement: React.ReactNode;
}) {
	return (
		<Flex
			alignItems="center"
			gap={6}
			className={classNames(styles.PeoplePill, wrapperClass)}
		>
			{imageElement}
			<Text color="var(--text-gray)" align="center" weight={500}>
				{text}
			</Text>
		</Flex>
	);
}

export const Home = () => {
	const [activeAccordion, setActiveAccordion] = React.useState(1);

	function HomeAccordionItem({
		title,
		content,
		accordionKey,
	}: {
		title: string;
		content: string;
		accordionKey: number;
	}) {
		return (
			<AccordionItem
				value={`item-${accordionKey}`}
				onClick={() => setActiveAccordion(accordionKey)}
			>
				<AccordionTrigger className="mb-[14px]">
					<Heading.h4 color="#273643" className="text-left" weight={500}>
						{title}
					</Heading.h4>
				</AccordionTrigger>
				<AccordionContent>
					<Text
						as="p"
						color="#6F7982"
						weight={500}
						lineHeight="25px"
						className="mb-1"
					>
						{content}
					</Text>
				</AccordionContent>
			</AccordionItem>
		);
	}

	return (
		<Flex.Column alignItems="center" className={styles.HomeContainer}>
			<Flex
				justifyContent="space-between"
				alignItems="center"
				className="w-full p-16 mb-16"
			>
				<Flex alignItems="center" gap={9}>
					<Logo />
					<Heading.h4 fontSize="28px" weight={700} color="var(--text-black)">
						Better Career
					</Heading.h4>
				</Flex>
				<CallToAction>Join Waitlist</CallToAction>
			</Flex>
			<PeoplePill
				text="Join over 1k people on our waitlist"
				wrapperClass="mb-8"
				imageElement={<PeopleOnWaitlist />}
			/>
			<Heading.h1
				className="mb-10 !text-center w-full"
				fontSize="84px"
				lineHeight="84px"
				weight={500}
			>
				Make your resume into
				<br />
				<Text
					as="span"
					fontSize="84px"
					weight={500}
					lineHeight="84px"
					className="!text-[#6F7982]"
				>
					a job magnet with AI
				</Text>
			</Heading.h1>
			<Text
				color="var(--text-gray)"
				fontSize="var(--font-h4)"
				lineHeight="38px"
				weight={500}
				className="!text-center mb-8"
			>
				Elevate your resume from Couch Potato to Career
				<br />
				Hotshot with the world best AI
			</Text>
			<Flex gap={12} className="mb-14 xl:mb-28">
				<CallToAction>Join Waitlist</CallToAction>
				<CallToAction outline>Learn More</CallToAction>
			</Flex>
			<Flex.Column
				alignItems="center"
				className="bg-white pt-[60px] xl:pt-[72px] w-4/6 px-16 pb-28 mb-32 rounded-[32px] shadow-[0px_4px_94px_0px_rgba(0,0,0,0.04)]"
			>
				<PeoplePill
					text="Be the first to get access"
					wrapperClass="mb-4"
					imageElement={<FirstToGetAccess />}
				/>
				<Heading.h3 weight={500} className="!text-center mb-4">
					We're like your career matchmakers
				</Heading.h3>
				<Text
					color="var(--text-gray)"
					align="center"
					weight={500}
					lineHeight="22px"
					className="mb-20 xl:mb-32 text-center"
				>
					We polish your dating profile (your CV!) and set you up with your
					dream job.
				</Text>
				<Flex className="w-full gap-5 xl:gap-7 pb-40 xl:pb-52">
					<div className="w-1/2">
						<AccordionWrapper
							className="w-full flex flex-col gap-6"
							type="single"
							defaultValue="item-1"
							collapsible
						>
							<HomeAccordionItem
								accordionKey={1}
								title="Resume Optimization"
								content={`Transform your CV into a powerful tool that stands out. Our
								advanced algorithms and professional insights ensure your
								resume not only shines but also highlights your unique
								strengths and skills, making you irresistible to employers.`}
							/>
							<HomeAccordionItem
								accordionKey={2}
								title="AI-Powered Job Matching"
								content={`Transform your CV into a powerful tool that stands out. Our
								advanced algorithms and professional insights ensure your
								resume not only shines but also highlights your unique
								strengths and skills, making you irresistible to employers.`}
							/>
							<HomeAccordionItem
								accordionKey={3}
								title="Real-Time Job Alerts"
								content={`Transform your CV into a powerful tool that stands out. Our
								advanced algorithms and professional insights ensure your
								resume not only shines but also highlights your unique
								strengths and skills, making you irresistible to employers.`}
							/>
							<HomeAccordionItem
								accordionKey={4}
								title="Community Access"
								content={`Transform your CV into a powerful tool that stands out. Our
								advanced algorithms and professional insights ensure your
								resume not only shines but also highlights your unique
								strengths and skills, making you irresistible to employers.`}
							/>
						</AccordionWrapper>
					</div>
					<div className="relative w-1/2 text-right">
						<div className={styles.resumeContainer}>
							<Image
								src="/images/resume.png"
								alt="Resume analysis"
								sizes="100vw"
								priority
								width={0}
								height={0}
								className="w-full h-full object-contain"
							/>
						</div>
						<Text
							fontSize="150px"
							weight={500}
							className="font-[Recoleta] lg:-mt-20 z-[2px] text-[#F3F4F4]"
						>
							{activeAccordion.toString().padStart(2, '0')}
						</Text>
						<div className="absolute bottom-0">
							<Image
								src="/images/background_image.png"
								alt="Vector"
								sizes="100vw"
								priority
								width={500}
								height={500}
							/>
						</div>
					</div>
				</Flex>
				<Heading.h4 weight={500} className="mb-6">
					Already Impressed ?
				</Heading.h4>
				<CallToAction>Join Waitlist</CallToAction>
			</Flex.Column>
			<Text
				color="var(--text-gray)"
				fontSize="var(--font-h6)"
				weight={600}
				className="mb-24"
			>
				Made with ❤️ by the Mycro Team
			</Text>
		</Flex.Column>
	);
};

export default Home;
