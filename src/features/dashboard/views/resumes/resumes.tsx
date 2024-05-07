import React from 'react';

import Link from 'next/link';

import { CallToAction, Flex, Heading, Text } from '@labs/components';
import WavingHandIcon from '@labs/icons/dashboard/wave-hand.svg';

import { type UserData } from '@/queries/types/user';

import styles from './home.module.scss';
import { AllResumes } from '../home/components/all-resumes';

export const Resumes = () => {
	return (
		<Flex.Column>
			<Flex.Column gap={6}>
				<Flex alignItems="center" gap={12}>
					<Heading.h3 weight={400} animate="slide">
						My Resumes
					</Heading.h3>
					<WavingHandIcon width="24" height="24" />
				</Flex>

				<Text color="var(--text-gray)" animate="fade" className="mb-[40px]">
					All Your Resumes in One Place: Manage and access your resumes easily.
				</Text>
			</Flex.Column>

			<Flex.Column gap={24}>
				<AllResumes limit={10} hasAdd />
			</Flex.Column>
		</Flex.Column>
	);
};
