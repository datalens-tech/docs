import {defineConfig} from 'eslint/config';
import baseConfig from '@gravity-ui/eslint-config';
import serverConfig from '@gravity-ui/eslint-config/server';
import prettierConfig from '@gravity-ui/eslint-config/prettier';

export default defineConfig([
    ...baseConfig,
    ...serverConfig,
    ...prettierConfig,
    {
        ignores: ['build'],
        rules: {
            'no-console': ['error', {allow: ['warn', 'error']}],
            'security/detect-non-literal-regexp': 'off',
        },
    },
]);
