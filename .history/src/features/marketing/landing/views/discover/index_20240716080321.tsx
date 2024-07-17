import { Heading, Text, CallToAction } from '@labs/components';

import styles from './discover.module.scss';

export default function Discover() {
	return (
		<div className={styles.ElevateCTAWrapper}>
			<div className="">
				<Heading
					weight={500}
					fontSize="40px"
					color="white"
					className="cta-header"
				>
					Ready to Elevate Your Career?
				</Heading>
				<div>
					<Text
						weight={500}
						lineHeight="26px"
						fontSize="var(--font-h6)"
						className="mt-3 text-white tracking-[-0.216px] max-w-[390px] mb-8"
					>
						Join BetterCareer Today to Access Cutting-Edge Tools and Discover
						Your Perfect Job Match
					</Text>
					<CallToAction
						variant="secondary"
						size="md"
						className="!text-[#3F4C58]"
					>
						Learn More
					</CallToAction>
				</div>
			</div>
		</div>
	);
}
