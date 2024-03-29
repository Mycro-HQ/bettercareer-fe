import React, { useCallback } from 'react';

import { APP_URL, LINKEDIN_CLIENT_ID } from '@lib/config';
import LinkedInIcon from '@labs/icons/socials/linkedin.svg';

import {
	CallToAction,
	getLocationFromPopup,
	openPopupWindow,
	useToast,
} from '@labs/index';

import { useOAuthMutation } from '@/queries/user';
import queryString from 'query-string';
import { useAuthSuccess } from './use-auth';

type LoginWithLinkedinProps = {
	intent: 'login' | 'signup';
};

const LoginWithLinkedin = (props: LoginWithLinkedinProps) => {
	const { createToast } = useToast();
	const handleAuthSuccess = useAuthSuccess();

	const { mutate: authWithLinkedin, isPending } = useOAuthMutation({
		onSuccess: (data) => {
			handleAuthSuccess(data);
		},
		onError: (error: any) => {
			createToast({
				message: error?.message || 'An error occurred',
				variant: 'error',
			});
		},
	});

	const callbackUrl = `${APP_URL}/${props.intent}`;

	function getLinkedVerifier() {
		const popup = openPopupWindow(
			`https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${LINKEDIN_CLIENT_ID}&redirect_uri=${encodeURIComponent(
				callbackUrl
			)}&scope=profile%20email%20openid`
		) as Window;

		return getLocationFromPopup(popup).then((location: { search: string }) => {
			const query = queryString.parse(location.search) || {};

			popup.close();
			return query.code;
		});
	}

	const handleLogin = useCallback(async () => {
		const code = await getLinkedVerifier();

		authWithLinkedin({
			token: code as string,
			provider: 'linkedin',
		});
	}, []);

	return (
		<CallToAction.button
			size="block"
			isLoading={isPending}
			leadingIcon={<LinkedInIcon />}
			onClick={handleLogin}
		>
			{props.intent === 'login'
				? 'Sign in with Linkedin'
				: 'Sign up with Linkedin'}
		</CallToAction.button>
	);
};

export default LoginWithLinkedin;
