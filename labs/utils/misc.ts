import { Document, Packer } from 'docx';

import { APP_URL } from '@lib/config';

import { createResumeDocument } from './text-docx';

function getRandomBytes(byteCount: number): Uint8Array {
	let randomBytes = new Uint8Array(byteCount);
	if (
		typeof crypto !== 'undefined' &&
		typeof crypto.getRandomValues === 'function'
	) {
		randomBytes = crypto.getRandomValues(new Uint8Array(byteCount));
	} else {
		// Fallback to Math.random()
		for (let i = 0; i < byteCount; i++) {
			randomBytes[i] = Math.floor(Math.random() * 256);
		}
	}
	return randomBytes;
}

/**
 * The function `generateUUIDv4` generates a Version 4 UUID (Universally Unique Identifier) in
 * TypeScript.
 * @returns The function `generateUUIDv4()` returns a randomly generated UUID (Universally Unique
 * Identifier) in version 4 format.
 */

export function generateUUID(): string {
	const randomBytes = getRandomBytes(16);

	randomBytes[6] = (randomBytes[6] & 0x0f) | 0x40; // Version 4
	randomBytes[8] = (randomBytes[8] & 0x3f) | 0x80; // Variant 10xx

	let uuid = 'bc-';
	for (let i = 0; i < 16; i++) {
		if (i === 4 || i === 6 || i === 8 || i === 10) {
			uuid += '-';
		}
		uuid += randomBytes[i].toString(16).padStart(2, '0');
	}

	return uuid;
}

export const getSSRCssRules = (): string[] => {
	if (
		typeof (global as any) !== 'undefined' &&
		(global as any).__NEXT_SSR_CSS_RULES__
	) {
		return (global as any).__NEXT_SSR_CSS_RULES__;
	}

	return [];
};

export function openPopupWindow(
	url = '',
	{ name = '', width = 600, height = 400 } = {}
) {
	const left = window.innerWidth / 2 - width / 2;
	const top = window.innerHeight / 2 - height / 2;
	const options = {
		toolbar: 'no',
		location: 'no',
		directories: 'no',
		status: 'no',
		menubar: 'no',
		scrollbars: 'no',
		resizable: 'no',
		copyhistory: 'no',
		width,
		height,
		top,
		left,
	};
	const optionsString = Object.entries(options)
		.map(([key, value]) => `${key}=${value}`)
		.join(',');

	return window.open(url, name, optionsString);
}

export async function getLocationFromPopup(popup: {
	location: Location;
	closed: boolean | undefined;
	close: () => void;
}): Promise<any> {
	return new Promise((resolve, reject) => {
		let timer: number | undefined;

		function getLocation() {
			if (!popup || popup.closed || typeof popup.closed === 'undefined') {
				clearTimeout(timer!);
				reject(new Error('Popup closed'));
				return;
			}

			try {
				const { hostname } = popup.location;
				const anchor = document.createElement('a');
				anchor.href = APP_URL as string;

				const hostnameSearch = anchor.hostname;

				if (hostname.includes(hostnameSearch)) {
					clearTimeout(timer!);
					popup.close();
					resolve(popup.location);
					return;
				}
			} catch (error) {
				// Ignore DOMException: Blocked a frame with origin from accessing a cross-origin frame.
				// A hack to get around same-origin security policy errors in IE.
			}

			timer = window.setTimeout(getLocation, 500);
		}

		getLocation();
	});
}

/**
 * Scale bytes to its proper byte format
 * e.g:
 *
 *   1253656 => '1.20MB'
 *
 *   1253656678 => '1.17GB'
 * @param b The size in bytes.
 * @param factor The factor to divide by.
 * @param suffix The suffix to add to the end.
 */
export function getSizeFormat(
	b: number,
	factor: number = 1024,
	suffix: string = 'B'
): string {
	const units: string[] = ['', 'K', 'M', 'G', 'T', 'P', 'E', 'Z'];

	for (const unit of units) {
		if (b < factor) {
			return `${b.toFixed(2)}${unit}${suffix}`;
		}
		b /= factor;
	}

	return `${b.toFixed(2)}Y${suffix}`;
}

/**
 * Recursively appends data from an object to a FormData object, handling nested objects and arrays.
 * @param data The object containing the data to append.
 * @param parentKey A string representing the nested keys for form data (used internally for recursion).
 * @param formData The FormData object to append data to. If not provided, a new instance is created.
 * @returns The FormData object with appended data.
 */
