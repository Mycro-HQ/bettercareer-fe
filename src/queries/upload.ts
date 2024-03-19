import { createSmartApi } from '@lib/usable-query';

type UploadFileResult = {
	success: boolean;
	message: string;
	fileUrl: string;
	data: any;
};

type FormData = {
	resume: any;
};

const smartApi = createSmartApi({
	endpoints: (builder) => ({
		uploadFile: builder.mutation<any, UploadFileResult>({
			key: 'uploadFile',
			mutationFn: (formData) => {
				return {
					url: '/upload',
					method: 'POST',
					data: formData,
					headers: {
						'Content-Type': 'multipart/form-data',
					},
				};
			},
		}),
	}),
});

export const { startListening, uploadFile, useUploadFileMutation } = smartApi;
