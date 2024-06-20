import { createSmartApi } from '@lib/usable-query';

import { PlansData, BillingSessionResponse } from './types/billing';

export const billingApiCreator = createSmartApi({
	key: 'billing',
	endpoints: (builder) => ({
		checkoutSession: builder.mutation<string, BillingSessionResponse>({
			key: 'checkout-session',
			mutationFn: (lookupKey) => ({
				url: `/subscription/checkout-session`,
				method: 'POST',
				body: { lookupKey },
			}),
		}),
		getPlans: builder.query<
			{},
			{
				data: PlansData[];
			}
		>({
			key: 'get-plans',
			queryFn: () => ({
				url: `/subscription/plans`,
			}),
		}),
		portalSession: builder.mutation<{}, BillingSessionResponse>({
			key: 'get-portal-session-url',
			mutationFn: () => ({
				url: `/subscription/portal-session`,
			}),
		}),
	}),
});

export const {
	useGetPlansQuery,
	useCheckoutSessionMutation,
	usePortalSessionMutation,
} = billingApiCreator;
