import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import { defineConfig, globalIgnores } from 'eslint/config';
import unusedImports from 'eslint-plugin-unused-imports';
import pluginPrettier from 'eslint-plugin-prettier'

export default defineConfig([
    globalIgnores(['dist', 'node_modules']),
    {
        files: ['**/*.{ts,tsx}'],
        extends: [
            js.configs.recommended,
            tseslint.configs.recommended,
            reactHooks.configs['recommended-latest'],
            reactRefresh.configs.vite,
        ],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
        },
        plugins: {
            'unused-imports': unusedImports,
            'prettier': pluginPrettier,

        },
        rules: {
            '@typescript-eslint/no-unused-vars': [
                'warn',
                { argsIgnorePattern: '^_' },
            ],
            '@typescript-eslint/explicit-function-return-type': 'off',
            'no-unused-vars': 'off',
            '@typescript-eslint/no-unused-vars': 'warn',
            'unused-imports/no-unused-imports': 'warn',
            'prettier/prettier': ['error', {}, { usePrettierrc: true }],
        },
    },
    {
        files: ['@shadcn/**/*.{ts,tsx}'],
        // Is being merged with the above configuration so it will apply the prettier
        // plugins: {  
        //     'prettier': pluginPrettier,
        // },
        rules: {
            // '@typescript-eslint/no-unused-vars': 'off',
            // 'no-unused-vars': 'off',
            // 'unused-imports/no-unused-imports': 'off',
            'react-refresh/only-export-components': 'off',
            // 'prettier/prettier': ['error', {}, { usePrettierrc: true }],
        },
    },
]);
