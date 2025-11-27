import { defineConfig } from 'eslint/config';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import prettier from 'eslint-plugin-prettier/recommended';
import typescriptEslint from 'typescript-eslint';
import jsdoc from 'eslint-plugin-jsdoc';
import importPlugin from 'eslint-plugin-import';
import js from '@eslint/js';

const memberTypes = [
  'signature',
  'call-signature',
  'public-static-field',
  'protected-static-field',
  'private-static-field',
  '#private-static-field',
  'public-decorated-field',
  'protected-decorated-field',
  'private-decorated-field',
  'public-instance-field',
  'protected-instance-field',
  'private-instance-field',
  '#private-instance-field',
  'public-abstract-field',
  'protected-abstract-field',
  'public-field',
  'protected-field',
  'private-field',
  '#private-field',
  'static-field',
  'instance-field',
  'abstract-field',
  'decorated-field',
  'field',
  'static-initialization',
  'public-constructor',
  'protected-constructor',
  'private-constructor',
  'constructor',
  'public-static-accessor',
  'protected-static-accessor',
  'private-static-accessor',
  '#private-static-accessor',
  'public-decorated-accessor',
  'protected-decorated-accessor',
  'private-decorated-accessor',
  'public-instance-accessor',
  'protected-instance-accessor',
  'private-instance-accessor',
  '#private-instance-accessor',
  'public-abstract-accessor',
  'protected-abstract-accessor',
  'public-accessor',
  'protected-accessor',
  'private-accessor',
  '#private-accessor',
  'static-accessor',
  'instance-accessor',
  'abstract-accessor',
  'decorated-accessor',
  'accessor',
  'public-static-get',
  'protected-static-get',
  'private-static-get',
  '#private-static-get',
  'public-decorated-get',
  'protected-decorated-get',
  'private-decorated-get',
  'public-instance-get',
  'protected-instance-get',
  'private-instance-get',
  '#private-instance-get',
  'public-abstract-get',
  'protected-abstract-get',
  'public-get',
  'protected-get',
  'private-get',
  '#private-get',
  'static-get',
  'instance-get',
  'abstract-get',
  'decorated-get',
  'get',
  'public-static-set',
  'protected-static-set',
  'private-static-set',
  '#private-static-set',
  'public-decorated-set',
  'protected-decorated-set',
  'private-decorated-set',
  'public-instance-set',
  'protected-instance-set',
  'private-instance-set',
  '#private-instance-set',
  'public-abstract-set',
  'protected-abstract-set',
  'public-set',
  'protected-set',
  'private-set',
  '#private-set',
  'static-set',
  'instance-set',
  'abstract-set',
  'decorated-set',
  'set',
  'public-static-method',
  'protected-static-method',
  'private-static-method',
  '#private-static-method',
  'public-decorated-method',
  'protected-decorated-method',
  'private-decorated-method',
  'public-instance-method',
  'protected-instance-method',
  'private-instance-method',
  '#private-instance-method',
  'public-abstract-method',
  'protected-abstract-method',
  'public-method',
  'protected-method',
  'private-method',
  '#private-method',
  'static-method',
  'instance-method',
  'abstract-method',
  'decorated-method',
  'method',
];

const jsdocContexts = [
  'ClassDeclaration',
  'TSEnumDeclaration',
  'TSEnumMember',
  'TSInterfaceDeclaration',
  'TSMethodSignature',
  'TSPropertySignature',
  'PropertyDefinition',
  'Constructor',
];

export default defineConfig([
  js.configs.recommended,
  typescriptEslint.configs.recommended,
  prettier,
  jsdoc.configs['flat/recommended-typescript'],
  importPlugin.flatConfigs.recommended,
  importPlugin.flatConfigs.typescript,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
      },

      parser: tsParser,
      ecmaVersion: 13,
      sourceType: 'module',
      parserOptions: {},
    },

    rules: {
      'no-shadow': 'off',
      '@typescript-eslint/no-shadow': 'error',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'error',

      'jsdoc/require-jsdoc': [
        'warn',
        {
          publicOnly: true,

          require: {
            ClassDeclaration: true,
            MethodDefinition: true,
            FunctionDeclaration: true,
          },

          contexts: jsdocContexts,
        },
      ],

      'jsdoc/require-description': [
        'warn',
        {
          contexts: ['any'],
        },
      ],

      'jsdoc/require-description-complete-sentence': 'warn',
      'jsdoc/informative-docs': 'warn',
      'jsdoc/require-hyphen-before-param-description': 'warn',

      '@typescript-eslint/member-ordering': [
        'error',
        {
          default: {
            memberTypes,
            order: 'alphabetically',
          },
        },
      ],

      'import/extensions': [
        'error',
        'ignorePackages',
        {
          ts: 'never',
        },
      ],

      'import/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: ['!**/*.test.js'],
        },
      ],
    },

    settings: {
      'import/resolver': {
        typescript: {},
      },
    },
  },
  {
    files: ['src/JPLDESeries/**'],

    rules: {
      'jsdoc/require-jsdoc': 'off',
    },
  },
]);
