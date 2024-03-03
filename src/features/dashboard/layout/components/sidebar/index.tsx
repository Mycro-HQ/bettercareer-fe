import React from 'react';
import classNames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Avatar, DropdownMenu } from '@radix-ui/themes';

import { Flex, Text } from '@labs/components';

import Logo from '@labs/icons/logo.svg';
import LogoMark from '@labs/icons/logo-mark.svg';

// sidebar icons
import Collapsible from '@labs/icons/dashboard/collapse.svg';
import ArrowDown from '@labs/icons/dashboard/down.svg';
import Home from '@labs/icons/dashboard/home.svg';
import Jobs from '@labs/icons/dashboard/jobs.svg';
import Matches from '@labs/icons/dashboard/match.svg';
import Applications from '@labs/icons/dashboard/applications.svg';
import ResumeIcon from '@labs/icons/dashboard/resumes.svg';
import Help from '@labs/icons/dashboard/help.svg';

import styles from './sidebar.module.scss';

export const DashboardSidebar = ({
	collapsed,
	setCollapsed,
}: {
	collapsed: boolean;
	setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	const router = useRouter();

	const Navigation = [
		{
			icon: Home,
			title: 'Home',
			href: '/dashboard',
		},
		{
			icon: Jobs,
			title: 'Jobs',
			href: '/dashboard/jobs',
		},
		{
			icon: Matches,
			title: 'Matches',
			href: '/dashboard/matches',
		},
		{
			icon: Applications,
			title: 'Applications',
			href: '/dashboard/applications',
		},
		{
			icon: ResumeIcon,
			title: 'Resumes',
			href: '/dashboard/resumes',
		},
	];
	return (
		<div
			className={classNames([
				styles.DashboardSidebar,
				collapsed && styles.DashboardSidebarCollapsed,
			])}
		>
			<Flex flexWrap="wrap" className={styles.DashboardSidebarHeader}>
				{collapsed ? <LogoMark /> : <Logo />}

				<button onClick={() => setCollapsed(!collapsed)}>
					<Collapsible />
				</button>
			</Flex>

			<DropdownMenu.Root>
				<DropdownMenu.Trigger>
					<div className={styles.DashboardSidebarProfile}>
						<Flex alignItems="center" gap={8}>
							<Avatar
								src=""
								fallback={'JD'}
								variant="solid"
								radius="full"
								size="2"
							/>
							<Text noOfLines={1}>John</Text>
						</Flex>
						<ArrowDown />
					</div>
				</DropdownMenu.Trigger>
				<DropdownMenu.Content>
					<DropdownMenu.Item shortcut="⌘ E">Edit</DropdownMenu.Item>
					<DropdownMenu.Item shortcut="⌘ D">Duplicate</DropdownMenu.Item>
					<DropdownMenu.Separator />
					<DropdownMenu.Item shortcut="⌘ N">Archive</DropdownMenu.Item>

					<DropdownMenu.Sub>
						<DropdownMenu.SubTrigger>More</DropdownMenu.SubTrigger>
						<DropdownMenu.SubContent>
							<DropdownMenu.Item>Move to project…</DropdownMenu.Item>
							<DropdownMenu.Item>Move to folder…</DropdownMenu.Item>

							<DropdownMenu.Separator />
							<DropdownMenu.Item>Advanced options…</DropdownMenu.Item>
						</DropdownMenu.SubContent>
					</DropdownMenu.Sub>

					<DropdownMenu.Separator />
					<DropdownMenu.Item>Share</DropdownMenu.Item>
					<DropdownMenu.Item>Add to favorites</DropdownMenu.Item>
					<DropdownMenu.Separator />
					<DropdownMenu.Item shortcut="⌘ ⌫" color="red">
						Delete
					</DropdownMenu.Item>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
			<Flex.Column justifyContent="space-between" className="min-h-[100%]">
				<div className={styles.DashboardSidebarMenu}>
					{Navigation.map((item, index) => (
						<Link
							href={item.href}
							key={index}
							className={classNames([
								styles.DashboardSidebarMenuItem,
								[router.asPath, router.pathname].includes(item.href) &&
									styles.active,
							])}
						>
							<item.icon />
							<Text>{item.title}</Text>
						</Link>
					))}
				</div>
				<div className={styles.DashboardSidebarMenu}>
					<a
						href="/dashboard"
						className={classNames([styles.DashboardSidebarMenuItem])}
					>
						<Help />
						<Text>Help Center</Text>
					</a>
				</div>
			</Flex.Column>
		</div>
	);
};
