import React, { useState } from 'react';
import Image from 'next/image';

import { LandingHeading } from '../../components';

import { JumbotronType, jumbotrons } from './data';
import styles from './explore.module.scss';

export default function Explore() {
	return (
		<section className="bg-[#ffff] h-[90vh] w-full py-[72px]">
			<div className="container mx-auto">
				<LandingHeading
					mainText="Explore Advanced Features Designed "
					afterLineBreak="for Easy "
					highlightedText="Job Search"
				/>
				<div className="flex flex-col justify-between align-middle text-center lg:flex-row gap-6 w-full">
					<ExploreTab1 />
					<ExploreTab2 />
				</div>
			</div>
		</section>
	);
}

function ExploreTab1() {
	return (
		<div className="w-[646px] h-[480px] bg-[#f9fafa] flex items-center justify-center text-center rounded-3xl p-8">
			<Image
				alt="Resume and AI Write Component"
				src="/images/landing/Frame 1000001717.png"
				width={472}
				height={458}
				className="w-[472px] h-[458px]"
			/>
		</div>
	);
}

function ExploreTab2() {
	const [activeIndex, setActiveIndex] = useState<number | null>(null);

	const handleToggle = (index: number) => {
		setActiveIndex(activeIndex === index ? null : index);
	};

	return (
		<div className="w-full lg:w-[646px] h-[480px] bg-[#f9fafa] rounded-3xl p-8 overflow-auto">
			{jumbotrons.map((item, index) => (
				<div key={item.key}>
					<div
						className={`${styles.question} ${activeIndex === index ? 'text-blue-600' : ''}`}
						onClick={() => handleToggle(index)}
					>
						{item.Question}
						<span
							className={`${styles.icon} ${activeIndex === index ? 'rotate' : ''}`}
						>
							{activeIndex === index ? '×' : '+'}
						</span>
					</div>
					<div
						className={`${styles.answer} ${activeIndex === index ? 'active' : ''}`}
					>
						{item.answer}
					</div>
				</div>
			))}
		</div>
	);
}
