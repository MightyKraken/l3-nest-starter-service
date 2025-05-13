import pluginJs from '@eslint/js';
import eslintPluginPrettier from 'eslint-plugin-prettier/recommended';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import unusedImports from 'eslint-plugin-unused-imports';
import globals from 'globals';
import tseslint from 'typescript-eslint';

/** @type {import('eslint').Linter.Config[]} */
export default [
	{
		plugins: {
			'simple-import-sort': simpleImportSort,
			'unused-imports': unusedImports,
			'@typescript-eslint/tslint': tseslint
		}
	},
	{ ignores: ['eslint.config.mjs', 'node_modules/', 'dist/', '.angular/'] },
	{ files: ['src/*.{js,mjs,cjs,ts}'] },
	{
		languageOptions: {
			globals: {
				...globals.node,
				...globals.jest
			},
			sourceType: 'commonjs',
			parser: '@typescript-eslint/parser',
			parserOptions: {
				projectService: true,
				tsconfigRootDir: import.meta.dirname
			}
		}
	},
	pluginJs.configs.recommended,
	...tseslint.configs.recommendedTypeChecked,
	...tseslint.configs.recommended,
	eslintPluginPrettier,
	{
		rules: {
			'simple-import-sort/imports': 'error',
			'simple-import-sort/exports': 'error',
			'unused-imports/no-unused-imports': 2,
			'constructor-super': 'error',
			'no-multiple-empty-lines': ['error', { max: 1 }],
			'no-var': 'error',
			'@typescript-eslint/array-type': ['error', { default: 'generic' }],
			'@typescript-eslint/adjacent-overload-signatures': 'error',
			'@typescript-eslint/no-unused-vars': 'off',
			'@typescript-eslint/no-explicit-any': 'off',
			'@typescript-eslint/no-floating-promises': 'off',
			'@typescript-eslint/no-unsafe-argument': 'off',
			'@typescript-eslint/no-unsafe-return': 'off',
			'@typescript-eslint/no-unsafe-member-access': 'off',
			'@typescript-eslint/no-unsafe-call': 'off',
			'@typescript-eslint/explicit-function-return-type': [
				'warn',
				{
					allowExpressions: true,
					allowTypedFunctionExpressions: true
				}
			]
		}
	}
];
