import { createSmartApi } from '@lib/usable-query';

export const billingApiCreator = createSmartApi({
	key: 'job',
	endpoints: (builder) => ({
		getJobs: builder.query<
			{},
			{
				data: any;
			}
		>({
			key: 'get-jobs',
			queryFn: () => ({
				url: `/jobs`,
			}),
		}),
	}),
});

export const { useGetJobsQuery } = billingApiCreator;
