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
		<div className="w-[646px] h-[480px] bg-[#f9fafa] items-center align-middle text-center rounded-3xl ">
			{' '}
			<Image
				alt=""
				src="/images/landing/Frame 1000001717.png"
				width={124}
				height={124}
        className="w-[472px] h-[458px] "
			/>{' '}
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
