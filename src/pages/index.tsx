import React from 'react';
import styles from '@/styles/home.module.scss';
import { Flex, Text, CallToAction, Heading } from '@labs/components';
import Logo from '../../public/images/Logo.svg';
import PeopleOnWaitlist from '../../public/images/people_on_waitlist.svg';
import FirstToGetAccess from '../../public/images/first_to_get_access.svg';
import classNames from 'classnames';

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

function AccordionItem({
	title,
	description,
	open = false,
}: {
	title: string;
	description: string;
	open?: boolean;
}) {
	function Wrapper({ children }: { children: React.ReactNode }) {
		return open ? (
			<details open className={styles.AccordionItem}>
				{children}
			</details>
		) : (
			<details className={styles.AccordionItem}>{children}</details>
		);
	}

	return (
		<Wrapper>
			<summary>
				<Heading.h4 color="#273643" weight={500} className="mb-[14px]">
					{title}
				</Heading.h4>
			</summary>
			<Text
				as="p"
				color="#6F7982"
				weight={500}
				lineHeight="25px"
				className="mb-1"
			>
				{description}
			</Text>
		</Wrapper>
	);
}

export const Home = () => {
	return (
		<Flex.Column alignItems="center" className={styles.HomeContainer}>
			<Flex
				justifyContent="space-between"
				alignItems="center"
				className="w-full px-28 pt-16 mb-12 xl:mb-24 xl:pt-28"
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
				<br /> a{' '}
				<Text
					as="span"
					fontSize="84px"
					weight={500}
					lineHeight="84px"
					className="!text-[#6F7982]"
				>
					job magnet
				</Text>{' '}
				with AI
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
				className="bg-white pt-[60px] xl:pt-[72px] w-4/6 px-16 rounded-[32px] shadow-[0px_4px_94px_0px_rgba(0,0,0,0.04)]"
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
					className="mb-20 xl:mb-32"
				>
					We polish your dating profile (your CV!) and set you up with your
					dream job.
				</Text>
				<Flex className="w-full">
					<Flex.Column gap={60} className="w-1/2">
						<AccordionItem
							title="Resume Optimization"
							description="Transform your CV into a powerful tool that stands out. Our advanced algorithms and professional insights ensure your resume not only shines but also highlights your unique strengths and skills, making you irresistible to employers."
							open
						/>
						<AccordionItem
							title="AI-Powered Job Matching"
							description="Transform your CV into a powerful tool that stands out. Our advanced algorithms and professional insights ensure your resume not only shines but also highlights your unique strengths and skills, making you irresistible to employers."
						/>
						<AccordionItem
							title="Real-Time Job Alerts"
							description="Transform your CV into a powerful tool that stands out. Our advanced algorithms and professional insights ensure your resume not only shines but also highlights your unique strengths and skills, making you irresistible to employers."
						/>
						<AccordionItem
							title="Community Access"
							description="Transform your CV into a powerful tool that stands out. Our advanced algorithms and professional insights ensure your resume not only shines but also highlights your unique strengths and skills, making you irresistible to employers."
						/>
					</Flex.Column>
					<div className="w-1/2 text-right">
						<Text
							fontSize="150px"
							weight={500}
							className="font-[Recoleta] text-[#F3F4F4]"
						>
							01
						</Text>
					</div>
				</Flex>
			</Flex.Column>
		</Flex.Column>
	);
};

export default Home;