export const formDataAppender = (
	data: { [key: string]: any },
	parentKey = '',
	formData: FormData = new FormData()
): FormData => {
	Object.entries(data).forEach(([key, value]) => {
		const newKey = parentKey ? `${parentKey}[${key}]` : key;

		if (Array.isArray(value)) {
			// Handle arrays: Recursively append each item.

			value.forEach((item, index) => {
				// Append each item in the array with the same key.

				formData.append(`${newKey}[${index}]`, item);
			});
		} else if (
			typeof value === 'object' &&
			value !== null &&
			!(value instanceof Blob)
		) {
			// Recursively handle nested objects, excluding Blobs.

			formDataAppender(value, newKey, formData);
		} else {
			let _value = value;

			if (
				typeof _value === 'string' &&
				(_value?.startsWith('data:') || _value?.includes('[object File]'))
			) {
				// Handle base64 encoded strings.
				const file = data[key].split(',')[1];
				const mimeType = data[key].split(';')[0].split(':')[1];
				const blob = new Blob([file], { type: mimeType });

				_value = blob;
			}

			formData.append(newKey, _value);
		}
	});

	for (const [key, value] of formData.entries()) {
		if (
			typeof value === 'undefined' ||
			value === 'undefined' ||
			value === null ||
			value === ''
		) {
			formData.delete(key);
		}
	}

	return formData;
};

export function isDate(dateStr: string) {
	return !isNaN(new Date(dateStr).getDate());
}

export function isEmpty(value: any) {
	if (value === null || value === undefined) return true;
	if (Array.isArray(value)) return value.length === 0;
	if (typeof value === 'object') return Object.keys(value).length === 0;
	return false;
}

export const fixText = (
	text: string,
	options?: {
		prefix?: string;
		suffix?: string;
	}
) => {
	return text ? `${options?.prefix || ''}${text}${options?.suffix || ''}` : '';
};

export const downloadResume = async (
	raw: string,
	name = 'resume',
	type: 'pdf' | 'txt' | 'docx' = 'pdf'
) => {
	const applicationTypes = {
		pdf: 'application/pdf',
		txt: 'text/plain',
		docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
	};
	let url = '';
	if (type === 'docx') {
		//get the text from the raw data

		// Create a new document

		const doc = createResumeDocument(raw);

		const _doc = new Document({
			sections: doc as any,
			styles: { default: { heading1: { run: { size: 28, bold: true } } } },
		});
		// Write the document to a file
		const buffer = await Packer.toBlob(_doc);

		url = window.URL.createObjectURL(
			new Blob([buffer], { type: applicationTypes[type] })
		);
	} else {
		url = window.URL.createObjectURL(
			new Blob([raw], { type: applicationTypes[type] })
		);
	}

	const a = document.createElement('a');
	a.href = url;
	a.download = `${name}.${type}`;
	document.body.appendChild(a);
	a.click();
	window.URL.revokeObjectURL(url);
	document.body.removeChild(a);
};

/**
 * Truncate a given text to a specified length and append an ellipsis if the text is longer
 * than the specified length.
 *
 * @param {string} text - The text to be truncated.
 * @param {number} length - The maximum length of the text.
 *
 * @returns {string} - The truncated text.
 */
export const truncateText = (
	text: string,
	length: number,
	ellipsis = true
): string => {
	// Check if the text length is greater than the specified length.
	// If not, simply return the original text.
	if (text?.length <= length) {
		return text;
	}

	// If the text is longer than the specified length, truncate it and append an ellipsis.
	return `${text?.slice(0, length - 1)}${ellipsis ? '…' : ''}`;
};

export function capitalize(text: string): string {
	return text.charAt(0).toUpperCase() + text.slice(1);
}

function formatCount(count: number) {
	const formattedCount = Number(count).toLocaleString('en-US', {
		minimumFractionDigits: 0,
		maximumFractionDigits: 2,
	});

	return formattedCount;
}

export function pluralize(string: string, count: number, stringOnly = false) {
	let pluralSuffix = 's';

	if (count <= 1 || string.endsWith(pluralSuffix)) {
		pluralSuffix = '';
	}

	const newString = `${string}${pluralSuffix}`;

	if (stringOnly) {
		return newString;
	}

	const countString = formatCount(count);
	const resultString = `${countString} ${newString}`;

	return resultString;
}

export const wait = (ms: number) =>
	new Promise((resolve) => setTimeout(resolve, ms));

export const parseValue = (item: any) => {
	if (!item) return null;

	if (typeof item === 'string') {
		return item;
	}

	if (typeof item === 'object') {
		if (typeof item?.value === 'string') {
			return [item?.value];
		}

		return item?.value;
	}

	return null;
};

export const slugify = (text: string) => {
	return text
		.toString()
		.toLowerCase()
		.replace(/\s+/g, '-')
		.replace(/[^\w-]+/g, '')
		.replace(/--+/g, '-')
		.replace(/^-+/, '')
		.replace(/-+$/, '');
};

export const cleanText = (val: string) => {
	const _val = val.replace(/[^a-zA-Z ]/g, ' ');
	return _val.charAt(0).toUpperCase() + _val.slice(1);
};
