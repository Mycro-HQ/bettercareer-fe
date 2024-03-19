import '@radix-ui/themes/styles.css';
import '@/styles/index.scss';

import posthog from 'posthog-js';
import { PostHogProvider } from 'posthog-js/react';

import { SSRProvider } from '@labs';
import { QueryClientProvider } from '@tanstack/react-query';
import { Theme } from '@radix-ui/themes';
import { queryClient } from '@lib/query-client';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import analytics from '@lib/analytics';

export default function App({ Component, pageProps }: AppProps) {
	const router = useRouter();

	// useRedirectMiddleware();

	useEffect(() => {
		const handleRouteChange = (url: string) => {
			analytics.pageView(url);
		};

		router.events.on('routeChangeComplete', handleRouteChange);

		return () => {
			router.events.off('routeChangeComplete', handleRouteChange);
		};
	}, [router.events]);

	return (
		<QueryClientProvider client={queryClient}>
			<Theme>
				<SSRProvider>
					<PostHogProvider client={posthog}>
						<Component {...pageProps} />
					</PostHogProvider>
				</SSRProvider>
			</Theme>
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
}
