import { useMemo } from 'react';
import DatePicker from 'react-datepicker';
import classNames from 'classnames';
import { format, sub } from 'date-fns';
import { AnimatePresence, motion } from 'framer-motion';
import { FieldInstance } from './field';
import { generateUUID } from '@labs/utils';
import Calendar from '@labs/icons/dashboard/calendar.svg';

import styles from './field.module.scss';

export interface IFieldDate
	extends Omit<
		Partial<FieldInstance<'input'>>,
		'value' | 'onChange' | 'onSelect'
	> {
	/**
	 * Callback function that is fired when the user changes the date.
	 * @param date
	 * @returns
	 */
	onChange?: (date: Date) => void;
	/**
	 * Callback function that is fired when the user selects a date.
	 * @param date
	 * @returns
	 */
	onSelect?: (date: Date) => void;
	/**
	 * Placeholder text
	 */
	placeholder?: string;
	/**
	 * Date Value
	 */
	value?: string | Date;
}

/**
 * Date picker component
 * @param {IFieldDate} props - The field date props
 * @returns  {JSX.Element} - The field date component
 *
 * @example
 * <FieldDate label="Date" />
 * <FieldDate label="Date" placeholder="Select a date" />
 * <FieldDate label="Date" value={new Date()} />
 */
export const FieldDate: React.FC<IFieldDate> = ({
	onChange,
	onSelect,
	value,
	...props
}) => {
	const fieldId = useMemo(() => generateUUID(), []);
	const {
		label,
		required,
		disabled,
		noAnimation,
		rounded,
		leadingIcon,
		placeholder,
	} = props;

	return (
		<AnimatePresence>
			<fieldset
				className={styles.FieldSet}
				disabled={disabled}
				aria-disabled={disabled}
			>
				{label && (
					<motion.label
						layout={!noAnimation}
						htmlFor={fieldId}
						className={styles.FieldLabel}
					>
						{label}{' '}
						{required && <span className={styles.FieldRequired}>*</span>}
					</motion.label>
				)}

				<motion.div
					layout={!noAnimation}
					data-amlabs-field-wrapper={'date-wrapper'}
					className={classNames([
						styles.FieldWrapper,
						rounded && styles.rounded,
						disabled && styles.disabled,
					])}
				>
					<div
						className={classNames([styles.leadingIcon, 'leading-icon'])}
						aria-hidden="true"
					>
						{leadingIcon || <Calendar />}
					</div>

					<DatePicker
						selected={value ? new Date(value) : null}
						placeholderText={placeholder}
						required={required}
						onSelect={onSelect} //when day is clicked
						onChange={onChange!} //only when value has changed
						minDate={
							new Date(
								format(
									sub(Date.now(), { years: 100 }),
									"yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"
								)
							)
						}
						showPopperArrow={false}
						showMonthDropdown
						showYearDropdown
						dropdownMode="select"
						maxDate={
							new Date(
								format(
									sub(Date.now(), { years: 13 }),
									"yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"
								)
							)
						}
						{...props}
					/>
				</motion.div>
			</fieldset>
		</AnimatePresence>
	);
};

FieldDate.displayName = 'Field.date';
