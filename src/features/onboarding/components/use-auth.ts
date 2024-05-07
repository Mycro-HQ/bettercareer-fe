import { useRouter } from 'next/router';
import { useCallback } from 'react';

import { useUserStore } from '@/store/z-store/user';
import { type UserData } from '@/queries/types/user';

const ALLOWED_REDIRECT_PATHS = ['/login', '/signup', '/forgot-password'];
const DEFAULT_REDIRECT_PATH = '/dashboard';

export const useAuthSuccess = () => {
	const { setUser } = useUserStore();
	const router = useRouter();

	const handleAuthSuccess = useCallback(
		(
			data: { token: string; user: UserData; isNewUser?: boolean },
			options?: { goTo?: string }
		) => {
			if (data?.user) {
				setUser(data.user);
			}

			let redirectTo = '';

			if (router.query.redirectTo) {
				redirectTo = Array.isArray(router.query.redirectTo)
					? router.query.redirectTo[0]
					: router.query.redirectTo;
			} else if (router.asPath.includes('?redirectTo=')) {
				const redirectToParam = router.asPath.split('?redirectTo=')[1];
				redirectTo = redirectToParam ? redirectToParam.split('&')[0] : '';
			}

			const decodedRedirectTo = decodeURIComponent(redirectTo);

			if (!ALLOWED_REDIRECT_PATHS.includes(decodedRedirectTo)) {
				redirectTo = DEFAULT_REDIRECT_PATH;
			}

			// Handle additional options
			if (options?.goTo) {
				// If a custom redirect path is provided, use it
				return router.push(options.goTo);
			} else if (data?.isNewUser) {
				// If it's a new user, redirect to the tutorial
				return router.push(`/build-profile?redirectTo=${redirectTo}`);
			} else {
				// Otherwise, use the default or allowed redirect path
				return router.push(redirectTo);
			}
		},
		[]
	);

	return handleAuthSuccess;
};
