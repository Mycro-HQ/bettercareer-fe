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
import React, { useCallback, useEffect, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import classNames from 'classnames';

import { useClickOutside, useMount } from '../../utils';
import { getDataIcons } from '../../utils/data-icons';
import { Spinner } from '../spinner';

import { fieldFactory, type FieldInstance } from '../field/field';

import styles from './autocomplete.module.scss';

export const KEY_CODE = {
	ENTER: 'Enter',
	UP_ARROW: 'ArrowUp',
	DOWN_ARROW: 'ArrowDown',
	ESCAPE: 'Escape',
};

const Field = fieldFactory('input');

export interface AutocompleteProps
	extends Omit<
		Partial<FieldInstance<'input'>>,
		'onSelect' | 'onChange' | 'size'
	> {
	/**
	 * Input value of the autocomplete component
	 */
	value?: string;

	/**
	 * Placeholder text for the input
	 * @default "Search for a song, artist, or playlist"
	 */
	placeholder?: string;

	/**
	 * Callback function that is fired when the user selects a suggestion.
	 * @param value
	 * @returns
	 */
	onSelect?: (value: string) => void;

	/**
	 * Callback function that is fired when the user types in the input.
	 * @param e
	 * @returns
	 */
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;

	/**
	 * Suggestions to be displayed
	 * @default []
	 */
	suggestions?: string[];

	/**
	 * Property to show a loading indicator
	 */
	isLoading?: boolean;
	/**
	 * Size of the autocomplete component
	 */
	size?: 'sm' | 'lg';
}

/**
 * It's a search bar that shows suggestions as you type
 * @param {AutocompleteProps} props - The autocomplete props
 * @returns {JSX.Element} - The autocomplete component
 *
 * @example
 * <Autocomplete
 *   value={value}
 *   suggestions={suggestions}
 *   onChange={onChange}
 *   onSelect={onSelect}
 * />
 */
export const Autocomplete = ({
	value: sudoValue,
	suggestions = [],
	isLoading,
	onChange,
	onSelect,
	placeholder,
	autoFocus,
	size = 'sm',
	...rest
}: AutocompleteProps) => {
	const autoCompleteRef = React.useRef<HTMLDivElement>(null);
	const suggestionRef = React.useRef<HTMLDivElement>(null);

	const [unControlledValue, setUnControlledValue] = React.useState<string>('');
	const [showSuggestions, setShowSuggestions] = React.useState(false);
	const [activeSuggestionIndex, setActiveSuggestionIndex] =
		React.useState<number>(-1);

	const value = useMemo(() => {
		if (sudoValue !== undefined) return sudoValue;
		return unControlledValue;
	}, [sudoValue, unControlledValue]);

	const resetField = useCallback(() => {
		setShowSuggestions(false);
		setActiveSuggestionIndex(-1);
		setUnControlledValue('');
	}, []);

	useClickOutside(autoCompleteRef, () => {
		resetField();
	});

	useMount(() => {
		if (autoFocus) {
			const input = autoCompleteRef.current?.querySelector('input');
			input?.focus();
		}
	});

	useEffect(() => {
		const suggestion = suggestionRef.current;
		if (suggestion && activeSuggestionIndex > -1) {
			/**
			 * Allow users scroll suggestions into view when they use keyboard events
			 * to navigate through the list.
			 *
			 * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView
			 */
			suggestion.children[activeSuggestionIndex!]?.scrollIntoView?.({
				behavior: 'smooth',
				block: 'center',
			});
		}
	}, [activeSuggestionIndex, suggestions]);

	useEffect(() => {
		if (suggestions.length > 0) {
			const pickOne = suggestions.find(
				(suggestion) => suggestion.toLowerCase() === value?.toLowerCase()
			);

			if (pickOne) {
				setActiveSuggestionIndex(suggestions.indexOf(pickOne) || 0);
			} else {
				setActiveSuggestionIndex(-1);
			}
		}
	}, [value, suggestions, resetField]);

	const handleSelect = useCallback(
		(suggestion: string) => {
			if (typeof onSelect === 'function') {
				/**
				 * If the user passes a onSelect prop, we call it with the selected suggestion
				 * @example
				 * <Autocomplete onSelect={(suggestion) => console.log(suggestion)} />
				 */
				onSelect(suggestion);
			}

			if (typeof onChange === 'function') {
				/**
				 * If the user passes a onChange prop, we call it with the selected suggestion
				 * @example
				 * <Autocomplete onChange={(e) => console.log(e.target.value)} />
				 */
				onChange({
					target: { value: suggestion },
				} as React.ChangeEvent<HTMLInputElement>);
			} else {
				setUnControlledValue(suggestion);
			}
		},
		[onChange, onSelect]
	);

	const handleKeyDown = useCallback(
		async (e: React.KeyboardEvent<HTMLInputElement>) => {
			const { key: keyCode } = e;

			switch (keyCode) {
				case KEY_CODE.ENTER: {
					const getSuggestionValue = () => {
						if (activeSuggestionIndex > -1) {
							return suggestions[activeSuggestionIndex];
						} else {
							return value || (e.target as HTMLInputElement)?.value;
						}
					};
					e.preventDefault();
					const selectedValue = getSuggestionValue();

					if (selectedValue) {
						setShowSuggestions(false);
						return handleSelect(selectedValue);
					}

					return onSelect?.(selectedValue);
				}

				case KEY_CODE.UP_ARROW:
				case KEY_CODE.DOWN_ARROW: {
					return setActiveSuggestionIndex((prevIndex) => {
						const suggestionsCount = suggestions.length;
						let nextIndex = prevIndex;

						// Up arrow key pressed
						if (keyCode === KEY_CODE.UP_ARROW) {
							nextIndex = Math.max(0, prevIndex - 1);
						}

						// Down arrow key pressed
						if (keyCode === KEY_CODE.DOWN_ARROW) {
							nextIndex = Math.min(suggestionsCount - 1, prevIndex + 1);
						}

						return nextIndex;
					});
				}

				case KEY_CODE.ESCAPE: {
					e.preventDefault();
					return resetField();
				}
			}
		},
		[
			activeSuggestionIndex,
			resetField,
			suggestions,
			value,
			handleSelect,
			onSelect,
		]
	);

	const buildSuggestionItems = useCallback(
		(item: string) => {
			if (!value) return item;

			function escapeRegExp(string: string) {
				return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
			}

			const regex = new RegExp(`(${escapeRegExp(value)})`, 'gi');
			const parts = item.split(regex);
			const setMatcher =
				value?.toLowerCase() === item.toLowerCase()
					? 'var(--primary-blue)'
					: 'var(--text-black)';

			return parts.map((part, index) =>
				part.toLowerCase() === value?.toLowerCase() ? (
					<strong
						key={`${part}:${index}:highlighted`}
						style={{ color: setMatcher }}
					>
						{part}
					</strong>
				) : (
					<span key={`${part}:${index}`}>{part}</span>
				)
			);
		},
		[value]
	);

	return (
		<div
			className={classNames([
				styles.Autocomplete,
				styles[`Autocomplete--${size}`],
			])}
			ref={autoCompleteRef}
			data-amlabs-autocomplete
		>
			<Field
				noAnimation
				value={value}
				onKeyDown={(e) => {
					handleKeyDown(e);

					if (typeof rest?.onKeyDown === 'function') {
						rest?.onKeyDown(e);
					}
				}}
				data-testid="autocomplete-field"
				onChange={(e) => {
					/**
					 * To manage stale and inconsistent UI state when using uncontrolled component with controlled props
					 * we want to make sure that we are showing suggestions when the user is typing
					 */
					if (!showSuggestions) setShowSuggestions(true);

					if (typeof onChange === 'function') {
						return onChange(e);
					} else {
						return setUnControlledValue(e.target.value);
					}
				}}
				onFocus={() => setShowSuggestions(true)}
				placeholder={placeholder || 'Search'}
				trailingIcon={
					isLoading && value ? (
						<Spinner size={18} />
					) : !isLoading && value ? (
						<button
							onClick={() =>
								onChange?.({
									target: {
										value: '',
									},
								} as any)
							}
						>
							<img
								src={getDataIcons('close', '#6F7982')}
								style={{ width: '14px', height: '14px' }}
								aria-hidden="true"
							/>
						</button>
					) : null
				}
				{...rest}
			/>
			<AnimatePresence>
				{showSuggestions && suggestions.length && value ? (
					<motion.div
						layout
						ref={suggestionRef}
						id="autocomplete-suggestions"
						aria-live="polite"
						data-amlabs-autocomplete-suggestions
						aria-expanded={showSuggestions}
						exit={{ opacity: 0, height: 0 }}
						initial={{ opacity: 0, height: 0 }}
						data-testid="autocomplete-suggestions"
						animate={{ opacity: 1, height: 'auto' }}
						className={styles.Autocomplete__suggestions}
					>
						{suggestions.map((suggestion, idx) => (
							<button
								className={classNames([
									styles.Autocomplete__suggestions_item,
									activeSuggestionIndex === idx && styles.active,
								])}
								key={`${idx}:${suggestion}`}
								aria-label={suggestion}
								role="option"
								aria-selected={activeSuggestionIndex === idx}
								onClick={() => {
									onSelect?.(suggestion);
									setShowSuggestions(false);
								}}
							>
								{suggestion && buildSuggestionItems(suggestion)}
							</button>
						))}
					</motion.div>
				) : null}
			</AnimatePresence>
		</div>
	);
};
