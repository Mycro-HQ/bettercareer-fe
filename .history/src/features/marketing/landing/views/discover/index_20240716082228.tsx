import Image from 'next/image';

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
				<Image
					src="/images/landing/Frame 1000001675.png"
					alt="icon"
					width={23.69}
					height={22}
					className=""
				/>
        <Image
					src="/images/landing/Frame 1000001675.png"
					alt="icon"
					width={23.69}
					height={22}
					className=""
				/>
				<CallToAction
					variant="secondary"
					size="md"
					className="!text-[#3F4C58] flex "
				>
					Learn More
				</CallToAction>
			</div>
		</div>
	);
}
