import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import astro from 'eslint-plugin-astro';

export default [
  { ignores: ['dist/**', 'node_modules/**', 'legacy/**', 'src/features/portfolio/fragments/**', 'src/features/portfolio/client/legacy/**'] },
  eslint.configs.recommended,
  ...tseslint.configs.strictTypeChecked,
  ...astro.configs['flat/recommended'],
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        extraFileExtensions: ['.astro'],
      },
    },
    rules: {
      '@typescript-eslint/no-misused-promises': 'off',
    },
  },
];
