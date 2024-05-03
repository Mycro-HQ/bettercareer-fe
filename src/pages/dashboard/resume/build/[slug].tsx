import React from 'react';

import { BuildResumeLayout } from '@/features/build-resume';
import { baseQueryFn } from '@lib/base-query';
import { Seo } from '@/components/seo';

const BuildResumePage = ({ resume }: { resume: any }) => {
	return (
		<>
			<Seo
				title={resume?.name || 'Build Resume'}
				description={
					resume?.summary ||
					'Build your resume with our easy-to-use resume builder.'
				}
			/>
			<BuildResumeLayout resume={resume} />
		</>
	);
};

export async function getServerSideProps(context: any) {
	const { slug } = context.params;

	if (slug === 'new') {
		return {
			props: {
				resume: {},
			},
		};
	}

	try {
		const res = await baseQueryFn({
			url: `/resume/${slug}`,
			method: 'get',
			token: context.req.cookies?.['bc_token'],
			// headers: context.req.headers,
		} as any);

		return {
			props: {
				resume: res?.data,
			},
		};
	} catch (error) {
		console.error(error);
		return {
			notFound: true,
		};
	}
}

export default BuildResumePage;
