import js from '@eslint/js';
import pluginRouter from '@tanstack/eslint-plugin-router';
import * as tsParser from '@typescript-eslint/parser';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginImportX from 'eslint-plugin-import-x';
import react from 'eslint-plugin-react';
import * as reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';
import tseslint from 'typescript-eslint';
export default tseslint.config(
    {
        ignores: ['dist/', 'routeTree.gen.ts'],
    },
    js.configs.recommended,
    tseslint.configs.recommendedTypeChecked,
    eslintConfigPrettier,
    eslintPluginImportX.flatConfigs.recommended,
    eslintPluginImportX.flatConfigs.typescript,
    ...pluginRouter.configs['flat/recommended'],
    {
        files: ['**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}'],
        languageOptions: {
            parser: tsParser,
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: globals.browser,
            parserOptions: {
                project: ['./tsconfig.json'],
                tsconfigRootDir: import.meta.dirname,
                projectFolderIgnoreList: ['dist/'],
                projectService: {
                    allowDefaultProject: [
                        'commitlint.config.mjs',
                        'eslint.config.mjs',
                    ],
                },
            },
        },
        settings: {
            react: {
                version: '18.3',
            },
        },
        plugins: {
            react,
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
        },
        rules: {
            ...reactHooks.configs.recommended.rules,
            'react-hooks/exhaustive-deps': 'error',
            'react-refresh/only-export-components': [
                'warn',
                { allowConstantExport: true },
            ],
            ...react.configs.recommended.rules,
            ...react.configs['jsx-runtime'].rules,
            'react/jsx-fragments': ['error', 'element'],
            '@typescript-eslint/consistent-type-imports': 'error',
            'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],
            'import-x/order': [
                'error',
                {
                    alphabetize: {
                        order: 'asc',
                    },
                    'newlines-between': 'always',
                    groups: [
                        'builtin', // Default grouping for Node.js modules
                        'external', // External library imports
                        'internal', // Internal imports (alias based within your project)
                        ['parent', 'sibling', 'index'], // Relative imports, placed at the end
                        'type', // Type imports, with special handling
                    ],
                    pathGroups: [
                        {
                            pattern: 'react',
                            group: 'builtin', // To ensure React gets its own dedicated group at the top
                            position: 'before',
                        },
                        {
                            pattern: '~/**',
                            group: 'internal', // Alias imports (require configuration in tsconfig.json)
                            position: 'before',
                        },
                    ],
                    pathGroupsExcludedImportTypes: ['builtin'],
                    warnOnUnassignedImports: true,
                },
            ],
            '@typescript-eslint/no-unused-vars': [
                'error',
                {
                    args: 'all',
                    argsIgnorePattern: '^_',
                    caughtErrors: 'all',
                    caughtErrorsIgnorePattern: '^_',
                    destructuredArrayIgnorePattern: '^_',
                    varsIgnorePattern: '^_',
                    ignoreRestSiblings: true,
                },
            ],
            '@typescript-eslint/no-unsafe-assignment': 'off',
            'no-restricted-imports': [
                'error',
                {
                    name: 'zod',
                    message:
                        "Importing directly from 'zod' is restricted in this project. Please use `~services/zod` instead.",
                },
                {
                    name: 'i18next',
                    message:
                        "Importing directly from 'i18next' is restricted in this project. Please use `~services/i18n` instead.",
                },
            ],
        },
    },
);
