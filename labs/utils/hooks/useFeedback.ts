import { useContext } from 'react';

import {
	FeedbackContext,
	type FeedBackContext as FG,
} from '../../components/provider/feedback/context';

export const useFeedback = () => {
	const { createToast, createDisclosure } = useContext(FeedbackContext);

	return {
		createToast,
		createDisclosure,
	} as Required<FG>;
};
