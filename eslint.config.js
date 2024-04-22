// @ts-check

import sharedConfig from '@eejit/eslint-config-typescript';
import globals from 'globals';

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
    ...sharedConfig,
    {
        languageOptions: {
            parserOptions: { project: ['./tsconfig.json'] },
            globals: { ...globals.browser },
        },
        rules: {
            '@typescript-eslint/no-base-to-string': 'off',
        },
    },
];
