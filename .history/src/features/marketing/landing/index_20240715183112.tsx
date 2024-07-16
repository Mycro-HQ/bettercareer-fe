import { Explore, Testimonials, Advice, ElevateCTA, Footer } from './views';

export default function LandingPage() {
	return (
		<div className="w-full *:px-[15px] *:sm:px-[5%] *:lg:px-[8.5%]">
      <Explore />
			<Testimonials />
			<Advice />
			<ElevateCTA />
			<Footer />
		</div>
	);
}
