import { createSmartApi } from '@lib/usable-query';

export const marketingApiCreator = createSmartApi({
	key: 'marketing',
	endpoints: (builder) => ({
		sendWaitlist: builder.mutation({
			key: 'waitlist',
			mutationFn: (data) => ({
				url: `/waitlist`,
				method: 'POST',
				body: data,
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			}),
		}),
	}),
});

export const { useSendWaitlistMutation } = marketingApiCreator;
