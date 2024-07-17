import Image from 'next/image';
import { useState } from 'react';

import { LandingHeading } from '../../components';

import { Heading as LabsHeading } from '@labs/components';

import { jumbotrons } from './data';


export default function Explore() {
	return (
		<section className="bg-[#ffff] h-[90vh] w-full py-[72px]">
			<div className="container mx-auto">
				<LandingHeading
					mainText="Explore Advanced Features Designed  "
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

function ExploreTab1({}: {}) {
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
		<div className="w-full lg:w-[646px] h-auto bg-[#fff] rounded-3xl p-8 overflow-auto">
			{jumbotrons.map((item, index) => (
				<div key={item.key} className="mb-4">
					<div
						className={`flex justify-between items-center p-4 bg-white  cursor-pointer ${activeIndex === index ? 'bg-gray-100' : ''}`}
						onClick={() => handleToggle(index)}
					>
						<LabsHeading
							lineHeight="28px"
							weight={500}
							align="center"
							className="h-10 w-10 "
						>
							{item.Question}
						</LabsHeading>
						<span
							className={`${activeIndex === index ? 'transform rotate-45' : ''} transition-transform`}
						>
							{activeIndex === index ? '×' : '+'}
						</span>
					</div>
					{activeIndex === index && (
						<div className="p-4 bg-white rounded-b-lg shadow-inner">
							{item.answer}
						</div>
					)}
				</div>
			))}
		</div>
	);
}
