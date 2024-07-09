import Image from 'next/image';
import Link from 'next/link';

import { Text } from '@labs/components';

import { footerLinks } from './data';

export default function Footer() {
	return (
		<footer className="bg-white">
			<Top />
			<Line />
			<Bottom />
		</footer>
	);
}

function Top() {
	return (
		<div className="pb-[5.5rem] mx-auto">
			<div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
				<div>
					<div className="flex justify-center sm:justify-start">
						<Image
							src="/images/landing/footer-logo.png"
							alt="Logo"
							width="200"
							height="36"
						/>
					</div>

					<Text
						size="sm"
						color="#3F4C58"
						lineHeight="20px"
						weight={500}
						align="center"
						className="mt-3.5 tracking-[-0.28px] max-w-[193px] mx-auto sm:mx-0 sm:!text-left"
					>
						Boost Your Job Search with AI. Find Your Perfect Job Faster!
					</Text>
				</div>

				<div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4 lg:col-span-2">
					{footerLinks.map((footerLink) => (
						<LinkColumn
							key={footerLink.header}
							title={footerLink.header}
							links={footerLink.links}
						/>
					))}
				</div>
			</div>
		</div>
	);
}

const Line = () => <hr className="text-[#E7E9EB] h-px" />;

function Bottom() {
	return (
		<div className="pt-8 pb-10 flex flex-col sm:flex-row gap-4 md:gap-0 justify-between items-center">
			<Text color="#57636D" weight={500} lineHeight="24px">
				© 2024 BetterCareer. All rights reserved.
			</Text>
			<div className="flex items-center gap-x-6">
				<a href="https://twitter.com/mycroHQ">
					<Image
						src="/images/landing/x.svg"
						alt="Twitter/X"
						width="24"
						height="24"
					/>
				</a>
				<a href="https://www.linkedin.com/showcase/better-career-me/about/">
					<Image
						src="/images/landing/linkedin.svg"
						alt="LinkedIn"
						width="24"
						height="24"
					/>
				</a>
				<a href="https://www.instagram.com/bettercareer.me?igsh=eTY2c3ZtYXdtYWFq">
					<Image
						src="/images/landing/instagram.svg"
						alt="Instagram"
						width="24"
						height="24"
					/>
				</a>
				<a href="mailto:">
					<Image
						src="/images/landing/mail.svg"
						alt="Mail"
						width="24"
						height="24"
					/>
				</a>
			</div>
		</div>
	);
}

function LinkColumn({
	title,
	links,
}: {
	title: string;
	links: {
		key: number;
		path: string;
		title: string;
	}[];
}) {
	return (
		<div className="text-center sm:text-left">
			<Text
				color="#6F7982"
				weight={600}
				lineHeight="16px"
				casing="uppercase"
				className="tracking-[-0.08px]"
			>
				{title}
			</Text>

			<ul className="mt-8 flex flex-col gap-y-8">
				{links.map((link) => (
					<li key={link.key}>
						<Link
							className="text-[#0F1F2E] text-base font-medium leading-4 tracking-[-0.16px]"
							href={link.path}
						>
							{link.title}
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
}
