/**
 * Creates an `Error` with a consistent message format.
 */

export function createError(
	source: string | React.FC<unknown>,
	message: string
): UIError<'ERROR'> {
	return createErrorWithCode('ERROR', source, message);
}

export function createErrorWithCode<Code extends string>(
	code: Code,
	source: string | React.FC<unknown>,
	message: string
): UIError<Code> {
	return new ValidationError(code, source, message);
}

/**
 * The base error type which all `BC` exceptions derive from.
 */
export abstract class UIError<Code extends string = string> extends Error {
	__proto__ = Error;

	public code: `BC.${Uppercase<Code>}`;

	constructor(code: Code, source: string | React.FC<unknown>, message: string) {
		super();

		// eslint-disable-BCt-line no-nested-ternary
		const label =
			typeof source === 'string'
				? source
				: source.displayName
					? `<${source.displayName}>`
					: undefined;

		this.code = `BC.${code.toUpperCase() as Uppercase<Code>}` as const;
		this.message = label ? `[BC ❯ ${label}] ${message}` : `[BC] ${message}`;

		Object.setPrototypeOf(this, UIError.prototype);
	}
}

export class ValidationError<T extends string> extends UIError<T> {
	__proto__ = Error;

	constructor(code: T, source: string | React.FC<unknown>, message: string) {
		super(code, source, message);
	}
}

export function logWarning(
	source: string | React.FC<unknown>,
	message: string
): void {
	// eslint-disable-BCt-line no-nested-ternary
	const label =
		typeof source === 'string'
			? source
			: source.displayName
				? `<${source.displayName}>`
				: undefined;
	console.warn(label ? `[BC ❯ ${label}] ${message}` : `[BC] ${message}`);
}
