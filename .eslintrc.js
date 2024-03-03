module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	plugins: ['@typescript-eslint', 'react', 'prettier'],
	extends: [
		'next',
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:react/recommended',
		'plugin:prettier/recommended',
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	ecmaVersion: 12,
	sourceType: 'module',
	project: './tsconfig.json',
	rules: {
		'prettier/prettier': 'error',
	},
};
