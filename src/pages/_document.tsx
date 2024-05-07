import Document, {
	DocumentContext,
	Head,
	Html,
	Main,
	NextScript,
} from 'next/document';

import { getSSRCssRules } from '@labs/utils';
import { GA_TRACKING_ID } from '@lib/config';

class MyDocument extends Document {
	static async getInitialProps(ctx: DocumentContext) {
		const initialProps = await Document.getInitialProps(ctx);

		const ssrCssRules = getSSRCssRules();

		return { ...initialProps, ssrCssRules };
	}

	render() {
		const { ssrCssRules } = this.props as any;

		return (
			<Html lang="en">
				<Head>
					<style
						id="s2c:ssr-css-rules"
						dangerouslySetInnerHTML={{
							__html: Array.from(ssrCssRules || []).join(''),
						}}
					/>
					<GoogleAnalytics />
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

const GoogleAnalytics = () => {
	if (process.env.NODE_ENV !== 'production') return null;

	return (
		<>
			<script
				async
				src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
			></script>
			<script
				dangerouslySetInnerHTML={{
					__html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
        
          gtag('config', '${GA_TRACKING_ID}');
          `,
				}}
			></script>
		</>
	);
};
export default MyDocument;
