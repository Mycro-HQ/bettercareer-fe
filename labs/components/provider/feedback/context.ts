import { useContext, createContext, PropsWithChildren } from 'react';

import { createErrorWithCode } from '../../../utils';

export interface ToastDefinition
	extends Partial<PropsWithChildren<HTMLDivElement>> {
	message: string | React.ReactNode;
	id?: string;
	in?: boolean;
	size?: 'fit' | 'block';
	position?: 'relative' | 'absolute';
	variant?: 'primary' | 'secondary' | 'error';
	lifespan?: number | 'short' | 'medium' | 'long';
	onClose?: () => void;
}

export interface DisclosureDefinition
	extends Partial<PropsWithChildren<HTMLDivElement>> {
	message: string | React.ReactNode;
	id?: string;
	in?: boolean;
	variant?: 'primary' | 'secondary' | 'error';
	onClose?: () => void;
	onConfirm?: () => void;
	confirmText?: string;
	cancelText?: string;
}

export interface FeedBackContext {
	createToast: (
		options: Omit<ToastDefinition, 'id' | 'in' | 'onClose'>
	) => void | (() => void);
	removeToast: (id: string) => void;
	createDisclosure: (
		options: Omit<DisclosureDefinition, 'id' | 'in'>
	) => void | Promise<unknown>;
}

const raiseToastError = (fn: 'createToast' | 'removeToast') => () => {
	throw createErrorWithCode(
		'FEEDBACK_PROVIDER_REQUIRED',
		'useToast',
		`Before calling \`${fn}\`, wrap your application with \`<FeedbackProvider>\`.`
	);
};
const raiseDisclosureError =
	(fn: 'createDisclosure' | 'removeDisclosure') => () => {
		throw createErrorWithCode(
			'FEEDBACK_PROVIDER_REQUIRED',
			'useDisclosure',
			`Before calling \`${fn}\`, wrap your application with \`<FeedbackProvider>\`.`
		);
	};

export const FeedbackContext = createContext<FeedBackContext>({
	createToast: raiseToastError('createToast'),
	removeToast: raiseToastError('removeToast'),
	createDisclosure: raiseDisclosureError('createDisclosure'),
});

export function useToast() {
	const { createToast, removeToast } = useContext(FeedbackContext);

	return { createToast, removeToast };
}

export function useFeedback() {
	return useContext(FeedbackContext);
}
