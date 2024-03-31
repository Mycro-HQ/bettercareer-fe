module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true,
	},
	plugins: ['react', 'prettier', 'import', 'jsx-a11y', 'unused-imports'],
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
		'no-unused-vars': 'off',
		'unused-imports/no-unused-imports': 'error',
		'unused-imports/no-unused-vars': [
			'warn',
			{
				vars: 'all',
				varsIgnorePattern: '^_',
				args: 'after-used',
				argsIgnorePattern: '^_',
			},
		],
		'react/display-name': 'off',
		'react/react-in-jsx-scope': 'off',
		'jsx-a11y/label-has-associated-control': 0,
		'jsx-a11y/label-has-for': 0,
		'jsx-a11y/no-noninteractive-element-to-interactive-role': 0,
		'import/order': [
			'warn',
			{
				groups: [
					'builtin',
					'external',
					'parent',
					'internal',
					'index',
					'sibling',
				],
				'newlines-between': 'always',
			},
		],
		'sort-imports': ['warn', { ignoreDeclarationSort: true }],
	},
};
