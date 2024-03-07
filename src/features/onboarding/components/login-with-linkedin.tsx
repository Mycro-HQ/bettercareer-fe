import React, { useEffect, useCallback } from 'react';

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
} from '@labs/index';

import { useOAuthMutation } from '@/queries/user';
import queryString from 'query-string';

declare global {
	interface Window {
		google: any;
	}
}

type LoginWithLinkedinProps = {
	intent: 'login' | 'signup';
};

const LoginWithLinkedin = (props: LoginWithLinkedinProps) => {
	const { mutate: authWithLinkedin, isPending } = useOAuthMutation({
		onSuccess: (data) => {},
		onError: (error: any) => {
			// handle error
		},
	});
	const callbackUrl = `${APP_URL}/${props.intent}`;

	function getLinkedVerifier() {
		const popup = openPopupWindow(
			`https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${LINKEDIN_CLIENT_ID}&redirect_uri=${encodeURIComponent(
				callbackUrl
			)}&scope=r_liteprofile%20r_emailaddress`
		) as Window;

		return getLocationFromPopup(popup).then((location: any) => {
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
