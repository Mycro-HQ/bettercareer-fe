import React from 'react';
import styles from '@/styles/home.module.scss';
import { Flex, Text, CallToAction, Heading } from '@labs/components';
import Logo from '../../public/images/Logo.svg';
import PeopleOnWaitlist from '../../public/images/people_on_waitlist.svg';

export const Home = () => {
	return (
		<Flex.Column alignItems="center" className={styles.HomeContainer}>
			<Flex
				justifyContent="space-between"
				alignItems="center"
				className="w-full px-28 pt-16 mb-12 2xl:mb-24 2xl:pt-28"
			>
				<Flex alignItems="center" gap={9}>
					<Logo />
					<Text fontSize="28px" weight={700} color="var(--text-black)">
						Better Career
					</Text>
				</Flex>
				<CallToAction>Join Waitlist</CallToAction>
			</Flex>
			<Flex
				alignItems="center"
				gap={6}
				className="rounded-[80px] mb-8 bg-[#ffffff61] border border-[#0000000f] backdrop-blur-md"
			>
				<PeopleOnWaitlist />
				<Text color="var(--text-gray)" align="center" weight={500}>
					Join over 1k people on our waitlist
				</Text>
			</Flex>
			<Heading.h1
				className="mb-10 w-[70%] min-[1536px]:w-[40%] !text-center"
				fontSize="84px"
				lineHeight="84px"
				weight={500}
			>
				Make your resume into a{' '}
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
				className="w-[48%] min-[1536px]:w-[20%] !text-center mb-8"
			>
				Elevate your resume from Couch Potato to Career Hotshot with the world
				best AI
			</Text>
			<Flex gap={12} className="mb-14 2xl:mb-28">
				<CallToAction>Join Waitlist</CallToAction>
				<CallToAction outline>Learn More</CallToAction>
			</Flex>
			<Flex.Column
				alignItems="center"
				className="bg-white pt-[60px] 2xl:pt-[72px]"
			>
				<Flex
					alignItems="center"
					gap={6}
					className="rounded-[80px] mb-4 bg-[#ffffff61] border border-[#0000000f] backdrop-blur-md"
				>
					<PeopleOnWaitlist />
					<Text color="var(--text-gray)" align="center" weight={500}>
						Join over 1k people on our waitlist
					</Text>
				</Flex>
				<Heading.h3 weight={500} className="!text-center mb-4">
					We're like your career matchmakers
				</Heading.h3>
				<Text
					color="var(--text-gray)"
					align="center"
					weight={500}
					lineHeight="22px"
					className="mb-20 2xl:mb-32"
				>
					We polish your dating profile (your CV!) and set you up with your
					dream job.
				</Text>
				<Flex>
					<Flex.Column></Flex.Column>
					<div></div>
				</Flex>
			</Flex.Column>
		</Flex.Column>
	);
};

export default Home;
