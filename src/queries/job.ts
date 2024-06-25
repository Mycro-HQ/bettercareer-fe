import { createSmartApi } from '@lib/usable-query';

import { JobResponseData, UserJobData } from './types/job';

export const billingApiCreator = createSmartApi({
	key: 'job',
	endpoints: (builder) => ({
		getJobs: builder.query<
			{},
			{
				data: JobResponseData[];
			}
		>({
			key: 'get-jobs',
			queryFn: () => ({
				url: `/jobs`,
			}),
		}),
		createJobApplication: builder.mutation({
			key: 'create-job-application',
			mutationFn: (data) => ({
				url: `/jobs/apply`,
				method: 'POST',
				body: data,
			}),
			invalidatesQueries: ['user-jobs'],
		}),
		getUserJobs: builder.query<
			{},
			{
				data: UserJobData[];
			}
		>({
			key: 'user-jobs',
			queryFn: () => ({
				url: `/jobs/me`,
			}),
		}),
		updateJobStatus: builder.mutation({
			key: 'user-job-status',
			mutationFn: (data) => ({
				url: `/jobs/status`,
				method: 'POST',
				body: data,
			}),
			invalidatesQueries: ['user-jobs'],
		}),
	}),
});

export const {
	useGetJobsQuery,
	useCreateJobApplicationMutation,
	useGetUserJobsQuery,
	useUpdateJobStatusMutation,
} = billingApiCreator;
