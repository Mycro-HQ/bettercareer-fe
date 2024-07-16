import Image from 'next/image';

import { LandingHeading } from '../../components';

import { Text } from '@labs/components';

import { testimonials, TestimonialType } from './data';
import styles from './explore.module.scss';

export default function Explore() {
	const [col1, col2, col3] = [
		testimonials.slice(0, 2),
		testimonials.slice(2, 4),
		testimonials.slice(4),
	];

	return (
		<section className="bg-[#F9FAFA] w-full py-[72px]">
			<div className="container mx-auto">
				<LandingHeading
					mainText="Explore Advanced Features Designed  "
					afterLineBreak="for Easy "
					highlightedText="Job Search"
				/>
				<div className="flex flex-col lg:flex-row gap-6 w-full">
					{/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full"> */}
					<TestimonialColumn testimonials={col1} />
					<TestimonialColumn testimonials={col2} className="reverse" />
					<TestimonialColumn testimonials={col3} />
				</div>
			</div>
		</section>
	);
}

function TestimonialColumn({
	testimonials,
	className,
}: {
	testimonials: TestimonialType[];
	className?: string;
}) {
	return (
		<div className={`${styles.CardContainer} ${className || ''}`}>
			{testimonials.map((testimonial) => (
				<TestimonialCard {...testimonial} key={testimonial.key} />
			))}
		</div>
	);
}

function TestimonialCard({
	icon,
	picture,
	testimonial,
	user,
	username,
}: Omit<TestimonialType, 'key'>) {
	return (
		<div>
			<Image
				src={icon}
				alt="icon"
				width={23.69}
				height={22}
				className="mb-2 max-w-[23.69px] max-h-[22px]"
			/>
			<Text fontSize="var(--font-h6)" weight={600} lineHeight="26px">
				&ldquo;{testimonial}&rdquo;
			</Text>
			<div className="inline-flex">
				<Image
					src={picture}
					alt={user}
					width={32}
					height={32}
					className="mr-[0.6rem] aspect-auto max-w-8 max-h-8"
				/>
				<div className="flex flex-col *:min-h-4">
					<Text as="span" weight={600} color="#3f4c58">
						{user}
					</Text>
					<Text as="span" color="#57636D">
						@{username}
					</Text>
				</div>
			</div>
		</div>
	);
}
