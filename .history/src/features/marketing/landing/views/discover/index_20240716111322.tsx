import Image from 'next/image';

import { Heading, CallToAction } from '@labs/components';

import styles from './discover.module.scss';

export default function Discover() {
	return (
		<div className={styles.ElevateCTAWrapper}>
			<div>
				<Heading
					weight={500}
					color="white"
					className={`${styles.ctaHeader} cta-header`}
				>
					Discover Your Dream Job and Access Thousands of Top Companies
				</Heading>
				<Image
					src="/images/landing/Frame 1000001675.png"
					alt="icon"
					width={1872}
					height={104}
					className={styles.image}
				/>
				<Image
					src="/images/landing/Frame 1000001676.png"
					alt="icon"
					width={1865}
					height={104}
					className={styles.image}
				/>
				<CallToAction
					variant="secondary"
					size="md"
					className="!text-[#3F4C58] flex"
				>
					Learn More
				</CallToAction>
			</div>
		</div>
	);
}
