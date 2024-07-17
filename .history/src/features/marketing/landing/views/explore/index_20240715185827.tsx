import Image from 'next/image';

import { LandingHeading } from '../../components';

import { Text } from '@labs/components';

import { TestimonialType } from './data';
import styles from './explore.module.scss';

export default function Explore() {
	// const [col1, col2, col3] = [
	// 	testimonials.slice(0, 2),
	// 	testimonials.slice(2, 4),
	// 	testimonials.slice(4),
	// ];

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

					<div>Explore tab 1</div>
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

function ExploreTab2({
	testimonials,
	className,
}: {
	testimonials: TestimonialType[];
	className?: string;
}) {
	return (
		<div className={`${styles.CardContainer} ${className || ''}`}>
			{testimonials.map((testimonial) => (
				// <TestimonialCard {...testimonial} key={testimonial.key} />
			))}
		</div>
	);
}

// 
