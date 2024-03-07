/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	swcMinify: true,

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
