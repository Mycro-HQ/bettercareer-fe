import React from 'react';
import classNames from 'classnames';

import {
	hasUpperCase,
	hasLowerCase,
	hasMinimumLength,
	hasNumber,
	hasSpecialCharacter,
	fillPasswordPill,
} from '../utils';

import { Text } from '@labs/components';
import CheckmarkIcon from '@labs/icons/dashboard/checkmark-circle.svg';

export function PasswordValidationBlock({ password }: { password: string }) {
	return (
		<div className="w-full">
			<div className="w-full sm:w-3/5">
				<PasswordPillContainer changeFn={fillPasswordPill(password)} />
				<PasswordTextContainer password={password} />
			</div>
		</div>
	);
}

export function PasswordPillContainer({ changeFn }: { changeFn: number }) {
	return (
		<div className="flex gap-x-2 mb-4">
			<PasswordPill index={1} changeIndex={changeFn} />
			<PasswordPill index={2} changeIndex={changeFn} />
			<PasswordPill index={3} changeIndex={changeFn} />
			<PasswordPill index={4} changeIndex={changeFn} />
			<PasswordPill index={5} changeIndex={changeFn} />
		</div>
	);
}

export function PasswordPill({
	index,
	changeIndex,
}: {
	index: number;
	changeIndex: number;
}) {
	return (
		<div
			className={classNames(
				'mt-4 h-2 w-1/5 rounded-full',
				index <= changeIndex ? 'bg-[#1388f2]' : 'bg-[#E7E9EB]'
			)}
		/>
	);
}

export function PasswordTextContainer({ password }: { password: string }) {
	return (
		<div className="flex flex-col md:flex-row flex-wrap gap-x-7 gap-y-2">
			<PasswordText
				text="Uppercase letter"
				changeStroke={hasUpperCase(password)}
			/>
			<PasswordText
				text="Lowercase letter"
				changeStroke={hasLowerCase(password)}
			/>
			<PasswordText text="Number" changeStroke={hasNumber(password)} />
			<PasswordText
				text="Special character"
				changeStroke={hasSpecialCharacter(password)}
			/>
			<PasswordText
				text="Miniumum of 8 characters"
				changeStroke={hasMinimumLength(password)}
			/>
		</div>
	);
}

export function PasswordText({
	text,
	changeStroke,
}: {
	text: string;
	changeStroke: boolean;
}) {
	return (
		<div
			className={classNames(
				'flex items-center gap-x-2',
				changeStroke
					? '[&>svg>path]:stroke-[#1388f2]'
					: '[&>svg>path]:stroke-[#868E96]'
			)}
		>
			<CheckmarkIcon className="h-4 w-4" />
			<Text
				color={changeStroke ? 'var(--primary-blue)' : 'var(--text-gray-light)'}
				size="sm"
				weight={500}
				lineHeight="20px"
			>
				{text}
			</Text>
		</div>
	);
}
