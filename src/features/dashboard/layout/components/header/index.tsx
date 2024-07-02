import React from 'react';
import { Avatar, DropdownMenu, TextField } from '@radix-ui/themes';
import Link from 'next/link';
import classNames from 'classnames';
import { useRouter } from 'next/router';

import { CallToAction, Container, Flex, Text } from '@labs/components';
import MagnifyingGlassIcon from '@labs/icons/dashboard/search.svg';
import BellIcon from '@labs/icons/dashboard/notification.svg';
import Profile from '@labs/icons/dashboard/profile.svg';
import SettingsIcon from '@labs/icons/dashboard/settings.svg';
import LogoutIcon from '@labs/icons/dashboard/logout.svg';
import PreferencesIcon from '@labs/icons/dashboard/preference.svg';
import Logo from '@labs/icons/logo.svg';
import Help from '@labs/icons/dashboard/help.svg';
import ArrowDown from '@labs/icons/dashboard/down.svg';
import LogoMark from '@labs/icons/logo-mark.svg';
import { useUserStore } from '@/store/z-store/user';

import styles from './header.module.scss';

const NAVIGATION = [
	{
		title: 'Home',
		href: '/dashboard',
	},
	{
		title: 'Jobs',
		href: '/dashboard/jobs',
	},
	{
		title: 'Applications',
		href: '/dashboard/applications',
	},
	{
		title: 'Resumes',
		href: '/dashboard/resumes',
	},
];

export const DashboardHeader = ({
	bare,
	plainBackdrop,
}: {
	bare?: boolean;
	plainBackdrop?: boolean;
}) => {
	const router = useRouter();
	const [isScrolled, setIsScrolled] = React.useState(false);
	const { profile, logOut } = useUserStore();

	const getFallback = () => {
		if (!profile?.name) return '';
		const [first, last] = profile?.name.split(' ');
		if (!last) return first?.[0] || 'Creator';
		return `${first[0]}${last[0]}`;
	};

	React.useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 0) {
				setIsScrolled(true);
			} else {
				setIsScrolled(false);
			}
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	return (
		<>
			<div
				className={classNames([
					styles.DashboardHeader,
					isScrolled && styles.scrolled,
				])}
			>
				<Container maxWidth="xl" className={styles.DashboardWrapper}>
					<Flex
						className={styles.DashboardHeaderLeft}
						alignItems="center"
						gap={40}
					>
						<Link href="/dashboard">
							<Logo className="hidden lg:block" />
							<LogoMark className="lg:hidden block h-[40px]" />
						</Link>
						{!bare && (
							<Flex
								gap={24}
								flexWrap="wrap"
								className={styles.DashboardHeaderLeftItems}
							>
								{NAVIGATION.map((item, index) => (
									<Link
										href={item.href}
										key={index}
										className={classNames([
											styles.DashboardHeaderMenuItem,
											[router.asPath, router.pathname].includes(item.href) &&
												styles.active,
										])}
									>
										<Text>{item.title}</Text>
									</Link>
								))}
							</Flex>
						)}
					</Flex>
					<Flex
						className={styles.DashboardHeaderRight}
						alignItems="center"
						gap={18}
					>
						{!bare ? (
							<>
								{!plainBackdrop && (
									<TextField.Root className={styles.DashboardHeaderSearch}>
										<TextField.Slot>
											<MagnifyingGlassIcon height="16" width="16" />
										</TextField.Slot>
										<TextField.Input placeholder="Search in 400k jobs..." />
									</TextField.Root>
								)}

								<Link
									href="/dashboard/notifications"
									className={styles.DashboardHeaderNotification}
								>
									<Help height="18" width="18" />
								</Link>
								<Link
									href="/dashboard/notifications"
									className={styles.DashboardHeaderNotification}
								>
									<BellIcon height="18" width="18" />
								</Link>
							</>
						) : (
							<CallToAction.button
								outline
								size="sm"
								onClick={() => router.back()}
							>
								Go Back
							</CallToAction.button>
						)}

						<DropdownMenu.Root>
							<DropdownMenu.Trigger>
								<button className={styles.DashboardHeaderProfile}>
									<Flex alignItems="center" gap={8}>
										<Avatar
											src={profile?.photo}
											fallback={getFallback()}
											variant="solid"
											radius="full"
											size="2"
										/>
										<ArrowDown />
									</Flex>
								</button>
							</DropdownMenu.Trigger>
							<DropdownMenu.Content>
								<DropdownMenu.Item>
									<Link href="/dashboard/settings">
										<Flex.Row gap={8} alignItems="center">
											<SettingsIcon />
											<Text size="sm">Settings</Text>
										</Flex.Row>
									</Link>
								</DropdownMenu.Item>

								<DropdownMenu.Item color="red" onClick={() => logOut()}>
									<Flex.Row gap={8} alignItems="center">
										<LogoutIcon />
										<Text size="sm" color="red">
											Logout
										</Text>
									</Flex.Row>
								</DropdownMenu.Item>
							</DropdownMenu.Content>
						</DropdownMenu.Root>
					</Flex>
				</Container>
			</div>
			<div
				className={classNames([
					styles.DashboardHeaderSpacer,
					isScrolled && styles.scrolled,
				])}
			/>
		</>
	);
};
