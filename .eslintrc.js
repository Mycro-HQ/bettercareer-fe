module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true,
	},
	plugins: ['react'],
	extends: [
		'next',
		'next/core-web-vitals',
		'plugin:react/recommended',
		'plugin:prettier/recommended',
	],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	rules: {
		'prettier/prettier': 'error',
		'react/jsx-uses-react': 'off',
		'react/react-in-jsx-scope': 'off',
		'import/order': [
			'error',
			{
				groups: [
					'builtin',
					'external',
					'internal',
					'parent',
					'sibling',
					'index',
				],
				'newlines-between': 'always',
			},
		],
		'sort-imports': ['error', { ignoreDeclarationSort: true }], // Sort import lines
	},
};
