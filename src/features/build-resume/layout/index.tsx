import React from 'react';
import { DropdownMenu } from '@radix-ui/themes';
import Link from 'next/link';

import { BuildResumePreview } from '../view/build-resume-preview/';
import { BuildResumePane } from '../view/build-resume-pane';

import { CallToAction, Flex, Text } from '@labs/components';
import { useBuildStore } from '@/store/z-store/builder';
import { downloadResume, truncateText } from '@labs/utils';
import Sparkles from '@labs/icons/misc/sparkels.svg';
import ArrowDown from '@labs/icons/dashboard/down.svg';
import FileIcon from '@labs/icons/dashboard/file.svg';
import Logo from '@labs/icons/logo.svg';

import styles from './layout.module.scss';

export const BuildResumeLayout = () => {
	const { resumeBlob } = useBuildStore();
	const previewRef = React.useRef(null);
	return (
		<div className={styles.BuildResumeLayout}>
			<nav className={styles.BuildResumeLayout__nav}>
				<Flex alignItems="center" gap={10}>
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
											e.stopPropagation();
											e.currentTarget.textContent = truncateText(
												e.currentTarget.textContent!,
												20
											);
										}}
										onKeyDown={(e) => {
											e.stopPropagation();
											if (['Enter', 'Escape'].includes(e.key)) {
												e.currentTarget.blur();
											}
										}}
									>
										New Resume Adenekan
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
								<button>Delete</button>
							</DropdownMenu.Item>
							<DropdownMenu.Item>
								<button>Save Resume</button>
							</DropdownMenu.Item>
							<DropdownMenu.Item color="red">
								<button>Get Free Analysis</button>
							</DropdownMenu.Item>
						</DropdownMenu.Content>
					</DropdownMenu.Root>
					<Link href="/upgrade">
						<Text
							fontSize="12px"
							color="var(--primary-blue)"
							casing="uppercase"
							weight={800}
						>
							Upgrade to Pro
						</Text>
					</Link>
				</Flex>
				<Logo className={styles.BuildResumeLayout__nav__logo} />

				<Flex gap={8}>
					<CallToAction
						size="sm"
						className="p-[10px]"
						outline
						disabled={
							resumeBlob?.score && resumeBlob?.score < 50 ? true : false
						}
						leadingIcon={<Sparkles width={14} />}
					>
						Get Resume Analysis
					</CallToAction>

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
										downloadResume(resumeBlob?.raw!, 'resume', 'docx')
									}
								>
									Download as DOCX
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
				<aside className={styles.BuildResumeLayout__aside} ref={previewRef}>
					<BuildResumePreview previewRef={previewRef} />
				</aside>
				<main className={styles.BuildResumeLayout__main}>
					<BuildResumePane />
				</main>
			</div>
		</div>
	);
};
