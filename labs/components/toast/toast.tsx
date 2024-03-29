/**
 * 📝 Notes for Contributors:
 *
 * @description
 *
 * - When creating an interactive component, we recommend consuming the
 * component hook created.
 * - Ensure the component is composable and can adapt to multiple use-cases
 *
 * Bootstrapped by Plop
 */

import classNames from 'classnames';
import React, { ReactNode, useCallback, useState } from 'react';
import { motion } from 'framer-motion';

import { ToastDefinition, FeedbackContext } from './use-toast';
import { EphemeralPortal } from '../layout/ephemeral-portal';
import { createError, generateUUID } from '../../utils';

import Info from '@labs/icons/misc/notif.svg';

import styles from './toast.module.scss';

interface FeedbackProviderProps {
	children: ReactNode;
}

export const FeedbackProvider: React.FC<FeedbackProviderProps> = ({
	children,
}) => {
	const isServer = typeof window === 'undefined';
	const [toasts, setToasts] = useState<ToastDefinition[]>([]);

	const removeToast = useCallback((id: string) => {
		setToasts((current) => current.filter((toast) => toast.id !== id));
	}, []);

	const safeDuration = (
		duration: number | 'short' | 'medium' | 'long',
		fallback: number
	) => {
		switch (duration) {
			case 'short':
				return 3000;
			case 'medium':
				return 5000;
			case 'long':
				return 8000;
			default:
				return fallback;
		}
	};

	const createToast = useCallback(
		(options: Omit<ToastDefinition, 'id' | 'in' | 'onClose'>) => {
			if (!options.message)
				throw createError('Toast', 'Toast message is required');
			const id = generateUUID();
			const lifespan = safeDuration(options.lifespan!, 5000);

			setToasts((current) => [...current, { ...options, id }]);

			const timer = setTimeout(() => removeToast(id), lifespan);
			return () => clearTimeout(timer);
		},
		[removeToast]
	);

	return (
		<FeedbackContext.Provider value={{ createToast, removeToast }}>
			{children}
			{!isServer && (
				<EphemeralPortal>
					<div role="region" aria-live="polite" className={styles.ToastRegion}>
						{toasts.map((toast) => (
							<Toast
								key={toast.id}
								{...toast}
								onClose={() => removeToast(toast.id!)}
							/>
						))}
					</div>
				</EphemeralPortal>
			)}
		</FeedbackContext.Provider>
	);
};

export const Toast: React.FC<ToastDefinition & { onClose: () => void }> = ({
	id,
	message,
	variant = 'secondary',
	onClose,
}) => {
	const slideProps = {
		initial: { opacity: 0, scale: 0.95, y: -20 },
		animate: { opacity: 1, scale: 1, y: 0 },
		exit: { opacity: 0, scale: 0.95, y: -20 },
	};
	const toastClasses = classNames([
		styles.Toast,
		styles[`Toast--variant-${variant}`],
		{ [styles.Flexend]: typeof message === 'string' && message.length > 120 },
	]);

	return (
		<motion.div
			layout="size"
			key={id}
			{...slideProps}
			role="status"
			className={toastClasses}
		>
			<Info className={styles.Icon} />
			<span className="flex-1">{message}</span>
			<button onClick={onClose} className={styles.close} aria-label="Close">
				&times;
			</button>
		</motion.div>
	);
};
