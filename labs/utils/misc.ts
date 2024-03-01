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
