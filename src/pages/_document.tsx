import Document, {
	Html,
	Head,
	Main,
	NextScript,
	DocumentContext,
} from 'next/document';
import { getSSRCssRules } from '@labs/utils';

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
				<Head></Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
