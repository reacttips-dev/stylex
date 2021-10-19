<h1 align="center">
  <img src="https://stylex.vercel.app/logo-black.png" height="96" />
  <br />
  <small>Write CSS in JS with Atomic first, like Facebook do!</small>
</h1>

## [About Stylex](#about-stylex)

**NOTE: The idea of stylex originated from Facebook.**

The underlying idea was to not discard idiomatic CSS but to make it
easier to maintain and keep the good parts of CSS that developers are
used to enjoying. The number one priority was readability and
maintainability, which are issues compounded at scale.

See Facebook React conf video for more about Stylex: [Click here](https://youtu.be/9JZHodNR184?t=229)

## [Installation](#installation)

Yarn users:

```bash
yarn add @ladifire-opensource/stylex
```

Npm users:

```bash
npm install @ladifire-opensource/stylex
```

The second step is depending on what bundler you use, for webpack you
need to install a webpack plugin

```bash
yarn add @ladifire-opensource/stylex-webpack-plugin
```

If you're using `Nextjs`:

```bash
yarn add @ladifire-opensource/stylex-nextjs-plugin
```

### [Setup with Webpack](#setup-with-webpack)

First, we need import `stylex-webpack-plugin`:

```js
const StylexPlugin = require("@ladifire-opensource/stylex-webpack-plugin");
```

Then, in `plugins` section, add this:

```js
 plugins: [
    //...other plugins

    new StylexPlugin(),
```

Last thing, add this in `rules` section:

```js
rules: [
      {
        test: /\.(ts|tsx)$/,
        use: [
          // ...keeps your other loaders here

          // and stylex-loader goes here
          {
            loader: StylexPlugin.loader,
            options: {
              inject: false,
            },
          },
        ],
      },
```

### [Setup with Babel](#setup-with-babel)

This is example of Babel config with stylex:

```js
/**
 * Copyright (c) Ladifire, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/*eslint-env node*/
module.exports = {
  presets: ["@babel/react", "@babel/env", "@babel/preset-typescript"],
  plugins: [
    "@babel/plugin-syntax-dynamic-import",
    "@babel/plugin-proposal-object-rest-spread",
    "@babel/plugin-transform-runtime",
    ["@babel/plugin-transform-modules-commonjs"],
    [
      "@babel/plugin-transform-spread",
      {
        loose: true,
      },
    ],
    ["@babel/plugin-proposal-decorators", { legacy: true }],
    ["@babel/plugin-proposal-class-properties", { loose: true }],
    [
      "@ladifire-opensource/babel-plugin-transform-stylex",
      {
        inject: true, // will inject compiled css to stylesheet in head
      },
    ],
  ],
};
```

### [Setup with Nextjs](#setup-with-nextjs)

First thing, you need add `next-transpile-modules` to your project.

Just run:

```bash
yarn add -D next-transpile-modules
```

Then in `next.config.js`, add these lines:

```js
const withTM = require("next-transpile-modules")(
  ["@ladifire-opensource/stylex"],
  { unstable_webpack5: true }
);
const withStylex = require("@ladifire-opensource/stylex-nextjs-plugin");

module.exports = withStylex({
  inject: true, // for nextjs, we must inject style to head
})(withTM());
```

### [Setup with Vue](#setup-with-vue)

Add these lines in `vue.config.js`:

```js
const StylexPlugin = require("@ladifire-opensource/stylex-webpack-plugin");

module.exports = {
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.(tsx|ts|js|mjs|jsx)$/,
          use: StylexPlugin.loader,
        },
      ],
    },
    plugins: [new StylexPlugin()],
  },
};
```

Then you can write like this in your `.vue`:

```js
<script>

import stylex from '@ladifire-opensource/stylex'

const styles = stylex.create({
    button: {
        borderRadius: 8,
        padding: 16,
        backgroundColor: "#1DA1F2",
        color: "#fff"
    },
});

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  computed: {
    buttonClasses() {
      return stylex(styles.button);
    }
  }
}
</script>
```

### [Setup with Create React App](#setup-with-create-react-app)

Follow `craco.js` installation [guide]('https://github.com/gsoft-inc/craco/blob/master/packages/craco/README.md#installation').

Finally in `craco.config.js` add:

```js
module.exports = {
  // ...
  babel: {
    /// ...
    plugins: [
      /// ...
      [
        "@ladifire-opensource/babel-plugin-transform-stylex",
        {
          inject: true,
        },
      ],
    ],
  },
};
```

### [Setup with Angular](#setup-with-angular)

_Under construction!!!_

## [Examples](#examples)

- React minimal example: [View code](https://github.com/ladifire-opensource/react-stylex-minimal)
- Nextjs examples: [View code](https://github.com/ladifire-opensource/stylex.vercel.app), [other nextjs example](https://github.com/ladifire-opensource/stylex/tree/main/packages/stylex-vuejs-examples)
- Vue example: [View code](https://github.com/ladifire-opensource/stylex/tree/main/packages/stylex-vuejs-examples)

## [How to use stylex?](#how-to-use-stylex)

There're some methods you can you with stylex:

### Create new stylex object `(stylex.create)`

This method will create a new stylex object:

```js
import stylex from "@ladifire-opensource/stylex";

const styles = stylex.create({
  root: {
    fontWeight: 700,
    color: "blue",
  },
  button: {
    borderRadius: 8,
  },
});
```

Then we can use as:

```js
<div className={stylex(styles.root)}>Component</div>
```

The arguments of `stylex(...args)` can be separated by comma:

```js
<div className={stylex(styles.root, styles.button)}>Component</div>
```

or as an array:

```js
<div className={stylex([styles.root, styles.button])}>Component</div>
```

### Dedupe stylex objects `(stylex.dedupe)`

This method will dedupe (override) duplicate style properties:

```js
<div
  className={stylex.dedupe(
    {
      color: "var(--primary-text)",
    },
    isError
      ? {
          color: "var(--negative)",
        }
      : null
  )}
>
  Dedupe
</div>
```

### Create a keyframes animation name `(stylex.keyframes)`

```js
let j = stylex.create({
  dark: {
    backgroundColor: "var(--placeholder-icon)",
  },
  paused: {
    animationPlayState: "paused",
  },
  root: {
    animationDirection: "alternate",
    animationDuration: "1s",
    animationIterationCount: "infinite",
    animationName: stylex.keyframes({
      "0%": {
        opacity: 0.25,
      },
      "100%": {
        opacity: 1,
      },
    }),
    animationTimingFunction: "steps(10,end)",
    backgroundColor: "var(--wash)",
    opacity: 0.25,
  },
});
```

### Compose (merge) stylex objects `(stylex.compose)`

```js
const s = stylex.compose(
  {
    color: "red",
    backgroundColor: "blue",
  },
  {
    backgroundColor: "white",
  }
);
```

The above code will transformed to:

```js
const s = {
  color: "a512sdfe5", // red
  backgroundColor: "wer115asse", // white
};
```

#### Quick uses

_Describe some common static methods for quick uses, eg: stylex.absolute, ..._

### [Plugin options](#plugin-options)

#### Inject css to compiled js

By default, stylex will inject css to stylesheet object in `<head>` of html document.

There is no extra reference links of stylesheets to inject.

The webpack setup should be:

```js
...
rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: STANDARD_EXCLUDE,
        use: [
          babelLoaderConfig,
          {
            loader: StylexPlugin.loader,
            options: {
              inject: true,
            },
          },
        ],
      },

...
```

In the compiled js, there're something like this will be injected:

```js
inject('.avcdd15645{color: "red"}');
```

Then the stylex runtime code will excute the `inject` function and add `'.avcdd15645{color: "red"}'`
to the stylesheet in the `<head>` section.

#### Separate css into .css files

In case you want to use stylex with `mini-css-extract-plugin` to seprate css
into reference links, you can setup in your webpack config as bellow:

```js
...
const ExtractTextPlugin = require('mini-css-extract-plugin');
const StylexPlugin = require("@ladifire-opensource/stylex-webpack-plugin");

...
rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: STANDARD_EXCLUDE,
        use: [
          babelLoaderConfig,
          {
            loader: StylexPlugin.loader,
            options: {
              inject: false, // set false to ignore inject css to js
            },
          },
        ],
      },

...

plugins: [
   new StylexPlugin(),
   new ExtractTextPlugin({
      filename: '[name].[contentHash:11].css',
      chunkFilename: '[name].[contentHash:11].css',
    }),

...
```

### Babel

This is example of stylex's babel config:

```js
module.exports = {
  presets: ["@babel/react", "@babel/env", "@babel/preset-typescript"],
  plugins: [
    "@babel/plugin-syntax-dynamic-import",
    "@babel/plugin-proposal-object-rest-spread",
    "@babel/plugin-transform-runtime",
    ["@babel/plugin-transform-modules-commonjs"],
    [
      "@babel/plugin-transform-spread",
      {
        loose: true,
      },
    ],
    ["@babel/plugin-proposal-decorators", { legacy: true }],
    ["@babel/plugin-proposal-class-properties", { loose: true }],
    [
      "@ladifire-opensource/babel-plugin-transform-stylex",
      {
        inject: true, // will inject compiled css to stylesheet in head
      },
    ],
  ],
};
```

### SSR support

See `stylex-nextjs-examples` for setup stylex with nextjs.

### Others

#### Pass stylex through props (Reactjs)

If you using Reactjs, consider to use **xstyle** props to pass some stylex class from
parent to child. Let's see bellow example:

```js
import * as React from "react";
import stylex from "@ladifire-opensource/stylex";
import ChildComponent from "./path/to/child";

type Style = "root";

const styles = stylex.create({
  root: {
    color: "red",
  },
});

const Parent = () => {
  return (
    <ChildComponent
      xstyle={styles.root}
      //...otherProps
    />
  );
};
```

The `xstyle` prop is a good method because it helps to combine style props under one namespace
and doesn't populate the global orios environment and it looks similar to the goal of
sx prop.

Then in your child component you can use `xstyle` props as:

```js
import * as React from "react";

import stylex from "@ladifire-opensource/stylex";

const styles = stylex.create({
  root: {
    backgroundColor: "red",
  },
});

const ChildComponent = (props) => {
  const { xstyle } = props;

  return <div className={stylex(styles.root, xstyle)}>Child</div>;
};
```

#### Theming with stylex

Stylex support multiple theming. A "theme" is declared by given it an object of
variables, like this:

```js
const defaultThemeVariables = {
  "primary-icon": "rgb(15, 20, 25)",
  "primary-text": "rgb(15, 20, 25)",
  "primary-text-on-media": "#FFFFFF",
};
```

There're two theme objects in stylex: **rootTheme** and **customTheme**.
To set **rootTheme**:

```js
import CometStyleXSheet from "@ladifire-opensource/stylex-theme";

...

CometStyleXSheet.rootStyleSheet.setRootTheme(defaultThemeVariables);
```

and **customTheme**:

```js
CometStyleXSheet.rootStyleSheet.setCustomTheme(customThemeVariables);
```

To change theme:

```js
CometStyleXSheet.rootStyleSheet.toggleCustomTheme(!isCustomThemeActive);
```

This is example for React users:

```js
import CometStyleXSheet from "@ladifire-opensource/stylex-theme";

import { themeDataBase } from "./themeDataBase";
import { themeDataCustom } from "./themeDataCustom";

export const ThemingExamples = () => {
  React.useEffect(() => {
    CometStyleXSheet.rootStyleSheet.setRootTheme(themeDataBase);
    CometStyleXSheet.rootStyleSheet.setCustomTheme(themeDataCustom);
  }, []);

  const [isDark, setIsDark] = React.useState < boolean > (() => false);
  const toggleIsDark = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const target = event.target;
      setIsDark(target.checked);
      CometStyleXSheet.rootStyleSheet.toggleCustomTheme(!isDark);
    },
    [isDark, setIsDark]
  );

  // ...
};
```

## Thanks to

- We'd like to send a big thanks to: johanholmerin for style9 (an other stylex cover)
- We'd like to thanks Facebook very much (most of javascript code in stylex is re-write from built code of Facebook)

## Contributing

Contributions are always welcome, no matter how large or small!

#### Setup

Fork the `stylex` repository to your GitHub Account.

Then, run: `yarn install`

To see reactjs demo, cd to `stylex-reactjs-examples` and following steps in
README.md to run Reactjs demo

## Join Stylex Community (Facebook group)

Visit [this link](https://www.facebook.com/groups/713597106002279) to join Stylex community.

### License

Stylex is [MIT licensed](./LICENSE).
