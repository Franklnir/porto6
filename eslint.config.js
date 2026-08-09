import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import astro from 'eslint-plugin-astro';
import globals from 'globals';

const typedTypeScript = tseslint.configs.strictTypeChecked.map((config) => ({
  ...config,
  files: ['**/*.ts', '**/*.tsx'],
}));

export default [
  {
    ignores: [
      '.astro/**',
      'dist/**',
      'node_modules/**',
      'legacy/**',
      'preview-static/**',
      'public/**',
      'src/features/portfolio/fragments/**',
      'src/features/portfolio/client/legacy/**',
    ],
  },
  { ...eslint.configs.recommended, files: ['**/*.{js,mjs,cjs,ts,tsx}'] },
  ...typedTypeScript,
  ...astro.configs['flat/recommended'],
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parserOptions: {
        projectService: true,
      },
    },
    rules: {
      '@typescript-eslint/no-misused-promises': 'off',
      '@typescript-eslint/restrict-template-expressions': ['error', { allowNumber: true }],
    },
  },
  {
    files: ['src/**/*.ts'],
    languageOptions: {
      globals: globals.browser,
    },
  },
  {
    files: ['*.config.{js,mjs,ts}', 'scripts/**/*.{js,mjs,ts}', 'tests/**/*.ts'],
    languageOptions: {
      globals: { ...globals.node, ...globals.browser },
    },
  },
  {
    files: ['**/*.d.ts'],
    rules: {
      '@typescript-eslint/triple-slash-reference': 'off',
    },
  },
];
