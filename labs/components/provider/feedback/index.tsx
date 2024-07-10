import React from 'react';

import { ToastProvider, useToastSetup } from '../../toast';
import { DisclosureProvider, useDisclosureSetup } from '../../disclosure';

import { FeedbackContext } from './context';

export const FeedBackProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const { toasts, createToast, removeToast } = useToastSetup();
	const { createDisclosure, disclosure, resetDisclosure, handleAction } =
		useDisclosureSetup();

	return (
		<FeedbackContext.Provider
			value={{
				createToast,
				removeToast,
				createDisclosure,
			}}
		>
			{children}
			<ToastProvider toasts={toasts} removeToast={removeToast} />
			<DisclosureProvider
				disclosure={disclosure}
				resetDisclosure={resetDisclosure}
				handleAction={handleAction}
			/>
		</FeedbackContext.Provider>
	);
};
