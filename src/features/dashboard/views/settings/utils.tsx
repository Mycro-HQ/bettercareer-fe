export function hasUpperCase(str: string) {
	return str.length > 0 && /[A-Z]/.test(str);
}

export function hasLowerCase(str: string) {
	return str.length > 0 && /[a-z]/.test(str);
}

export function hasNumber(str: string) {
	return /[0-9]/.test(str);
}

export function hasSpecialCharacter(str: string) {
	return /[!@#$%^&*()_+\-=\[\]{};:"'\\|,.<>\/?~`]+/.test(str);
}

export function hasMinimumLength(str: string) {
	return str.length >= 8;
}

export function fillPasswordPill(password: string) {
	const requirements = [
		hasUpperCase,
		hasLowerCase,
		hasNumber,
		hasSpecialCharacter,
		hasMinimumLength,
	];
	let count = 0;

	for (const requirement of requirements) {
		if (requirement(password)) {
			count += 1;
		}
	}

	return count;
}
