/**
 * Copyright (c) Ladifire, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import * as CSS from "csstype";

export interface CSSProperties extends CSS.Properties<number | string> {
  /**
   * The index signature was removed to enable closed typing for style
   * using CSSType. You're able to use type assertion or module augmentation
   * to add properties or an index signature of your own.
   *
   * For examples and more information, visit:
   * https://github.com/frenic/csstype#what-should-i-do-when-i-get-type-errors
   */
}

// TODO: missing media query
export type CSSPropertiesWithNestedPseudo<T extends string | number> = {
  [key in T]: CSSObject;
};

export type CSSObject = CSSProperties &
  {
    [key in CSS.Pseudos]?: CSSProperties;
  };
