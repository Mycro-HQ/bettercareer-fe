import {
	Explore,
	Testimonials,
	Advice,
	ElevateCTA,
	Footer,
	Discover,
	Transform,
} from './views';

export default function LandingPage() {
	return (
		<div className="w-full *:px-[15px] *:sm:px-[5%] *:lg:px-[8.5%]">
			<Transform />
			<Discover />
			<Explore />
			<Testimonials />
			<Advice />
			<ElevateCTA />
			<Footer />
		</div>
	);
}
