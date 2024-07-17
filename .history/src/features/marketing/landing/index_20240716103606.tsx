import {
	Explore,
	Testimonials,
	Advice,
	ElevateCTA,
	Footer,
	Discover,
	Transform,
	Boost,
	Nav,
} from './views';

export default function LandingPage() {
	return (
		<div className="w-full *:px-[15px] *:sm:px-[5%] *:lg:px-[8.5%]">
			<Nav />
			<Boost />
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
