import React, {
	Fragment,
	useContext,
	useMemo,
	useState,
	createContext,
} from 'react';
import { Toast } from '../toast';

import styles from './field.module.scss';

export interface FormFieldProps {
	/**
	 * Form field children
	 */
	children: React.ReactNode;

	/**
	 * Function to run on submit
	 * @param e
	 * @returns
	 */
	onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;

	/**
	 * If true, will validate all fields before submitting
	 */
	validateSubmit?: boolean;
}

const FormFieldContext = createContext({
	canSubmit: {},
	_setFormFieldCanSubmit: (canSubmit: any) => {},
});

export const useFormField = () => useContext(FormFieldContext);

export const FormFieldProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const [canSubmit, setCanSubmit] = useState({});

	return (
		<FormFieldContext.Provider
			value={{ canSubmit, _setFormFieldCanSubmit: setCanSubmit }}
		>
			{children}
		</FormFieldContext.Provider>
	);
};

export const FormField: React.FC<FormFieldProps> = ({
	children,
	onSubmit,
	validateSubmit = true,
}) => {
	const { canSubmit } = useFormField();
	const [toast, setToast] = useState(false);

	const cleanText = (val: string) => {
		const _val = val.replace(/[^a-zA-Z ]/g, ' ');
		return _val.charAt(0).toUpperCase() + _val.slice(1);
	};

	const invalidMessage = useMemo(() => {
		return Object.entries(canSubmit)
			.map(([key, value]) => {
				if (!value) return cleanText(key);
				return null;
			})
			.filter(Boolean)
			.join(', ');
	}, [canSubmit]);

	const validateCanSubmit = () => {
		if (!validateSubmit) return true;

		const canSubmitValues = Object.values(canSubmit);

		if (canSubmitValues.length === 0) return true;
		return canSubmitValues.every((can) => can);
	};

	return (
		<form
			className={styles.FormField}
			onSubmit={(e) => {
				if (!validateCanSubmit()) {
					e.preventDefault();
					setToast(true);
				}

				if (onSubmit && validateCanSubmit()) onSubmit(e);
			}}
		>
			<FormFieldProvider>
				{!!invalidMessage && toast && (
					<Toast
						variant="error"
						message={`The (${invalidMessage}) field(s) is required or not valid`}
						onClose={() => setToast(false)}
						position="relative"
						size="block"
					/>
				)}

				<Fragment>{children}</Fragment>
			</FormFieldProvider>
		</form>
	);
};
