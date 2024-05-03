import { createSmartApi } from '@lib/usable-query';

export const resumeApiCreator = createSmartApi({
	key: 'resume',
	endpoints: (builder) => ({
		createOrEditResume: builder.mutation({
			key: 'create-edit-resume',
			mutationFn: (data) => {
				if (data.id && data.id !== 'new') {
					return {
						url: `/resume/update/${data.id}`,
						method: 'PUT',
						body: data,
					};
				}

				return {
					url: `/resume/create`,
					method: 'POST',
					body: data,
				};
			},
			invalidatesQueries: ['get-resumes'],
		}),
		uploadResume: builder.mutation({
			key: 'upload-resume',
			mutationFn: (data) => ({
				url: `/resume/upload`,
				method: 'POST',
				body: data,
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			}),
		}),
		getResumeAnalysis: builder.mutation({
			key: 'get-resume-analysis',
			mutationFn: (data) => ({
				url: `/resume/analyse`,
				method: 'POST',
				body: data,
			}),
			invalidatesQueries: ['analyze-resume-history'],
		}),
		getResumeAnalysisHistory: builder.query({
			key: 'analyze-resume-history',
			queryFn: ({ id }) => ({
				url: `/resume/analysis/${id}`,
				method: 'GET',
			}),
		}),
		duplicateResume: builder.mutation({
			key: 'duplicate-resume',
			mutationFn: (id) => ({
				url: `/resume/duplicate/${id}`,
				method: 'POST',
			}),
			invalidatesQueries: ['get-resumes'],
		}),
		deleteResume: builder.mutation({
			key: 'delete-resume',
			mutationFn: (id) => ({
				url: `/resume/${id}`,
				method: 'DELETE',
			}),
			invalidatesQueries: ['get-resumes'],
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
	useCreateOrEditResumeMutation,
	useGetResumesQuery,
	useGetResumeQuery,
	getResume,
	useGetResumeAnalysisMutation,
	useDeleteResumeMutation,
	useAiWriterMutation,
	useUploadResumeMutation,
	useDuplicateResumeMutation,
	useGetResumeAnalysisHistoryQuery,
} = resumeApiCreator;
