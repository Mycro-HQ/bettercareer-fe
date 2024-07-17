import Image from 'next/image';
import { useState } from 'react';

import { LandingHeading } from '../../components';

import { Heading as LabsHeading } from '@labs/components';

import { jumbotrons } from './data';

export default function Explore() {
	return (
		<section className="bg-[#ffff] h-auto w-full py-[72px] lg:h-[90vh]">
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

function ExploreTab1({}) {
	return (
		<div className="w-full lg:w-[646px] h-[480px] bg-[#f9fafa] flex items-center justify-center text-center rounded-3xl p-8">
			<Image
				alt="Resume and AI Write Component"
				src="/images/landing/Frame 1000001717.png"
				width={646}
				height={480}
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
		<div className="w-full lg:w-[646px] h-auto bg-[#fff] rounded-3xl p-8 overflow-auto">
			{jumbotrons.map((item, index) => (
				<div key={item.key} className="mb-4">
					<div
						className={`flex justify-between items-center p-4 bg-white cursor-pointer ${
							activeIndex === index ? 'bg-gray-100' : ''
						}`}
						onClick={() => handleToggle(index)}
					>
						<LabsHeading lineHeight="28px" weight={500} align="center" as="h4">
							{item.Question}
						</LabsHeading>
						<span
							className={`text-5xl font-bold transition-transform ${activeIndex === index ? 'text-grey-400' : 'text-greay-400'}`}
						>
							{activeIndex === index ? '×' : '+'}
						</span>
					</div>
					{activeIndex === index && (
						<div className="p-4 bg-white text-left font-thin text-[#f9fafaf] rounded-b-lg shadow-inner">
							{item.answer}
						</div>
					)}
				</div>
			))}
		</div>
	);
}
