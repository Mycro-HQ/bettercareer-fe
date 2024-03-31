import React from 'react';
import { DropdownMenu } from '@radix-ui/themes';
import { CallToAction, Flex, Text } from '@labs/components';
import { BuildResumePane } from '../view/build-resume-pane';
import { BuildResumePreview } from '../view/build-resume-preview/';
import { useBuildStore } from '@/store/z-store/builder';
import { downloadResume } from '@labs/utils';

import ArrowDown from '@labs/icons/dashboard/down.svg';
import FileIcon from '@labs/icons/dashboard/file.svg';
import Logo from '@labs/icons/logo.svg';

import styles from './layout.module.scss';

export const BuildResumeLayout = () => {
	const { resumeBlob } = useBuildStore();
	return (
		<div className={styles.BuildResumeLayout}>
			<nav className={styles.BuildResumeLayout__nav}>
				<DropdownMenu.Root>
					<DropdownMenu.Trigger>
						<span className={styles.DashboardHeaderProfile}>
							<Flex alignItems="center" gap={8}>
								<FileIcon />
								<Text
									contentEditable="true"
									role="button"
									tabIndex={0}
									aria-label="Resume Name"
									suppressContentEditableWarning={true}
									onBlur={(e) => {
										alert('onBlur');
									}}
									onKeyDown={(e) => {
										e.stopPropagation();
										if (['Enter', 'Escape'].includes(e.key)) {
											e.currentTarget.blur();
										}
									}}
								>
									New Resume Adenekan.pdf
								</Text>
								<ArrowDown />
							</Flex>
						</span>
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
					<DropdownMenu.Root>
						<DropdownMenu.Trigger>
							<CallToAction size="sm" className="p-[10px]">
								Download Resume
							</CallToAction>
						</DropdownMenu.Trigger>
						<DropdownMenu.Content>
							<DropdownMenu.Item>
								<button
									onClick={() =>
										downloadResume(resumeBlob?.blob!, 'resume', 'pdf')
									}
								>
									Download as PDF
								</button>
							</DropdownMenu.Item>
							<DropdownMenu.Item>
								<button
									onClick={() =>
										downloadResume(resumeBlob?.raw!, 'resume', 'txt')
									}
								>
									Download as TXT
								</button>
							</DropdownMenu.Item>
							<DropdownMenu.Item>
								<button>Save Resume</button>
							</DropdownMenu.Item>
						</DropdownMenu.Content>
					</DropdownMenu.Root>
				</Flex>
			</nav>
			<div className={styles.ContentWrap}>
				<aside className={styles.BuildResumeLayout__aside}>
					<BuildResumePreview />
				</aside>
				<main className={styles.BuildResumeLayout__main}>
					<BuildResumePane />
				</main>
			</div>
		</div>
	);
};
