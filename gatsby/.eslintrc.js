module.exports = {
	globals: {
		__PATH_PREFIX__: true
	},

	plugins: ['react', 'jsx-a11y'],
	extends: ['eslint:recommended', 'react-app', 'plugin:react/recommended', 'plugin:jsx-a11y/strict'],
	rules: {
		// 'no-console': 1,
		'react-hooks/exhaustive-deps': 0,
		semi: [2, 'always'],
		'jsx-quotes': [2, 'prefer-double'],
		quotes: [2, 'single'],
		'no-var': 2,
		'arrow-spacing': 2,
		'no-import-assign': 2,
		'no-template-curly-in-string': 2,
		'require-await': 2
	}
};
