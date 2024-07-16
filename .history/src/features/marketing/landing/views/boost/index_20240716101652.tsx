import Image from 'next/image';
import Link from 'next/link';

import { LandingHeading } from '../../components';

import { CallToAction, Text } from '@labs/components';
import ArrowRight from '@labs/icons/misc/arrow-right.svg';

import { boost } from './data';
import styles from './boost.module.scss';

export default function Boost() {
	return (
		<section className="bg-white flex flex-col items-center w-full py-[.5rem]">
			<div className="flex items-center space-x-2 p-2 bg-white rounded-full shadow-md">
				<Image
					src="/images/landing/Group 36883.png"
					alt="users"
					width="391"
					height="391"
					className="rounded-3xl mb-9 bg-[#F7FAF9] aspect-square"
				/>
				<div className="flex items-center space-x-1">
					<span className="text-gray-700 font-medium">
						Join over 1k people on our waitlist
					</span>
				</div>
			</div>

			<LandingHeading
				mainText="Boost Your Job Search with"
				afterLineBreak="AI-Enhanced Resumes"
				highlightedText=""
			/>

			<div className="w-[354px] flex align-middle items-center justify-between mb-10">
				<CallToAction
					variant="primary"
					size="lg"
					className="!text-[#fff] flex "
				>
					Get Started
				</CallToAction>

				<CallToAction
					outline={false}
					variant="secondary"
					size="lg"
					className="!text-[#000] flex "
				>
					Find Jobs
				</CallToAction>
			</div>

			<div className="flex flex-col items-center md:items-start md:flex-row flex-wrap gap-8">
				{boost.map((a) => (
					<div key={a.key} className="flex-1">
						<Image
							src={a.image}
							alt={a.title}
							width="391"
							height="391"
							placeholder="blur"
							blurDataURL={a.dataURL}
							className="rounded-3xl cursor-pointer mb-9 aspect-square"
						/>
					</div>
				))}
			</div>
		</section>
	);
}
