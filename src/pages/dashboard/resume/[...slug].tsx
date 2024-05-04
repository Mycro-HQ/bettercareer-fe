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
	// allowed slug values: 'new' or a valid resume slug
	const ALLOWED_SLUGS = ['build', 'b'];

	if (
		!context.params?.slug[0] ||
		!ALLOWED_SLUGS.includes(context.params.slug[0])
	) {
		return {
			notFound: true,
		};
	}

	const { slug: slugs } = context.params;

	const slug = slugs[1];

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
