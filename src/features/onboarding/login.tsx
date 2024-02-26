import { Button, Flex, Heading, Text } from '@radix-ui/themes';
import React from 'react';

import styles from './onboarding.module.scss';
export const Login = () => {
	return (
		<div className={styles.AuthLayout}>
			<Flex direction="column" gap="3">
				<Heading as="h3" size="8">
					Create your account
				</Heading>
				<Text as="p" weight="medium">
					Get ready to launch your career into new heights with BetterCareers!
				</Text>

				<Flex direction="column" gap="3" className={styles.AuthLayoutButtons}>
					<Button radius="full" size="4">
						Sign up with Google
					</Button>
					<Button radius="full" size="4" variant="outline">
						Sign up with Google
					</Button>
					<Text as="p">Already have an account? Sign In</Text>
				</Flex>
			</Flex>
			<div className={styles.AuthLayoutFooter}>
				<Text as="p" size="3" weight="medium">
					By signing up, you agree to the Terms of Services and Privacy Policy
				</Text>
			</div>
		</div>
	);
};
