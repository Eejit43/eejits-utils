// @ts-check

import sharedConfig from '@eejit/eslint-config-typescript';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig(sharedConfig, globalIgnores(['source/*']), {
    languageOptions: { parserOptions: { project: ['./tsconfig.json'] } },
});
