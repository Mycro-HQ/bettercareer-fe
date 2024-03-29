import React from 'react';
import { DropdownMenu } from '@radix-ui/themes';
import { CallToAction, Flex, Text } from '@labs/components';
import { BuildResumePane } from '../view/build-resume-pane';

import ArrowDown from '@labs/icons/dashboard/down.svg';
import FileIcon from '@labs/icons/dashboard/file.svg';
import Logo from '@labs/icons/logo.svg';

import styles from './layout.module.scss';

export const BuildResumeLayout = () => {
	return (
		<div className={styles.BuildResumeLayout}>
			<nav className={styles.BuildResumeLayout__nav}>
				<DropdownMenu.Root>
					<DropdownMenu.Trigger>
						<button className={styles.DashboardHeaderProfile}>
							<Flex alignItems="center" gap={8}>
								<FileIcon />
								<Text>New Resume Adenekan.pdf</Text>
								<ArrowDown />
							</Flex>
						</button>
					</DropdownMenu.Trigger>
					<DropdownMenu.Content>
						<DropdownMenu.Item>
							<button>Duplicate Resume</button>
						</DropdownMenu.Item>
						<DropdownMenu.Item>
							<button>Duplicate Resume</button>
						</DropdownMenu.Item>
						<DropdownMenu.Item>
							<button>Duplicate Resume</button>
						</DropdownMenu.Item>
						<DropdownMenu.Item color="red">
							<button>Duplicate Resume</button>
						</DropdownMenu.Item>
					</DropdownMenu.Content>
				</DropdownMenu.Root>
				<Logo className={styles.BuildResumeLayout__nav__logo} />

				<Flex gap={8}>
					<CallToAction size="sm" className="p-[10px]">
						Download Resume
					</CallToAction>
				</Flex>
			</nav>
			<div className={styles.ContentWrap}>
				<main className={styles.BuildResumeLayout__main}>
					<BuildResumePane />
				</main>
				<aside className={styles.BuildResumeLayout__aside}></aside>
			</div>
		</div>
	);
};
