/**
 * 📝 Notes for Contributors:
 *
 * @description
 *
 * - When creating an interactive component, we recommend consuming the
 * component hook created.
 * - Ensure the component is composable and can adapt to multiple use-cases
 *
 * Bootstrapped by Plop
 */

import React, { useCallback, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import classNames from 'classnames';

import {
	createErrorWithCode,
	forwardRefWrapper,
	generateUUID,
} from '../../utils';

import { useFormField } from './form-field';
import { NativeElementProps, Prettify } from '@labs/utils/types/utility';

import styles from './field.module.scss';

type FieldElementTypes = 'select' | 'input' | 'textarea';
type FieldInputTypes =
	| 'text'
	| 'email'
	| 'password'
	| 'number'
	| 'tel'
	| 'url'
	| 'search'
	| 'date';

export interface FieldProps {
	/**
	 * The label for the field
	 */
	label?: string | React.ReactNode;

	/**
	 * The leading icon for the field
	 */
	leadingIcon?: React.ReactNode;

	/**
	 * The trailing icon for the field
	 */
	trailingIcon?: React.ReactNode;

	/**
	 * Autocomplete attribute for the field
	 */
	autocomplete?: string;

	/**
	 * The type of the field
	 */
	type?: FieldInputTypes;

	/**
	 * The name of the field
	 */
	name?: string;

	/**
	 * The value of the field
	 */
	value?: string;

	/**
	 * Validation rules for the field (onBlur, onChange)
	 */
	validationMode?: 'onBlur' | 'onChange';

	/**
	 * Validation pattern for the field
	 */
	validationPattern?: keyof typeof validationMap | string;

	/**
	 * check if the field is required
	 */
	required?: boolean;

	/**
	 * Error message to display
	 */
	error?: string;

	/**
	 * allow password hint display
	 */
	passwordHint?: boolean;

	/**
	 * rounded corners
	 */
	rounded?: boolean;

	/**
	 * disable the field
	 * @default false
	 */
	disabled?: boolean;

	/**
	 * disable the animation
	 */
	noAnimation?: boolean;

	/**
	 * reset input if the value is invalid
	 */
	resetOnInvalid?: boolean;
	/**
	 * wrapper class name
	 */
	wrapperClassName?: string;
	/**
	 * Callback function that is fired when the user types in the input.
	 */
	options?: {
		value: string;
		label: string;
		disabled?: boolean;
	}[];
}

/**
 * Creates the dynamic component type based on the passed in component
 * @param T - The component type
 */
export type FieldInstance<T> = Prettify<
	FieldProps & (T extends FieldElementTypes ? NativeElementProps<T> : never)
>;

/* Creating a map of validation functions. */
const validationMap = {
	required: (value: string) => value?.trim()?.length > 0,

	email: (value: string) => {
		const re =
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(String(value).toLowerCase());
	},

	username: (value: string) => {
		const re = /^[a-zA-Z0-9]+([_ -]?[a-zA-Z0-9])*$/;
		return re.test(String(value));
	},

	password: (value: string) => {
		const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z])(?=.{8,})/;
		return re.test(String(value));
	},
};

