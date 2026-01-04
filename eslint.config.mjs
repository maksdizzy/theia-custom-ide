import { baseConfig, combine, reactConfig, typescriptConfig } from '@flexbe/eslint-config';

export default combine(
    baseConfig(),
    reactConfig(),
    typescriptConfig({
        tsconfigPath: './tsconfig.json',
    }),
);
