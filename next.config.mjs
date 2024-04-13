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
		];
	},

	webpack: (config, { isServer }) => {
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
