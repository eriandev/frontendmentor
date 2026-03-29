import { fileURLToPath } from 'node:url'
import ts from 'typescript-eslint'
import love from 'eslint-config-love'
import astro from 'eslint-plugin-astro'
import svelte from 'eslint-plugin-svelte'
import { includeIgnoreFile } from '@eslint/compat'
import svelteConfig from './svelte.config.js'

const gitignorePath = fileURLToPath(new URL('./.gitignore', import.meta.url))

export default [
  includeIgnoreFile(gitignorePath),
  ...svelte.configs.prettier,
  ...astro.configs.recommended,
  ...svelte.configs.recommended,
  {
    ...love,
    files: ['**/*.js', '**/*.ts'],
    rules: {
      ...love.rules,
      'no-param-reassign': 'off',
      'prefer-named-capture-group': 'off',
      '@typescript-eslint/unbound-method': 'off',
      '@typescript-eslint/no-magic-numbers': 'off',
      '@typescript-eslint/prefer-destructuring': 'off',
      '@typescript-eslint/triple-slash-reference': 'off',
      '@typescript-eslint/no-unsafe-type-assertion': 'off',
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
