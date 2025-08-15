import dotenv from 'dotenv'
import safeql from '@ts-safeql/eslint-plugin/config'
import eslint from '@eslint/js'
import neostandard from 'neostandard'
import prettierConfig from 'eslint-config-prettier'
import tseslint from 'typescript-eslint'
import globals from 'globals'
const tsFiles = { files: ['**/*.ts'] }
const jsFiles = { files: ['**/*.js'] }

const createEslintConfig = (options = {}) => {
  const tsconfigRootDir = options.tsconfigRootDir || process.cwd()
  const tsConfig = [
    eslint.configs.recommended,
    ...neostandard({
      noJsx: true,
      noStyle: true,
      ts: true,
    }),
    ...tseslint.configs.strictTypeChecked,
    {
      rules: {
        '@typescript-eslint/restrict-template-expressions': [
          'error',
          {
            allowNumber: true,
            allowBoolean: true,
          },
        ],
      },
    },
    {
      languageOptions: {
        parserOptions: {
          projectService: true,
          tsconfigRootDir,
        },
      },
    },
  ]
  const jsConfig = [
    eslint.configs.recommended,
    ...neostandard({
      noJsx: true,
      noStyle: true,
      ts: false,
    }),
  ]
  const config = [
    {
      ignores: [
        '**/node_modules',
        'public/',
        'dev/',
        'dist/',
        'sandbox/',
        'o/',
      ],
    },
    { languageOptions: { globals: globals.node } },
    ...tsConfig.map((conf) => ({ ...conf, ...tsFiles })),
    ...jsConfig.map((conf) => ({ ...conf, ...jsFiles })),
    {
      rules: {
        ...prettierConfig.rules,
        camelcase: 'off',
        '@typescript-eslint/no-extraneous-class': 'off',
      },
    },
  ]
  return config
}

dotenv.config()

const safeSqlEsLint = safeql.configs.connections({
  databaseUrl: process.env.PG_URI,
  overrides: {
    columns: {
      'creatives.meta_data': 'unknown',
    },
  },
  targets: [{ wrapper: 'db.query' }, { wrapper: 'db.+(query|execute)' }],
})

export default [
  ...createEslintConfig({
    tsconfigRootDir: import.meta.dirname,
    safeSqlDbUrl: process.env.PG_URI,
  }),
  safeSqlEsLint,
]
