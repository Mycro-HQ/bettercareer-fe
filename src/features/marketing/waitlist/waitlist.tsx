import React from 'react';
import { CallToAction, Container, Flex, Heading, Text } from '@labs/components';
import { AnimatePresence, motion } from 'framer-motion';

import Logo from '@labs/icons/logo.svg';

import styles from './waitlist.module.scss';
import { WaitlistInfo } from '.';

export const Waitlist = () => {
	const boxVariant = {
		hidden: {
			opacity: 0,
		},
		visible: {
			opacity: 1,
			transition: {
				when: 'beforeChildren',
				staggerChildren: 0.15,
				duration: 0.4,
			},
		},
	};

	const listVariant = {
		hidden: {
			y: 10,
			opacity: 0,
			scale: 0.95,
		},
		visible: {
			y: 0,
			opacity: 1,
			scale: 1,

			transition: {
				type: 'spring',
				damping: 5,
				stiffness: 100,
			},
		},
	};

	const [currentIndex, setCurrentIndex] = React.useState(0);

	return (
		<div className={styles.Waitlist}>
			<Container maxWidth="xl">
				<nav className={styles.WaitlistHeaderNav}>
					<div className={styles.WaitlistHeaderNavLogo}>
						<Logo />
					</div>
					<CallToAction.a href="/about" aria-label="About">
						Join Waitlist
					</CallToAction.a>
				</nav>
			</Container>

			<header className={styles.WaitlistHeader}>
				<Container maxWidth="lg">
					<AnimatePresence mode="wait">
						<motion.div
							className={styles.WaitlistHeaderContent}
							variants={boxVariant}
							animate="visible"
							initial="hidden"
						>
							<motion.a href="#" variants={listVariant} key="6">
								<Flex
									className={styles.WaitlistTagline}
									justifyContent="space-between"
									alignItems="center"
									gap={8}
									css={{ padding: '8px 14px' }}
								>
									<img src="/images/waitlist/header_tagline.png" width={60} />
									<Text color="#57636D" weight={500}>
										Join over 1k people on our waitlist
									</Text>
								</Flex>
							</motion.a>
							<motion.span
								className="text-center"
								variants={listVariant}
								key="1"
							>
								<Heading.h1
									weight={400}
									align="center"
									className="mt-[32px] mb-[40px]"
									style={{
										maxWidth: '725px',
										lineHeight: '1.06',
									}}
								>
									Make your resume into{' '}
									<Text.span inheritFont color="#6F7982">
										a job magnet with AI
									</Text.span>
								</Heading.h1>
							</motion.span>
							<motion.span
								className="text-center"
								variants={listVariant}
								key="2"
							>
								<Heading.h5
									className="max-w-[500px] m-auto mb-[32px]"
									align="center"
									color="#57636D"
									weight={500}
									style={{
										lineHeight: '1.5',
									}}
								>
									Elevate your resume from Couch Potato to Career Hotshot with
									the world best AI
								</Heading.h5>
							</motion.span>
							<motion.div variants={listVariant} key="3">
								<Flex gap={12}>
									<CallToAction.a href="/about" aria-label="About">
										Join Waitlist
									</CallToAction.a>
									<CallToAction.a href="/about" outline>
										Learn More
									</CallToAction.a>
								</Flex>
							</motion.div>
						</motion.div>
					</AnimatePresence>
				</Container>
			</header>
			<div className={styles.WaitlistHeaderImage}>
				<img src="/images/waitlist/bc-ballon.png" alt="Header Image" />
			</div>

			<motion.section
				className={styles.WaitlistSection}
				initial={{
					scale: 0.95,
					opacity: 0,
				}}
				viewport={{ once: true, amount: 0.3 }}
				whileInView={{
					scale: 1,
					opacity: 1,
					transition: {
						duration: 0.5,
					},
				}}
			>
				<Container maxWidth="lg">
					<Flex.Column
						className={styles.WaitlistSectionContent}
						justifyContent="center"
						alignItems="center"
						gap={8}
					>
						<a href="#">
							<Flex
								className={styles.WaitlistTagline}
								justifyContent="space-between"
								alignItems="center"
								gap={8}
								css={{ padding: '6px 12px' }}
							>
								<img src="/images/waitlist/section_tag.png" width={50} />
								<Text size="sm" color="#57636D" weight={500}>
									Be the first to get access
								</Text>
							</Flex>
						</a>

						<Heading.h3 weight={400} className="mt-[14px]" animate="slide">
							We're like your career matchmakers
						</Heading.h3>
						<Text color="#57636D" animate="fade">
							We polish your dating profile (your CV!) and set you up with your
							dream job.
						</Text>
					</Flex.Column>

					<div className={styles.FeatureGroup}>
						<Flex.Column gap={56} className={styles.FeatureItem}>
							{WaitlistInfo.map((info, index) => (
								<button
									key={index}
									className={styles.Feature}
									onClick={() =>
										setCurrentIndex(
											Math.max(0, Math.min(WaitlistInfo.length - 1, index))
										)
									}
								>
									<Flex.Column className={styles.AccordionContent} gap={14}>
										<Heading.h4 weight={400} animate="fade">
											{info.title}
										</Heading.h4>
										{index === currentIndex && (
											<Text color="#57636D" weight={500} animate="fade">
												{info.description}
											</Text>
										)}
									</Flex.Column>
								</button>
							))}
						</Flex.Column>

						<motion.div
							className={styles.FeatureImage}
							key={currentIndex}
							initial={{
								opacity: 0,
								y: 10,
							}}
							animate={{
								opacity: 1,
								y: 0,
								transition: {
									type: 'spring',
									damping: 10,
									stiffness: 100,
								},
							}}
						>
							<img
								src={WaitlistInfo[currentIndex].image}
								alt="Waitlist Image"
							/>
						</motion.div>
					</div>

					<Flex.Column
						gap={24}
						alignItems="center"
						justifyContent="center"
						className="mt-[112px]"
					>
						<Heading.h4 weight={400} className="mt-[14px]" animate="slide">
							Already Impressed ?
						</Heading.h4>
						<CallToAction.a href="/about" aria-label="About">
							Join Waitlist
						</CallToAction.a>
					</Flex.Column>
				</Container>
			</motion.section>

			<footer className={styles.WaitlistFooter}>
				<Heading.h6
					color="#57636D"
					weight={500}
					className="text-center"
					style={{
						lineHeight: '1.5',
					}}
				>
					Made with ❤️ by the{' '}
					<a
						href="https://twitter.com/mycroHQ"
						target="_blank"
						rel="noopener noreferrer"
					>
						<Text.span color="var(--primary-blue)" weight={500} inheritFont>
							Mycro
						</Text.span>{' '}
						{''}
					</a>
					team
				</Heading.h6>
			</footer>
		</div>
	);
};

// const Accordion = () => {
//   return (
//     <div className={styles.Accordion}>

//     </div>
//   )
// }
