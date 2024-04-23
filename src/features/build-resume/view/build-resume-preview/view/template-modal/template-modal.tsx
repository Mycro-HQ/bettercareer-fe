import React from 'react';
import classNames from 'classnames';

import { templatesConfig } from '../resume-blocks/utils';
import ResumePreview from '../resume-blocks';

import { CallToAction, Flex, Heading, Text } from '@labs/components';
import { Modal } from '@labs/components/modal';
import { truncateText } from '@labs/utils';

import styles from './template-modal.module.scss';

export const TemplateModal = ({
	show,
	onClose,
	template,
	setTemplate,
}: {
	show: boolean;
	onClose: () => void;
	template: any;
	setTemplate: (template: any) => void;
}) => {
	const [currentTemplate, setCurrentTemplate] = React.useState(template);

	React.useEffect(() => {
		setCurrentTemplate(template);
	}, []);

	return (
		<Modal
			size="xlg"
			in={show}
			onClose={() => {
				onClose();
				setCurrentTemplate(template);
			}}
			centered={false}
		>
			<Flex.Row gap={32} className={styles.TemplateRow}>
				<Flex.Column className={styles.TemplateSidebar}>
					<Heading.h4 fontSize="20px" className="mb-[24px]">
						Choose your resume template
					</Heading.h4>

					<Flex.Row gap={24} className={styles.TemplateList}>
						{templatesConfig.map((item) => (
							<button
								onClick={() => {
									setCurrentTemplate(item);
								}}
								className={classNames(styles.TemplateItem, {
									[styles.active]: currentTemplate.name === item.name,
									[styles.checked]: template.name === item.name,
								})}
								key={item.name}
							>
								<Flex.Column gap={2} className="w-full ">
									<img src={item.thumbnail} alt={item.name} />

									<Heading.h6
										fontSize="16px"
										weight={700}
										className="mt-[12px]"
									>
										{item.title}
									</Heading.h6>
								</Flex.Column>
							</button>
						))}
					</Flex.Row>
				</Flex.Column>

				<Flex.Column className={styles.TemplatePreview} gap={8}>
					<Flex.Column className="text-center">
						<Heading.h4 fontSize="20px" animate="slide">
							{currentTemplate.title}
						</Heading.h4>
						<Text
							size="sm"
							color="var(--text-gray)"
							className="mb-4"
							animate="fade"
						>
							{truncateText(currentTemplate.details, 40)}
						</Text>
					</Flex.Column>
					<ResumePreview scale={0.5} template={currentTemplate} useDefault />
					<CallToAction.button
						size="lg"
						variant={'primary'}
						outline={template.name === currentTemplate.name}
						className="mt-8"
						onClick={() => {
							setTemplate(currentTemplate);
							onClose();
						}}
					>
						{template.name === currentTemplate.name
							? 'Selected'
							: 'Use this template'}
					</CallToAction.button>
				</Flex.Column>
			</Flex.Row>
		</Modal>
	);
};
