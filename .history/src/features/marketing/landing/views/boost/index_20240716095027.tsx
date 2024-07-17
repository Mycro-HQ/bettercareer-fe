import Image from 'next/image';
import Link from 'next/link';

import { LandingHeading } from '../../components';

import { Text } from '@labs/components';
import ArrowRight from '@labs/icons/misc/arrow-right.svg';

import { boost } from './data';
import styles from './boost.module.scss';

export default function Boost() {
	return (
		<section className="bg-white w-full py-[7.5rem]">
			<LandingHeading
				mainText="Boost Your Job Search "
				afterLineBreak="with AI-Enhanced Resumes"
				highlightedText=""
			/>
			<div className="flex flex-col items-center md:items-start md:flex-row flex-wrap gap-8">
				{boost.map((a) => (
					<div key={a.key} className="flex-1">
						<Image
							src={a.image}
							alt={a.title}
							width="391"
							height="391"
							placeholder="blur"
							blurDataURL={a.dataURL}
							className="rounded-3xl mb-9 aspect-square"
						/>
						<Text
							className="font-[Recoleta] tracking-[0.032px] mb-2"
							color="#0F1F2E"
							weight={600}
							fontSize="var(--font-h5)"
							lineHeight="29px"
						>
							{a.title}
						</Text>
						<Text
							weight={500}
							color="#3F4C58"
							lineHeight="23px"
							className="tracking-[-0.192px] mb-8 sm:max-w-96"
						>
							{a.subtitle}
						</Text>
						<Link href={a.path} className={styles.ReadMore}>
							Read More
							<ArrowRight />
						</Link>
					</div>
				))}
			</div>
		</section>
	);
}
