import { useContext, createContext, PropsWithChildren } from 'react';

import { createErrorWithCode } from '../../utils';

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

export interface FeedBackContext {
	createToast: (
		options: Omit<ToastDefinition, 'id' | 'in' | 'onClose'>
	) => void | (() => void);
	removeToast: (id: string) => void;
}

const raiseToastError = (fn: 'createToast' | 'removeToast') => () => {
	throw createErrorWithCode(
		'FEEDBACK_PROVIDER_REQUIRED',
		'useToast',
		`Before calling \`${fn}\`, wrap your application with \`<FeedbackProvider>\`.`
	);
};

export const FeedbackContext = createContext<FeedBackContext>({
	createToast: raiseToastError('createToast'),
	removeToast: raiseToastError('removeToast'),
});

export function useToast() {
	return useContext(FeedbackContext);
}
