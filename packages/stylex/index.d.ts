/**
 * Copyright (c) Ladifire, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as CSS from 'csstype';

import {CSSObject, CSSPropertiesWithNestedPseudo} from './global';

// tslint:disable-next-line:export-just-namespace
export = stylex;
export as namespace stylex;

declare namespace stylex {
  function create<T extends string | number>(styles: CSSPropertiesWithNestedPseudo<T>) :
    { [key in T]: CSS.Properties } & (
    (...styles: (
      | keyof T
      | boolean
      | undefined
      | null
      | { [key in keyof T]?: boolean | undefined | null }
      )[]) => string
    );

  // dedupe

  // compose

  // keyframes

  // inject

  // delete
}
