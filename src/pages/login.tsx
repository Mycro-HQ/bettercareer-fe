import { Login, OnboardingLayout } from '@/features/onboarding';
import React from 'react';

const LoginPage = () => {
	return (
		<OnboardingLayout title="Login">
			<Login />
		</OnboardingLayout>
	);
};

export default LoginPage;
