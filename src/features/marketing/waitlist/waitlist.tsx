import React, { useCallback } from 'react';
import {
	CallToAction,
	Container,
	Flex,
	Heading,
	Text,
	useToast,
} from '@labs/components';
import { AnimatePresence, motion } from 'framer-motion';

import Logo from '@labs/icons/logo.svg';
import Arrow from '@labs/icons/misc/arrow-right.svg';
import Close from '@labs/icons/misc/close.svg';

import { WaitlistInfo } from '.';
import { Modal } from '@labs/components/modal';

import styles from './waitlist.module.scss';
import DragAndDrop from '@/components/drag-and-drop';
import { useSendWaitlistMutation } from '@/queries/marketing';
import { formDataAppender } from '@labs/utils';
import analytics from '@lib/analytics';

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
					<CallToAction.button
						onClick={() => {
							analytics.track('waitlist_join_clicked');
							return setIsOpen(true);
						}}
					>
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
								onClick={() => {
									analytics.track('waitlist_join_clicked');
									return setIsOpen(true);
								}}
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
										Join our growing circle of early adopters.
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
										maxWidth: '820px',
										lineHeight: '1.06',
									}}
								>
									Boost your job search with{' '}
									<Text.span inheritFont color="#6F7982">
										AI-resumes. Get hired!
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
									Level up your job search with our AI assistant. Create
									ATS-beating resumes & find jobs you love.
								</Heading.h5>
							</motion.span>
							<motion.div variants={listVariant} key="3">
								<Flex gap={12}>
									<CallToAction.button
										onClick={() => {
											analytics.track('waitlist_join_clicked');
											return setIsOpen(true);
										}}
									>
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
				viewport={{ once: true, amount: 0.35 }}
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
						<button
							onClick={() => {
								analytics.track('waitlist_join_clicked');
								return setIsOpen(true);
							}}
						>
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
						</button>

						<Heading.h3 weight={400} className="mt-[14px]" animate="slide">
							Find Your Perfect Fit, Land Your Dream Job.
						</Heading.h3>
						<Text color="#57636D" animate="fade">
							We refine your resume and and set you up with your dream job.
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
											<AnimatePresence></AnimatePresence>
											<motion.span
												key={index}
												initial={{ opacity: 0, x: 10 }}
												animate={{ opacity: 1, x: 0 }}
												exit={{ opacity: 0 }}
											>
												{index === currentIndex ? null : <Arrow />}
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
						<CallToAction.button
							onClick={() => {
								analytics.track('waitlist_join_clicked');
								return setIsOpen(true);
							}}
						>
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
							href="https://www.linkedin.com/showcase/better-career-me/about/"
							target="_blank"
							rel="noopener noreferrer"
							className="underline"
						>
							Linkedin
						</a>
						<a
							href="https://www.instagram.com/bettercareer.me?igsh=eTY2c3ZtYXdtYWFq"
							target="_blank"
							rel="noopener noreferrer"
							className="underline"
						>
							Instagram
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
	type WaitlistState = {
		name: string;
		email: string;
		files: File[];
	};
	const { createToast } = useToast();
	const [isSuccess, setIsSuccess] = React.useState(false);
	const { mutateAsync: joinWaitlist, isPending } = useSendWaitlistMutation();
	const [waitlistState, setWaitlistState] = React.useState<WaitlistState>({
		name: '',
		email: '',
		files: [],
	});

	const updateStateValue = useCallback(
		(key: 'name' | 'email' | 'files', value: string | File[]) => {
			setWaitlistState((prev) => ({ ...prev, [key]: value }));
		},
		[]
	);

	async function handleSubmit(
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) {
		e.preventDefault();
		const { name, email, files } = waitlistState;

		if (!name || !email) {
			return createToast({
				message: 'Please we need your name and email to join the waitlist',
				variant: 'error',
			});
		}

		try {
			await joinWaitlist(
				formDataAppender({
					name,
					email,
					resume: files[0],
				})
			);

			setIsSuccess(true);

			setTimeout(() => {
				setIsOpen(false);
			}, 5000);

			setWaitlistState({
				name: '',
				email: '',
				files: [],
			});
		} catch (error: any) {
			createToast({
				message: error?.message ?? 'An error occurred, please try again',
				variant: 'error',
			});
		}
	}

	return (
		<Modal in={isOpen} onClose={() => setIsOpen(false)}>
			{!isSuccess ? (
				<>
					<Flex.Column gap={2} alignItems="center">
						<Heading.h4 weight={400} animate="slide" align="center">
							Join waitlist and get early access
						</Heading.h4>
						<Text align="center" color="#57636D" animate="fade">
							Just a few clicks away from joining the future.
						</Text>
					</Flex.Column>
					<Container>
						<form className={styles.WaitlistForm}>
							<Flex.Column gap={8}>
								<input
									type="text"
									placeholder="Full Name"
									required
									name="name"
									value={waitlistState.name}
									onChange={(e) => updateStateValue('name', e.target.value)}
								/>
								<input
									type="email"
									placeholder="Email"
									required
									pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
									name="email"
									value={waitlistState.email}
									onChange={(e) => updateStateValue('email', e.target.value)}
								/>
							</Flex.Column>
							<label className="mt-[22px] block ">
								<Text weight={700}>Your CV (optional)</Text>
								<Text color="#57636D" size="sm">
									Be among the first to get a free resume analysis before we
									launch
								</Text>
							</label>
							<DragAndDrop
								size="md"
								className="mt-5 mb-6"
								onDrop={(files) => {
									return updateStateValue('files', files);
								}}
							/>
							<CallToAction.button
								isLoading={isPending}
								className="ml-auto"
								onClick={handleSubmit}
							>
								Join Waitlist
							</CallToAction.button>
						</form>
					</Container>
				</>
			) : (
				<Flex.Column gap={2} alignItems="center">
					<Logo width={120} />
					<Heading.h4
						weight={400}
						animate="slide"
						align="center"
						className="max-w-[400px] m-auto mt-4 mb-2"
					>
						Congratulations! You have successfully joined the waitlist
					</Heading.h4>
					<Text align="center" color="#57636D" animate="fade" className="mb-6">
						Keep an eye on your email for updates
					</Text>
					<CallToAction.button
						className="mb-2"
						onClick={() => {
							return setIsOpen(false);
						}}
					>
						Close
					</CallToAction.button>
				</Flex.Column>
			)}
		</Modal>
	);
};
