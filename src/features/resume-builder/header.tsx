import React from 'react';
import { Avatar, DropdownMenu, TextField } from '@radix-ui/themes';
import Link from 'next/link';
import { Flex, Text, Container, CallToAction } from '@labs/components';
import classNames from 'classnames';

import Profile from '@labs/icons/dashboard/profile.svg';
import SettingsIcon from '@labs/icons/dashboard/settings.svg';
import LogoutIcon from '@labs/icons/dashboard/logout.svg';
import PreferencesIcon from '@labs/icons/dashboard/preference.svg';

import Logo from '@labs/icons/logo.svg';
import Help from '@labs/icons/dashboard/help.svg';
import ArrowDown from '@labs/icons/dashboard/down.svg';
import LogoMark from '@labs/icons/logo-mark.svg';
import ElipseIcon from '@labs/icons/misc/text/more-horizontal.svg';

import styles from '@/features/dashboard/layout/components/header/header.module.scss';
import { useUserStore } from '@/store/z-store/user';

export const ResumeBuilderHeader = () => {
	const [isScrolled, setIsScrolled] = React.useState(false);
	const { profile } = useUserStore();

	const getFallback = () => {
		if (!profile?.name) return '';
		const [first, last] = profile?.name.split(' ');
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
						<Logo className="hidden lg:block" />
						<LogoMark className="lg:hidden block h-[40px]" />
					</Flex>
					<Flex
						className={styles.DashboardHeaderRight}
						alignItems="center"
						gap={18}
					>
						<Link
							href="/dashboard/notification"
							className={styles.DashboardHeaderNotification}
						>
							<Help height="18" width="18" />
						</Link>
						<button className={styles.DashboardHeaderProfile}>
							<ElipseIcon />
						</button>
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
									<Link href="/dashboard/profile">
										<Flex.Row gap={8} alignItems="center">
											<Profile />
											<Text size="sm">Account Profile</Text>
										</Flex.Row>
									</Link>
								</DropdownMenu.Item>
								<DropdownMenu.Item>
									<Link href="/dashboard/profile">
										<Flex.Row gap={8} alignItems="center">
											<PreferencesIcon />
											<Text size="sm">Job Preference</Text>
										</Flex.Row>
									</Link>
								</DropdownMenu.Item>

								<DropdownMenu.Item>
									<Link href="/dashboard/profile">
										<Flex.Row gap={8} alignItems="center">
											<SettingsIcon />
											<Text size="sm">Setting</Text>
										</Flex.Row>
									</Link>
								</DropdownMenu.Item>

								<DropdownMenu.Item color="red">
									<Link href="/dashboard/profile">
										<Flex.Row gap={8} alignItems="center">
											<LogoutIcon />
											<Text size="sm" color="red">
												Logout
											</Text>
										</Flex.Row>
									</Link>
								</DropdownMenu.Item>
							</DropdownMenu.Content>
						</DropdownMenu.Root>
					</Flex>
				</Container>
			</div>
		</>
	);
};
