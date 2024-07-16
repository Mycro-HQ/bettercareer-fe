import Image from 'next/image';
import Link from 'next/link';

import { LandingHeading } from '../../components';

import { CallToAction, Text } from '@labs/components';

import { navs } from './data';
import styles from './nav.module.scss';

export default function Nav() {
	return (
		<section
			className={`${styles.gradientBackground} flex justify-between items-center align-middle w-full py-[.5rem]`}
		>
			<div className="flex">
				<Image
					src="/images/landing/LOGO.png"
					alt="Logo"
					width="200"
					height="38"
					className=""
				/>
			</div>
			<div className="flex justify-center ">
				<CallToAction variant="clear" size="lg" className="!text-[#000] flex ">
					Sign in
				</CallToAction>

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
