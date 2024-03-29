declare module '@radix-ui/themes' {
	import * as RadixThemes from '@radix-ui/themes/dist/cjs';
	export const {
		Avatar,
		DropdownMenu,
		Theme,
		TextField,
		Slot,
		ScrollArea,
	}: typeof RadixThemes = require('@radix-ui/themes/dist/cjs/components/avatar');
}

declare module 'js-cookie' {
	interface CookieAttributes {
		expires?: number | Date;
		path?: string;
		domain?: string;
		secure?: boolean;
		sameSite?: 'Strict' | 'Lax' | 'None';
	}

	interface CookiesStatic {
		get(name: string): string | undefined;
		set(name: string, value: string, options?: CookieAttributes): void;
		// Add more methods as needed
	}

	const Cookies: CookiesStatic;
	export = Cookies;
}
