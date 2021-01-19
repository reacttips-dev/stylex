/**
 * Copyright (c) Ladifire, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import * as css from 'csstype'

export type CssValue =
  | string
  | number
  | null
  | false

type NormalCssProperties = css.Properties<string | number>
type NormalCssValues<K> = K extends keyof NormalCssProperties
  ? NormalCssProperties[K] | CssValue
  : CssValue

  export type CssStyle =
  | {
      [K in keyof NormalCssProperties]:
        | NormalCssValues<K>
        | CssStyle
    }
  | {
      [K: string]:
        | CssValue
        | CssStyle
    }

export type Style<Name extends string | number | symbol = string> = Record<
  Name,
  | CssStyle
  | string
>

