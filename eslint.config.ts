import path from 'node:path'
import ts from 'typescript-eslint'
import love from 'eslint-config-love'
import astro from 'eslint-plugin-astro'
import svelte from 'eslint-plugin-svelte'
import { includeIgnoreFile } from '@eslint/config-helpers'
import svelteConfig from './svelte.config.js'

const ignorePath = path.join(import.meta.dirname, '.gitignore')

export default [
  includeIgnoreFile(ignorePath, {
    gitignoreResolution: true,
  }),
  ...svelte.configs.prettier,
  ...astro.configs.recommended,
  ...svelte.configs.recommended,
  {
    ...love,
    files: ['**/*.js', '**/*.ts'],
    rules: {
      ...love.rules,
      'no-param-reassign': 'off',
      'require-atomic-updates': 'off',
      'prefer-named-capture-group': 'off',
      '@typescript-eslint/unbound-method': 'off',
      '@typescript-eslint/no-magic-numbers': 'off',
      '@typescript-eslint/naming-convention': 'off',
      '@typescript-eslint/prefer-destructuring': 'off',
      '@typescript-eslint/triple-slash-reference': 'off',
      '@typescript-eslint/no-unsafe-type-assertion': 'off',
      '@typescript-eslint/consistent-type-definitions': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-unnecessary-type-parameters': 'off',
      'no-console': ['warn', { allow: ['info', 'warn', 'error'] }],
    },
  },
  {
    files: ['**/*.svelte', '**/*.svelte.ts', '**/*.svelte.js'],
    languageOptions: {
      parserOptions: {
        projectService: true,
        extraFileExtensions: ['.svelte'],
        parser: ts.parser,
        svelteConfig,
      },
    },
  },
]
