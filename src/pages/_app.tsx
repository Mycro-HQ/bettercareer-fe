import '@radix-ui/themes/styles.css';
import '@/styles/index.scss';

import posthog from 'posthog-js';
import { PostHogProvider } from 'posthog-js/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { Theme } from '@radix-ui/themes';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { PaceLoader } from '@/components/misc/pace-loader';
import { queryClient } from '@lib/query-client';
import { SSRProvider } from '@labs';
import analytics from '@lib/analytics';

export default function App({ Component, pageProps }: AppProps) {
	const router = useRouter();

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
		<Theme appearance="light">
			<SSRProvider>
				<QueryClientProvider client={queryClient}>
					<PostHogProvider client={posthog}>
						<PaceLoader />
						<Component {...pageProps} />
					</PostHogProvider>
					<ReactQueryDevtools initialIsOpen={false} />
				</QueryClientProvider>
			</SSRProvider>
		</Theme>
	);
}
