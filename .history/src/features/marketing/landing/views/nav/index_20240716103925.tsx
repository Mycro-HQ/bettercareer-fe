import Image from 'next/image';
import Link from 'next/link';

import { LandingHeading } from '../../components';

import { CallToAction, Text } from '@labs/components';
import ArrowRight from '@labs/icons/misc/arrow-right.svg';

import { transform } from './data';
import styles from './nav.module.scss';

export default function Nav() {
	return (
		<section
			className={`${styles.gradientBackground} flex flex-col items-center w-full py-[.5rem]`}
		>
			<div className="flex justify-center mt-10 ">
				<CallToAction
					variant="primary"
					size="lg"
					className="!text-[#fff] flex "
				>
					Get Started Now
				</CallToAction>
			</div>
		</section>
	);
}
