/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
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
							plugins: [
								{ name: 'removeViewBox', active: false },
								{
									name: 'preset-default',
									params: {
										overrides: {
											removeViewBox: false,
											convertShapeToPath: false,
											inlineStyles: false,
										},
									},
								},
							],
						},
					},
				},
			],
		});

		return config;
	},
};

export default nextConfig;
