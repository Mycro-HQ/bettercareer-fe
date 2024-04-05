import React from 'react';
import classNames from 'classnames';

import { templatesConfig } from '../resume-blocks/utils';

import { Flex, Heading, Text } from '@labs/components';
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
	return (
		<Modal size="lg" in={show} onClose={onClose} centered={false}>
			<Heading.h4 className="mb-[24px]">Choose your resume template</Heading.h4>
			<Flex.Row gap={18} className={styles.TemplateList}>
				{templatesConfig.map((item) => (
					<button
						onClick={() => {
							setTemplate(item);
							onClose();
						}}
						className={classNames(styles.TemplateItem, {
							[styles.active]: template.name === item.name,
						})}
						key={item.name}
					>
						<Flex.Column gap={2} className="w-full ">
							<img src={item.thumbnail} alt={item.name} />

							<Heading.h6 weight={700} className="mt-[12px]">
								{item.title}
							</Heading.h6>
							<Text size="sm">{truncateText(item.details, 40)}</Text>
						</Flex.Column>
					</button>
				))}
			</Flex.Row>
		</Modal>
	);
};
