import React, { useState } from 'react';
import * as RadioGroup from '@radix-ui/react-radio-group';

import { OnboardingLayout } from '.';
import { CallToAction, Flex, Heading, Text } from '@labs/components';

import LinkedInIcon from '@labs/icons/socials/linkedin.svg';
import GoogleIcon from '@labs/icons/socials/google.svg';
import LogoMark from '@labs/icons/logo-mark.svg';
import styles from './onboarding.module.scss';

import { AnimatePresence, motion } from 'framer-motion';
import { useInterval } from '@labs/utils/hooks/useInterval';

import DragAndDrop from '@/components/DragAndDrop';
import Image from 'next/image';
import { Button } from '@radix-ui/themes';

function getSizeFormat(
	b: number,
	factor: number = 1024,
	suffix: string = 'B'
): string {
	/**
	 * Scale bytes to its proper byte format
	 * e.g:
	 *   1253656 => '1.20MB'
	 *   1253656678 => '1.17GB'
	 * @param b The size in bytes.
	 * @param factor The factor to divide by.
	 * @param suffix The suffix to add to the end.
	 */
	const units: string[] = ['', 'K', 'M', 'G', 'T', 'P', 'E', 'Z'];

	for (const unit of units) {
		if (b < factor) {
			return `${b.toFixed(2)}${unit}${suffix}`;
		}
		b /= factor;
	}

	return `${b.toFixed(2)}Y${suffix}`;
}

export const UploadResume = () => {
	const [files, setFiles] = useState<File[] | null>(null);
	const [dragIsOver, setDragIsOver] = useState(false);
	const multiple = false;

	return (
		<OnboardingLayout title="Upload Resume" adjacentContent={<OnboardCards />}>
			<AnimatePresence>
				<div className={styles.AuthLayout}>
					<motion.div
						initial={{ opacity: 0, y: 15 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: 15 }}
					>
						<Flex.Column gap={14}>
							<Heading.h3>Upload Resume</Heading.h3>
							<Heading.h5>
								Use a PDF format only, with a maximum file size of 5MB.
							</Heading.h5>

							<Flex.Column gap={18} className="mt-[48px]">
								{(!files || files.length !== 1) && (
									<DragAndDrop
										multiple={multiple}
										accept="application/pdf"
										onDrop={(files) => console.log(files)}
										onDragOver={() => console.log('dragging')}
										setFiles={setFiles}
									/>
								)}
								{files &&
									files.map((file) => (
										<Flex
											direction="row"
											alignItems="center"
											justifyContent="space-between"
											key={file.name + file.size}
											className={styles.FileListItem}
										>
											<Flex.Row>
												<Image
													src="/document.svg"
													alt="Document"
													width={19.744}
													height={23.563}
													className={styles.FileListDocumentIcon}
												/>
												<Flex.Column>
													<Text className={styles.FileListItemTitle}>
														{file.name}
													</Text>
													<Text>{getSizeFormat(file.size)}</Text>
												</Flex.Column>
											</Flex.Row>
											<Image
												src="/delete.svg"
												alt="Delete your file"
												width={24}
												height={24}
											/>
										</Flex>
									))}
							</Flex.Column>
							<Flex gap={8} className="mt-[24px]">
								<CallToAction>Continue</CallToAction>
								<CallToAction.a href="/login" outline>
									Skip
								</CallToAction.a>
							</Flex>
						</Flex.Column>
					</motion.div>
				</div>
			</AnimatePresence>
		</OnboardingLayout>
	);
};

const sliderVariant = {
	hidden: { opacity: 0.4, scale: 0.9, y: 8 },
	visible: { opacity: 1, scale: 1, y: 0 },
	exit: { opacity: 0, scale: 0.95, y: -8 },
};

const MESSAGE = [
	{
		message:
			'"BetterCareer.me is a game-changer! The AI tools analyzed my skills and matched me with jobs I never thought I could qualify for. The expert guidance helped me write a killer resume and ace my interviews. I landed my dream job in just a few months!"',
		author: {
			name: 'John Doe',
			title: 'Software Engineer',
			image: 'https://picsum.photos/200',
		},
	},
	{
		message:
			'I was skeptical at first, but BetterCareer.me helped me land my dream job in just a few months! The AI tools analyzed my skills and matched me with jobs I never thought I could qualify for. The expert guidance helped me write a killer resume and ace my interviews.',
		author: {
			name: 'Jane Doe',
			title: 'Software Engineer',
			image: 'https://picsum.photos/400',
		},
	},
];

const OnboardCards = () => {
	const [activeMessage, setActiveMessage] = useState(0);
	const currentMessage = MESSAGE[activeMessage];
	useInterval(() => {
		setActiveMessage((activeMessage + 1) % MESSAGE.length);
	}, 4000);

	return (
		<AnimatePresence mode="wait">
			{/* create a stack illusion */}
			<motion.div className={styles.OnboardCardWrap}>
				<motion.div
					initial={{ opacity: 0, scale: 0.9 }}
					animate={{ opacity: 1, scale: 1 }}
					exit={{ opacity: 0, scale: 0.95 }}
					key={`${activeMessage}-1`}
					className={styles.OnboardCardStack}
				/>

				<motion.div
					className={styles.OnboardCard}
					variants={sliderVariant}
					initial="hidden"
					animate="visible"
					exit="exit"
					transition={{ duration: 0.5 }}
					key={activeMessage}
				>
					<LogoMark />
					<Heading.h4 fontSize="18px" lineHeight="110%" weight={700}>
						{currentMessage.message}
					</Heading.h4>
					<Flex className={styles.AuthWrapAuthor}>
						<img
							src={currentMessage.author.image}
							alt={currentMessage.author.name}
						/>
						<Flex.Column gap={1} className="mt-[10px]">
							<Heading.h6 weight={800}>{currentMessage.author.name}</Heading.h6>
							<Text>{currentMessage.author.title}</Text>
						</Flex.Column>
					</Flex>
				</motion.div>
			</motion.div>
		</AnimatePresence>
	);
};
