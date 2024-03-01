import '@radix-ui/themes/styles.css';
import '@/styles/index.scss';

import { SSRProvider } from '@labs';
import { Theme } from '@radix-ui/themes';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<Theme>
			<SSRProvider>
				<Component {...pageProps} />
			</SSRProvider>
		</Theme>
	);
}
