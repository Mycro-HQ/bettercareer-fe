/**
 * 📝 Guidelines for Development:
 *
 * @description
 *
 * - Leverage the component hook while developing interactive components.
 * - The component should be designed for composability, ensuring it is adaptable for a multitude of use-cases.
 *
 * Component Template Provided by Plop
 */

import React, { useCallback, useMemo, useState } from 'react';

import { Heading } from '../layout/heading';
import { Modal } from '../modal';
import { CallToAction } from '../call-to-action';
import { DisclosureDefinition } from '../provider/feedback/context';
import { createError } from '../../utils';

import styles from './disclosure.module.scss';

export interface IDisclosureState extends DisclosureDefinition {
	isOpen: boolean;
}

const INITIAL_DISCLOSURE_STATE: IDisclosureState = {
	isOpen: false,
	message: '',
	variant: 'primary',
};

export const useDisclosureSetup = () => {
	const [disclosure, setDisclosure] = useState(INITIAL_DISCLOSURE_STATE);

	const resetDisclosure = useCallback(() => {
		setDisclosure(INITIAL_DISCLOSURE_STATE);
	}, []);

	const createDisclosure = useCallback(
		(options: Omit<DisclosureDefinition, 'id' | 'in'>) => {
			const { message, ..._options } = options;

			if (!message) {
				throw createError('Disclosure', 'Disclosure message is required');
			}

			setDisclosure((prev) => ({
				...prev,
				isOpen: true,
				message,
				..._options,
			}));

			return new Promise((resolve, reject) => {
				setDisclosure((prev) => ({
					...prev,
					onConfirm: () => {
						options.onConfirm?.();
						return resolve(true);
					},
					onClose: () => {
						options.onClose?.();
						return reject(false);
					},
				}));
			});
		},
		[]
	);

	const handleAction = useCallback(
		async (action: 'onConfirm' | 'onClose' = 'onClose') => {
			disclosure[action]?.();
			resetDisclosure();
		},
		[disclosure, resetDisclosure]
	);

	return { disclosure, resetDisclosure, createDisclosure, handleAction };
};

export function DisclosureProvider(
	props: React.PropsWithChildren<{
		disclosure: IDisclosureState;
		resetDisclosure: () => void;
		handleAction: (action: 'onConfirm' | 'onClose') => void;
	}>
) {
	const { disclosure, resetDisclosure, handleAction } = props;

	return (
		<>
			{disclosure.isOpen && (
				<Disclosure
					disclosure={disclosure}
					resetDisclosure={resetDisclosure}
					handleConfirm={() => handleAction('onConfirm')}
					handleCancel={() => handleAction('onClose')}
				>
					{disclosure.message}
				</Disclosure>
			)}
		</>
	);
}

export const Disclosure = ({
	disclosure,
	resetDisclosure,
	handleConfirm,
	handleCancel,
	children,
}: {
	disclosure?: IDisclosureState;
	resetDisclosure: () => void;
	handleConfirm: () => void;
	handleCancel: () => void;
	children: React.ReactNode;
}) => {
	return (
		<Modal in={disclosure?.isOpen} size="sm" onClose={resetDisclosure}>
			<div className={styles.Disclosure} data-amlabs-disclosure>
				{disclosure?.title && (
					<p className={styles.DisclosureTitle}>{disclosure?.title}</p>
				)}
				<Heading.h5 fontSize="18px">{children}</Heading.h5>

				<div className={styles.DisclosureActions}>
					<CallToAction
						variant={disclosure?.variant}
						size="md"
						onClick={handleConfirm}
					>
						{disclosure?.confirmText || 'Confirm'}
					</CallToAction>
					<CallToAction size="md" outline onClick={handleCancel}>
						Cancel
					</CallToAction>
				</div>
			</div>
		</Modal>
	);
};
