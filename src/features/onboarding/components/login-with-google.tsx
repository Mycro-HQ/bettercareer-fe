import React, { useEffect, useCallback } from 'react';

import { GOOGLE_AUTH_ID } from '@lib/config';
import GoogleIcon from '@labs/icons/socials/google.svg';

import { CallToAction, useToast } from '@labs/index';
import { useOAuthMutation } from '@/queries/user';
import { useAuthSuccess } from './use-auth';

import styles from '../onboarding.module.scss';

declare global {
	interface Window {
		google: any;
	}
}

type LoginWithGoogleProps = {
	intent: 'login' | 'signup';
};

const LoginWithGoogle = (props: LoginWithGoogleProps) => {
	const { createToast } = useToast();
	const handleAuthSuccess = useAuthSuccess();

	const { mutate: authWithGoogle, isPending } = useOAuthMutation({
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

	const [scriptReady, setScriptReady] = React.useState(false);

	const handleCredentialResponse = useCallback(
		async (response: {
			credential: string;
			select_by: string;
			status: string;
			user: any;
		}) => {
			const credential = response.credential;

			await authWithGoogle({
				token: credential,
				provider: 'google',
			});
		},
		[authWithGoogle, props.intent]
	);

	useEffect(() => {
		const script = document.createElement('script');
		script.src = 'https://accounts.google.com/gsi/client';
		script.async = true;
		script.onload = () => {
			window.google.accounts.id.initialize({
				client_id: GOOGLE_AUTH_ID,
				callback: handleCredentialResponse,
			});

			setScriptReady(true);
		};
		document.body.appendChild(script);

		return () => {
			document.body.removeChild(script);
		};
	}, [handleCredentialResponse]);

	const handleLoginClick = useCallback(() => {
		window.google.accounts.id.renderButton(
			document.getElementById('signInDiv'),
			{ theme: 'outline', width: '500px' }
		);

		window.google.accounts.id.prompt();
	}, []);

	useEffect(() => {
		if (!scriptReady) return;
		handleLoginClick();
	}, [scriptReady, handleLoginClick]);

	return (
		<CallToAction.button
			size="block"
			isLoading={isPending}
			leadingIcon={<GoogleIcon />}
			outline
			onClick={handleLoginClick}
			className="overflow-hidden relative"
		>
			<div id="signInDiv" className={styles.GoogleAuthButton}></div>
			{props.intent === 'login' ? 'Sign in with Google' : 'Sign up with Google'}
		</CallToAction.button>
	);
};

export default LoginWithGoogle;
