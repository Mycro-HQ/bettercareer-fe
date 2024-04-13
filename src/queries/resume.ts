import { createSmartApi } from '@lib/usable-query';

export const resumeApiCreator = createSmartApi({
	key: 'resume',
	endpoints: (builder) => ({
		createResume: builder.mutation({
			key: 'create-resume',
			mutationFn: (data) => ({
				url: `/resume/create`,
				method: 'POST',
				body: data,
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			}),
		}),
		aiWriter: builder.mutation({
			key: 'ai-writer',
			mutationFn: (data) => ({
				url: `/ai/write`,
				method: 'POST',
				body: data,
			}),
		}),
		getResumes: builder.query({
			key: 'get-resumes',
			queryFn: () => ({
				url: `/resume`,
			}),
		}),
		getResume: builder.query({
			key: 'get-resume',
			queryFn: ({ id }) => ({
				url: `/resume/${id}`,
			}),
		}),
	}),
});

export const {
	useCreateResumeMutation,
	useGetResumesQuery,
	useGetResumeQuery,
	useAiWriterMutation,
} = resumeApiCreator;
