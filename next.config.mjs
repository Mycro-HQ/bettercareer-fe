/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	swcMinify: true,

	rewrites: async () => {
		return [
			{
				source: '/dashboard/resume/build',
				destination: '/dashboard/resume/build/new',
			},
			{
				source: '/dashboard/resume/build/:id',
				destination: '/dashboard/resume/b/:id',
			},
		];
	},

	redirects: async () => {
		return [
			{
				source: '/dashboard/resume',
				destination: '/dashboard/resume/b/new',
				permanent: false,
			},
		];
	},

	webpack: (config, { isServer }) => {
		config.resolve.alias.canvas = false;

		config.module.rules.push({
			test: /\.svg$/i,
			issuer: /\.[jt]sx?$/,
			use: [
				{
					loader: '@svgr/webpack',
					options: {
						svgoConfig: {
							plugins: [{ name: 'removeViewBox', active: false }],
						},
					},
				},
			],
		});

		return config;
	},
};

export default nextConfig;
