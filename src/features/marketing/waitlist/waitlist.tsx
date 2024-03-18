import React from 'react';
import { CallToAction, Container, Flex, Heading, Text } from '@labs/components';
import { AnimatePresence, motion } from 'framer-motion';

import Logo from '@labs/icons/logo.svg';
import Arrow from '@labs/icons/misc/arrow-right.svg';
import Close from '@labs/icons/misc/close.svg';

import { WaitlistInfo } from '.';
import { Modal } from '@labs/components/modal';

import styles from './waitlist.module.scss';
import DragAndDrop from '@/components/DragAndDrop';

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

export const Waitlist = () => {
	const [isOpen, setIsOpen] = React.useState(false);

	const [currentIndex, setCurrentIndex] = React.useState(0);

	return (
		<div className={styles.Waitlist}>
			<Container maxWidth="xl">
				<nav className={styles.WaitlistHeaderNav}>
					<div className={styles.WaitlistHeaderNavLogo}>
						<Logo />
					</div>
					<CallToAction.button onClick={() => setIsOpen(true)}>
						Join Waitlist
					</CallToAction.button>
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
							<motion.button
								onClick={() => setIsOpen(true)}
								variants={listVariant}
								key="6"
							>
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
							</motion.button>
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
									<CallToAction.button onClick={() => setIsOpen(true)}>
										Join Waitlist
									</CallToAction.button>
									<CallToAction.a href="#section" outline>
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
				id="section"
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
										<Flex
											fullWidth
											justifyContent="space-between"
											alignItems="center"
											gap={8}
										>
											<Heading.h4 weight={400} animate="fade">
												{info.title}
											</Heading.h4>
											<AnimatePresence></AnimatePresence>`
											<motion.span
												key={index}
												initial={{ opacity: 0, x: 10 }}
												animate={{ opacity: 1, x: 0 }}
												exit={{ opacity: 0 }}
											>
												{index === currentIndex ? <Close /> : <Arrow />}
											</motion.span>
										</Flex>
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
						<CallToAction.button onClick={() => setIsOpen(true)}>
							Join Waitlist
						</CallToAction.button>
					</Flex.Column>
				</Container>
			</motion.section>
			<Container maxWidth="lg">
				<footer className={styles.WaitlistFooter}>
					<Text
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
					</Text>

					<Flex.Row gap={12}>
						<Text color="#57636D" weight={700}>
							Follow us on:{' '}
						</Text>
						<a
							href="https://twitter.com/mycroHQ"
							target="_blank"
							rel="noopener noreferrer"
							className="underline"
						>
							Twitter
						</a>
						<a
							href="https://www.linkedin.com/showcase/102231354/admin/feed/posts/"
							target="_blank"
							rel="noopener noreferrer"
							className="underline"
						>
							Linkedin
						</a>
					</Flex.Row>
				</footer>
				<WaitListModal isOpen={isOpen} setIsOpen={setIsOpen} />
			</Container>
		</div>
	);
};

const WaitListModal = ({
	isOpen,
	setIsOpen,
}: {
	isOpen: boolean;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	return (
		<Modal in={isOpen} onClose={() => setIsOpen(false)}>
			<Flex.Column gap={2} alignItems="center">
				<Heading.h4 weight={400} animate="slide" align="center">
					Join waitlist for early access
				</Heading.h4>
				<Text align="center" color="#57636D" animate="fade">
					Just a little more details and we are good
				</Text>
			</Flex.Column>
			<Container>
				<form className={styles.WaitlistForm}>
					<Flex.Column gap={8}>
						<input type="text" placeholder="Full Name" />
						<input type="email" placeholder="Email" />
					</Flex.Column>
					<label className="mt-[22px] block -mb-[14px]">
						<Text color="#57636D" weight={700}>
							Your CV (optional)
						</Text>
						<Text color="#6F7982" size="sm">
							Let's give you a free resume analysis before you launch
						</Text>
					</label>
					<DragAndDrop onDrop={() => null} />
					<CallToAction.button className="ml-auto">
						Join Waitlist
					</CallToAction.button>
				</form>
			</Container>
		</Modal>
	);
};
