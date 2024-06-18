import React, { useState } from 'react';

import { PasswordValidationBlock, Label, Input, Wrapper } from '../components';
import { fillPasswordPill } from '../utils';

import { CallToAction, Flex, useFeedback } from '@labs/components';
import { useDeleteAccountMutation } from '@/queries/user';
import { useGlobalStore } from '@/store/z-store/global';
import { useUserStore } from '@/store/z-store/user';

export default function SecurityTab() {
	return (
		<div className="my-6 flex flex-col gap-y-6">
			{/* <PasswordBlock /> */}
			<SignOutBlock />
			<DeleteBlock />
		</div>
	);
}

function PasswordBlock() {
	const [oldPassword, setOldPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [confirmNewPassword, setConfirmNewPassword] = useState('');
	const passwordPattern =
		/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};:"'\\|,.<>\/?~`])[A-Za-z\d!@#$%^&*()_+\-=\[\]{};:"'\\|,.<>\/?~`]{8,}$/;

	// The number 5 is the number of requirements needed for a valid password
	const isButtonDisabled = !(
		oldPassword &&
		newPassword &&
		confirmNewPassword &&
		newPassword === confirmNewPassword &&
		fillPasswordPill(newPassword) === 5
	);

	function handleSubmit() {
		// Handle form submission
	}

	return (
		<Wrapper
			title="Change Password"
			subTitle="Secure your account with a strong password."
		>
			<form action="" onSubmit={handleSubmit}>
				<Flex.Column gap={24}>
					<div>
						<Label
							htmlFor="oldpassword"
							text="Old Password"
							className="text-[#273643] text-base font-semibold leading-6"
						/>
						<Input
							inputProps={{
								id: 'oldpassword',
								placeholder: 'Old Password',
								type: 'password',
								autoComplete: 'current-password',
								value: oldPassword,
								onChange: (e) => setOldPassword(e.target.value),
							}}
						/>
					</div>
					<div>
						<Label
							htmlFor="newpassword"
							text="New Password"
							className="text-[#273643] text-base font-semibold leading-6"
						/>
						<Input
							inputProps={{
								id: 'newpassword',
								placeholder: 'New Password',
								type: 'password',
								autoComplete: 'new-password',
								pattern: passwordPattern.source,
								value: newPassword,
								onChange: (e) => setNewPassword(e.target.value),
							}}
						/>
					</div>
					<PasswordValidationBlock password={newPassword} />
					<div className="mt-2">
						<Label
							htmlFor="confirmnewpassword"
							text="Confirm Password"
							className="text-[#273643] text-base font-semibold leading-6"
						/>
						<Input
							inputProps={{
								id: 'confirmnewpassword',
								placeholder: 'Confirm Password',
								type: 'password',
								autoComplete: 'new-password',
								pattern: passwordPattern.source,
								value: confirmNewPassword,
								onChange: (e) => setConfirmNewPassword(e.target.value),
							}}
						/>
					</div>
					<div className="mt-4 w-full flex justify-start xl:justify-end">
						<CallToAction type="submit" size="sm" disabled={isButtonDisabled}>
							Save Changes
						</CallToAction>
					</div>
				</Flex.Column>
			</form>
		</Wrapper>
	);
}

function SignOutBlock() {
	return (
		<Wrapper
			title="Sign out this Device"
			subTitle="End session on this connected device"
		>
			<div className="w-full mt-4 xl:mt-0 flex justify-start xl:justify-end ">
				<CallToAction
					type="button"
					size="sm"
					outline
					className="!border-[var(--primary-blue)] !text-[var(--primary-blue)]"
				>
					Sign Out
				</CallToAction>
			</div>
		</Wrapper>
	);
}

function DeleteBlock() {
	const { mutateAsync: deleteAccount, isPending } = useDeleteAccountMutation();
	const { createDisclosure, createToast } = useFeedback();
	const { logOut } = useUserStore();
	return (
		<Wrapper
			title="Delete Account"
			subTitle="This action will erase all your information"
		>
			<div className="w-full mt-4 xl:mt-0 flex justify-start xl:justify-end ">
				<CallToAction
					onClick={async () => {
						await createDisclosure({
							title: 'Delete Account',
							message: 'Are you sure you want to delete your account?',
						});

						try {
							await deleteAccount(null);
							createToast({
								title: 'Account Deleted',
								message:
									'Your account has been deleted, you will be logged out. We are sorry to see you go.',
								variant: 'primary',
							});

							logOut();
						} catch (error) {
							createToast({
								title: 'Error',
								message: 'An error occurred while deleting your account',
								variant: 'error',
							});
						}
					}}
					type="button"
					size="sm"
					outline
					isLoading={isPending}
					variant="error"
				>
					Delete Account
				</CallToAction>
			</div>
		</Wrapper>
	);
}
