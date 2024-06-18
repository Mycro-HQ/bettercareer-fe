import { createSmartApi } from '@lib/usable-query';

import { PlansData, CheckoutSessionResponse } from './types/billing';

export const billingApiCreator = createSmartApi({
	key: 'billing',
	endpoints: (builder) => ({
		checkoutSession: builder.mutation<string, CheckoutSessionResponse>({
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
	}),
});

export const { useGetPlansQuery, useCheckoutSessionMutation } =
	billingApiCreator;
