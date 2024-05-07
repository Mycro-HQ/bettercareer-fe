import { QueryClient } from '@tanstack/react-query';
import Cookies from 'js-cookie';

const staleTime = 1000 * 60; // 1 minute

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: staleTime,
			refetchOnMount: 'always',
			refetchOnWindowFocus: true,
			refetchOnReconnect: true,
			retry: 3,
			retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
			throwOnError(error: any, query) {
				console.error(error);
				if (error.statusCode === 403) {
					Cookies.set('bc_token', '', { expires: 0 });
					window.location.replace('/login');
					window.localStorage.removeItem('user');
				}

				return false;
			},
		},
	},
});