export const fieldFactory = <T extends FieldElementTypes>(component: T) =>
	forwardRefWrapper<NativeElementProps<T>, FieldInstance<T | 'input'>>(
		`Field.${component}`,
		{
			children: null,
			required: false,
			autocomplete: 'off',
			validationMode: 'onBlur',
			passwordHint: true,
			rounded: false,
			noAnimation: false,
			disabled: false,
		},
		(props, ref) => {
			const {
				type,
				name,
				value,
				error,
				label,
				rounded,
				required,
				children,
				disabled,
				noAnimation,
				leadingIcon,
				passwordHint,
				trailingIcon,
				autocomplete,
				validationMode,
				resetOnInvalid,
				wrapperClassName,
				validationPattern,

				//----------------------------------------------------------------
				...rest
			} = props;
			const { canSubmit, _setFormFieldCanSubmit: setCanSubmit } =
				useFormField();

			if (!name && required)
				throw createErrorWithCode(
					'field-name-required',
					`Field.${component}`,
					'name prop is required when required is true'
				);

			const Component = (component || 'input') as React.ElementType;

			const fieldId = useMemo(() => generateUUID(), []);

			const [invalid, setInvalid] = React.useState({
				message: '',
				password: {
					length: false,
					number: false,
					lowercase: false,
					uppercase: false,
				},
			});

			const [isDirty, setIsDirty] = React.useState(false);
			const [passwordVisible, setPasswordVisible] = React.useState(false);

			const getType = useMemo(() => {
				const isPassword = passwordVisible ? 'text' : 'password';

				return type === 'password' ? isPassword : type;
			}, [type, passwordVisible]);

			const cleanText = (val: string) => {
				const _val = val.replace(/[^a-zA-Z ]/g, ' ');
				return _val.charAt(0).toUpperCase() + _val.slice(1);
			};

			const validateValue = useCallback(
				(e: React.ChangeEvent<NativeElementProps<T>>) => {
					const _val = (e.target as any).value! || value;
					const idleState = {
						message: '',
						password: {
							length: false,
							number: false,
							lowercase: false,
							uppercase: false,
						},
					};

					const messageType = name || label?.toString() || type || 'field';

					if (!isDirty && !required) return;

					setCanSubmit?.((prev: any) => ({
						...prev,
						[messageType!]: true,
					}));

					if (required && !validationMap.required(_val!)) {
						setCanSubmit?.((prev: any) => ({
							...prev,
							[messageType!]: false,
						}));

						return setInvalid({
							...idleState,
							message:
								error ?? `The ${cleanText(messageType)} field is required`,
						});
					}

					if (
						validationPattern ||
						(Object.keys(validationMap).includes(type || '') && _val.length > 0)
					) {
						const canBeValidMap =
							typeof validationPattern === 'string' &&
							Object.keys(validationMap).includes(
								validationPattern.replaceAll('/', '')
							)
								? validationPattern
								: null;

						if (
							!validationMap[
								(canBeValidMap as keyof typeof validationMap) ||
									(type as keyof typeof validationMap) ||
									''
							]?.(_val)
						) {
							setCanSubmit?.((prev: any) => ({
								...prev,
								[messageType]: false,
							}));

							if (resetOnInvalid) return ((e.target as any).value = '');

							return setInvalid((prev) => ({
								...prev,
								message: `The ${cleanText(messageType)} field is not valid`,
								password: {
									length: _val.length >= 8,
									number: /[0-9]/.test(_val) || /[^A-Za-z0-9]/.test(_val),
									lowercase: /[a-z]/.test(_val),
									uppercase: /[A-Z]/.test(_val),
									justNumbers: /[0-9]/.test(_val),
									justSymbols: /[^A-Za-z0-9]/.test(_val),
								},
							}));
						}

						if (!canBeValidMap && validationPattern) {
							const convertStringToRegex = (str: string) => {
								const [_, flags] = str.split('/');

								if (!flags)
									throw createErrorWithCode(
										'invalid-regex',
										'Field',
										'Invalid regex pattern'
									);

								return new RegExp(flags);
							};

							if (
								!convertStringToRegex(validationPattern as string)?.test(_val)
							)
								return setInvalid((prev) => ({
									...prev,
									message: `The ${cleanText(
										messageType
									)} field is not valid 'ffff`,
								}));
						}
					}

					return setInvalid((prev) => ({
						...prev,
						message: '',
					}));
				},
				[
					required,
					type,
					value,
					error,
					name,
					isDirty,
					resetOnInvalid,
					label,
					setCanSubmit,
					validationPattern,
				]
			);

			return (
				<AnimatePresence mode="wait">
					<fieldset
						className={classNames([styles.FieldSet])}
						disabled={disabled}
						aria-disabled={disabled}
						data-amlabs-fieldset={component}
					>
						{label && (
							<motion.label
								layout={!noAnimation ? 'size' : false}
								htmlFor={fieldId}
								className={styles.FieldLabel}
							>
								{label}{' '}
								{required && <span className={styles.FieldRequired}>*</span>}
							</motion.label>
						)}

						<motion.div
							layout={!noAnimation ? 'size' : false}
							data-amlabs-field-wrapper={component}
							className={classNames([
								styles.FieldWrapper,
								'field-wrapper__container',
								rounded && styles.rounded,
								disabled && styles.disabled,
								wrapperClassName,
							])}
						>
							{leadingIcon && (
								<div
									className={classNames([styles.leadingIcon, 'leading-icon'])}
									aria-hidden="true"
								>
									{leadingIcon}
								</div>
							)}

							<Component
								aria-required={required}
								id={fieldId}
								required={required}
								data-testid="field-input"
								aria-invalid={!!invalid.message}
								ref={ref}
								data-amlabs-field={component}
								type={getType}
								name={name}
								value={value}
								autoComplete={autocomplete}
								disabled={disabled}
								{...rest}
								onChange={(e: React.ChangeEvent<NativeElementProps<T>>) => {
									if (!required)
										setCanSubmit?.((prev: any) => ({
											...prev,
											[name || label?.toString() || type || 'field']: true,
										}));

									if (value && value?.length > 1) setIsDirty(true);

									if (
										(validationMode === 'onChange' && required && isDirty) ||
										(type === 'password' && required)
									)
										validateValue(e);

									return rest.onChange?.(e as any);
								}}
								onKeyDown={(e: React.KeyboardEvent<NativeElementProps<T>>) => {
									if (e.key === 'Enter') {
										if (required && isDirty) validateValue(e as any);
									}

									return rest.onKeyDown?.(e as any);
								}}
								onBlur={(e: React.ChangeEvent<NativeElementProps<T>>) => {
									if (!isDirty && type !== 'password') setIsDirty(true);

									if (!required)
										setCanSubmit?.((prev: any) => ({
											...prev,
											[name || label?.toString() || type || 'field']: true,
										}));

									if (validationMode === 'onBlur' && required) validateValue(e);
									return rest.onBlur?.(e as any);
								}}
							>
								{component === 'select' && rest.options
									? rest?.options?.map((option) => (
											<option
												key={option.value}
												value={option.value}
												disabled={option.disabled}
											>
												{option.label}
											</option>
										))
									: children}
							</Component>

							{type === 'password' && (
								<button
									aria-label={`${passwordVisible ? 'Hide' : 'Show'} Password`}
									className={classNames([
										styles.FieldPasswordToggle,
										passwordVisible && styles.FieldPasswordToggleActive,
									])}
									type="button"
									onClick={(e) => {
										e.preventDefault();
										e.stopPropagation();
										setPasswordVisible(!passwordVisible);
									}}
								>
									<img
										src="data:image/svg+xml,%0A%3Csvg width='24' height='15' viewBox='0 0 24 15' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath opacity='0.4' fill-rule='evenodd' clip-rule='evenodd' d='M11.9999 0C7.41453 0 3.25615 2.63033 0.187741 6.90292C-0.0625803 7.25282 -0.0625803 7.7419 0.187741 8.09206C3.25615 12.3694 7.41453 15 11.9999 15C16.5855 15 20.7437 12.3694 23.8121 8.09708C24.0626 7.74692 24.0626 7.2581 23.8121 6.90794C20.7437 2.63033 16.5855 0 11.9999 0ZM12.3288 12.7814C9.28509 12.9822 6.77139 10.3516 6.96292 7.15502C7.11996 4.51941 9.15732 2.38325 11.671 2.21859C14.715 2.01777 17.2284 4.6481 17.0371 7.84498C16.8751 10.4753 14.8377 12.6115 12.3288 12.7814ZM12.1768 10.3413C10.5369 10.4494 9.18199 9.03381 9.28988 7.31466C9.37328 5.89406 10.4731 4.74616 11.828 4.65338C13.468 4.54534 14.8228 5.96092 14.715 7.68007C14.6265 9.106 13.5269 10.2538 12.1768 10.3413Z' fill='%23868686'/%3E%3C/svg%3E%0A"
										aria-hidden="true"
									/>
								</button>
							)}

							{trailingIcon && (
								<div
									className={classNames([styles.trailingIcon, 'trailing-icon'])}
									aria-hidden="true"
								>
									{trailingIcon}
								</div>
							)}
						</motion.div>

						{!!invalid.message && (
							<motion.div
								className={styles.FieldError}
								role="alert"
								layout={!noAnimation ? 'size' : false}
								aria-describedby={fieldId}
								aria-live="assertive"
								aria-atomic="true"
							>
								{invalid.message}
							</motion.div>
						)}
					</fieldset>
				</AnimatePresence>
			);
		}
	);
