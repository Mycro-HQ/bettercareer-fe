import React from 'react';
import styles from './jobs.module.scss';
import { Text, Flex } from '@labs/components';
import classNames from 'classnames';
import LikeIcon from '../../../../../public/images/dashboard/like.svg';

interface JobCardProps extends React.HTMLAttributes<HTMLDivElement> {
	companyLogo: React.ReactNode;
	jobTitle: string;
	companyName: string;
	location: string;
	salaryRange: string;
	tags: string[];
	time: string;
}

export default function JobCard({
	companyLogo,
	jobTitle,
	companyName,
	location,
	salaryRange,
	tags,
	time,
	className,
	onClick,
}: JobCardProps) {
	const [clicked, setClicked] = React.useState(false);
	return (
		<Flex.Column
			gap={32}
			className={classNames(styles.JobCard, className)}
			onClick={onClick}
		>
			<Flex gap={12} justifyContent="space-between">
				<Flex.Row gap={18}>
					{companyLogo}
					<Flex.Column gap={4} className="font-[Figtree]">
						<Text as="span" weight={600} fontSize="18px" inheritFont>
							{jobTitle}
						</Text>
						<Text
							color="var(--text-gray)"
							weight={500}
							lineHeight="24px"
							inheritFont
						>
							{companyName}
							<Separator />
							{location}
							<Separator />
							{salaryRange}
						</Text>
					</Flex.Column>
				</Flex.Row>
				<div className="h-min p-2 mt-[5px] rounded-lg border border-solid border-[#E7E9EB]">
					<LikeIcon
						onClick={() => setClicked((prev) => !prev)}
						className={clicked && 'fill-[var(--primary-error)]'}
					/>
				</div>
			</Flex>
			<Flex.Row justifyContent="space-between" alignItems="center">
				<JobTagsContainer tags={tags} />
				<Text
					as="span"
					lineHeight="20px"
					size="sm"
					color="var(--text-gray)"
					weight={500}
					className="py-[6px] px-4 md:p-0"
				>
					{time}
				</Text>
			</Flex.Row>
		</Flex.Column>
	);
}

export function Separator() {
	return (
		<Text as="span" weight={700} lineHeight="24px">
			{' '}
			.{' '}
		</Text>
	);
}

function JobTagsContainer({ tags }: { tags: string[] }) {
	return (
		<Flex.Row gap={8}>
			{tags.map((tag) => (
				<JobTag key={tag} tag={tag} />
			))}
		</Flex.Row>
	);
}

function JobTag({ tag }: { tag: string }) {
	return (
		<Text
			as="span"
			size="sm"
			weight={600}
			lineHeight="20px"
			className={styles.JobTag}
		>
			{tag}
		</Text>
	);
}
