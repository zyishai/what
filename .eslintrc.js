const isProduction =
	process.env.NODE_ENV === 'prod' || process.env.NODE_ENV === 'production'

module.exports = {
	env: {
		browser: true,
		node: true,
		commonjs: true,
		es6: true
	},
	extends: 'eslint:recommended',
	parser: 'babel-eslint',
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
			modules: true
		},
		ecmaVersion: 2018,
		sourceType: 'module'
	},
	plugins: ['react'],
	rules: {
		indent: ['error', 'tab'],
		'linebreak-style': ['error', 'unix'],
		quotes: ['error', 'single'],
		semi: ['error', 'never'],
		'no-console': isProduction ? 'on' : 'off',
		'no-debugger': isProduction ? 'warn' : 'off',
		'react/jsx-uses-react': [2],
		'react/jsx-uses-vars': [2]
	}
}
