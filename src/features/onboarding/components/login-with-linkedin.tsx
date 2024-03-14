import React, { useCallback } from 'react';

import {
	APP_URL,
	LINKEDIN_CLIENT_ID,
	LINKEDIN_CLIENT_SECRET,
} from '@lib/config';
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
			)}&scope=r_liteprofile%20r_emailaddress`
		) as Window;

		return getLocationFromPopup(popup).then((location: { search: string }) => {
			const query = queryString.parse(location.search) || {};
			const oauthVerifier = query.oauth_verifier;

			popup.close();
			return oauthVerifier;
		});
	}

	const handleLogin = useCallback(async (code: string) => {
		const data = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
			method: 'POST',
			body: new URLSearchParams({
				grant_type: 'authorization_code',
				code,
				redirect_uri: callbackUrl,
				client_id: LINKEDIN_CLIENT_ID,
				client_secret: LINKEDIN_CLIENT_SECRET,
			}),
		}).then((response) => response.json());

		const accessToken = data.access_token;

		authWithLinkedin({
			token: accessToken,
			provider: 'linkedin',
		});
	}, []);

	const handleLinkedInCallback = () => {
		const queryString = window.location.search;
		const urlParams = new URLSearchParams(queryString);
		const code = urlParams.get('code');
		if (code) handleLogin(code);
	};

	React.useEffect(() => {
		handleLinkedInCallback();
	}, []);

	return (
		<CallToAction.button
			size="block"
			isLoading={isPending}
			leadingIcon={<LinkedInIcon />}
			onClick={getLinkedVerifier}
		>
			{props.intent === 'login'
				? 'Sign in with Linkedin'
				: 'Sign up with Linkedin'}
		</CallToAction.button>
	);
};

export default LoginWithLinkedin;
