import { FieldDate } from './date-field';
import { FormField } from './form-field';
import { Checkbox, Radio, Switch } from '../checkable-interactive';
import { Autocomplete } from '../autocomplete';
import { fieldFactory } from './field';
/**
 * Creating a Field component that can be used to create input, textarea, and select fields.
 * @param {FieldProps} - Field props
 * @returns {React.ReactElement} - {Field, Field.Textarea, Field.Input, Field.Select, Field.Form} components
 *
 * @example
 *
 * <Field.Form>
 *  <Field.Input label="Email" name="email" required />
 *  <Field.Input label="Password" name="password" type="password" required />
 *   <Field.Select label="Country" name="country" required>
 *   <option value="US">United States</option>
 *  </Field.Select>
 *  <Field.Textarea label="Message" name="message" required />
 *  <Button type="submit">Submit</Button>
 * </Field.Form>
 */

export const Field = Object.assign(fieldFactory('input'), {
	Textarea: fieldFactory('textarea'),
	Input: fieldFactory('input'),
	Select: fieldFactory('select'),
	Form: FormField,
	Checkbox,
	Switch,
	Radio,
	AutoComplete: Autocomplete,
	Date: FieldDate,
});
