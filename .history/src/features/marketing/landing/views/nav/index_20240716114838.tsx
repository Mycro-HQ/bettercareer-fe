import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { LandingHeading } from '../../components';

import { CallToAction, Text } from '@labs/components';

import { navs } from './data';
import styles from './nav.module.scss';

export default function Nav() {
	const [menuOpen, setMenuOpen] = useState(false);

	const toggleMenu = () => {
		setMenuOpen(!menuOpen);
	};

	return (
		<section
			className={`${styles.gradientBackground} flex flex-col md:flex-row justify-between items-center w-[1000px] py-4 `}
		>
			<div className="w-full md:w-60 flex justify-between">
				<Image
					src="/images/landing/LOGO.png"
					alt="Logo"
					width="200"
					height="38"
					className="mb-4 md:mb-0 mr-3"
				/>

				<button
					type="button"
					className="md:hidden mb-4 md:mb-0"
					onClick={toggleMenu}
				>
					<span className="icon-burger-menu"></span>{' '}
					<Image
						src="/images/landing/gradient-logo.png"
						alt="Logo"
						width="20"
						height="20"
						className="mb-4 md:mb-0 mr-3"
					/>
				</button>
			</div>

			<div
				className={`flex flex-col md:flex-row mb-4 md:mb-0 ${menuOpen ? '' : 'hidden'} md:flex`}
			>
				{navs.map((a) => (
					<Link key={a.key} href={a.path} className="mb-2 md:mb-0 md:mr-4">
						<Text
							className="tracking-[0.032px]"
							color="#0F1F2E"
							weight={600}
							fontSize="var(--font-p)"
							lineHeight="29px"
						>
							{a.title}
						</Text>
					</Link>
				))}
			</div>

			<div
				className={`flex flex-col md:flex-row justify-center ${menuOpen ? '' : 'hidden'} md:flex`}
			>
				<CallToAction
					variant="clear"
					size="lg"
					className="!text-[#000] flex mb-2 md:mb-0 md:mr-4"
				>
					Sign in
				</CallToAction>
				<CallToAction variant="primary" size="lg" className="!text-[#fff] flex">
					Get Started Now
				</CallToAction>
			</div>
		</section>
	);
}
