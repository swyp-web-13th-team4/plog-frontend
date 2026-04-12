import baseConfig from '@plog/config/eslint/base';
import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import boundaries from 'eslint-plugin-boundaries';

const FSD_LAYERS = [
  { type: 'app', pattern: 'src/app/**', mode: 'full' },
  { type: 'pages', pattern: 'src/pages/*', mode: 'folder' },
  { type: 'widgets', pattern: 'src/widgets/*', mode: 'folder' },
  { type: 'features', pattern: 'src/features/*', mode: 'folder' },
  { type: 'entities', pattern: 'src/entities/*', mode: 'folder' },
  { type: 'shared', pattern: 'src/shared/**', mode: 'full' },
];

const config = [
  ...baseConfig,
  ...defineConfig([
    globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts']),
    ...nextVitals,
    ...nextTs,
    {
      files: ['src/**/*.{ts,tsx}'],
      plugins: { boundaries },
      settings: {
        'boundaries/elements': FSD_LAYERS,
        'import/resolver': {
          typescript: {
            alwaysTryTypes: true,
          },
        },
      },
      rules: {
        'boundaries/element-types': [
          'error',
          {
            default: 'disallow',
            message:
              '"${file.type}" 레이어에서 "${dependency.type}" 레이어를 import할 수 없습니다. (FSD 의존성 규칙 위반)',
            rules: FSD_LAYERS.map(({ type }, index) => ({
              from: type,
              allow: FSD_LAYERS.slice(
                type === 'shared' || type === 'app' ? index : index + 1,
              ).map((l) => l.type),
            })),
          },
        ],
        'simple-import-sort/imports': [
          'error',
          {
            groups: [
              ['^\\u0000'],
              ['^react'],
              ['^@?\\w'],
              ...FSD_LAYERS.map(({ type }) => [`^@/${type}`]),
              ['^\\.'],
            ],
          },
        ],
      },
    },
  ]),
];

export default config;
