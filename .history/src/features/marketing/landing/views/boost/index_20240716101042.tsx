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
			<LandingHeading
				mainText="Boost Your Job Search with"
				afterLineBreak="AI-Enhanced Resumes"
				highlightedText=""
			/>

			<div className="w-[354px] flex align-middle items-center justify-between m-10">
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
