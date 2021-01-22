const OFF = 0;
const WARN = 1;
const ERROR = 2;

module.exports = {
  plugins: ["react", "jsx-a11y", "react-hooks", "jest", "monorepo"],
  extends: ["eslint:recommended"],
  parser: "babel-eslint",
  parserOptions: {
    ecmaFeatures: {
      "legacyDecorators": true
    },
    sourceType: "module"
  },
  overrides: [{
    files: ["packages/**/*.ts", "packages/**/*.tsx"],
    plugins: ["react", "jsx-a11y", "react-hooks", "jest", "@typescript-eslint", "monorepo", "jsdoc"],
    parser: "@typescript-eslint/parser",
    parserOptions: {
      ecmaFeatures: {
        "jsx": true,
        "legacyDecorators": true
      },
      "useJSXTextNode": true,
      "project": "./tsconfig.json",
      sourceType: "module"
    },
    rules: {
      "no-unused-vars": OFF,
      "@typescript-eslint/no-unused-vars": ERROR,
      "@typescript-eslint/member-delimiter-style": [ERROR, {
        multiline: {
          delimiter: "comma",
          requireLast: false
        },
        singleline: {
          delimiter: "comma",
          requireLast: false
        }
      }]
    }
  }, {
    files: ["**/test/**", "**/stories/**", "**/docs/**", "**/chromatic/**"],
    rules: {
      "monorepo/no-internal-import": OFF,
      "jsdoc/require-jsdoc": OFF
    }
  }],
  env: {
    "browser": true,
    "node": true,
    "mocha": true,
    "es6": true,
    "jest": true
  },
  globals: {
    "jest": true,
    "expect": true
  },
  settings: {
    jsdoc: {
      ignorePrivate: true,
      publicFunctionsOnly: true
    }
  },
  rules: {
    "jsdoc/require-description-complete-sentence": [ERROR, {abbreviations: ["e.g", "etc"]}],
    "jsdoc/check-alignment": ERROR,
    "jsdoc/check-indentation": ERROR,
    "jsdoc/check-tag-names": ERROR,
    // enable this rule to see literally everything missing jsdocs, this rule needs some refinement but is good as a sanity check.
    // 'jsdoc/require-jsdoc': [ERROR, {contexts:['TSInterfaceDeclaration TSPropertySignature', 'TSInterfaceDeclaration TSMethodSignature']}],
    "jsdoc/require-description": [ERROR, {exemptedBy: ["deprecated"], checkConstructors: false}],
    "comma-dangle": ERROR,
    "indent": OFF,
    "indent-legacy": [ERROR, ERROR, {SwitchCase: 1}],
    "quotes": [ERROR, "double", "avoid-escape"],
    "linebreak-style": [ERROR, "unix"],
    "semi": [ERROR, "always"],
    "space-before-function-paren": [ERROR, {anonymous: "always", named: "never", asyncArrow: "ignore"}],
    "keyword-spacing": [ERROR, {after: true}],
    "jsx-quotes": [ERROR, "prefer-double"],
    "brace-style": [ERROR, "1tbs", {allowSingleLine: true}],
    "object-curly-spacing": [ERROR, "never"],
    "curly": ERROR,
    "no-fallthrough": OFF,
    "comma-spacing": ERROR,
    "comma-style": [ERROR, "last"],
    "no-irregular-whitespace": [ERROR],
    "eqeqeq": [ERROR, "smart"],
    "no-spaced-func": ERROR,
    "array-bracket-spacing": [ERROR, "never"],
    "key-spacing": [ERROR, {beforeColon: false, afterColon: true}],
    "no-console": OFF,
    "no-unused-vars": [ERROR, {args: "none", vars: "all", varsIgnorePattern: "[rR]eact"}],
    "space-in-parens": [ERROR, "never"],
    "space-unary-ops": [ERROR, {words: true, nonwords: false}],
    "spaced-comment": [ERROR, "always", {exceptions: ["*"], markers: ["/"]}],
    "max-depth": [WARN, 4],
    "radix": [ERROR, "always"],
    "react/jsx-uses-react": WARN,
    "eol-last": ERROR,
    "arrow-body-style": [ERROR, "as-needed"],
    "arrow-spacing": ERROR,
    "space-before-blocks": [ERROR, "always"],
    "space-infix-ops": ERROR,
    "no-new-wrappers": ERROR,
    "no-self-compare": ERROR,
    "no-nested-ternary": ERROR,
    "no-multiple-empty-lines": ERROR,
    "no-unneeded-ternary": ERROR,

    // hooks
    "react-hooks/rules-of-hooks": ERROR,
    "react-hooks/exhaustive-deps": WARN,

    // importing rules
    "monorepo/no-relative-import": ERROR
  }
};
