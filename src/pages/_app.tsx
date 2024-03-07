import '@radix-ui/themes/styles.css';
import '@/styles/index.scss';

import { SSRProvider } from '@labs';
import { QueryClientProvider } from '@tanstack/react-query';
import { Theme } from '@radix-ui/themes';
import { queryClient } from '@lib/query-client';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<QueryClientProvider client={queryClient}>
			<Theme>
				<SSRProvider>
					<Component {...pageProps} />
				</SSRProvider>
			</Theme>
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
}
