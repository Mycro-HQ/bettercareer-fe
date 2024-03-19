module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	plugins: ['react'],
	extends: ['next', 'plugin:react/recommended', 'plugin:prettier/recommended'],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	rules: {
		'prettier/prettier': 'error',
	},
};
