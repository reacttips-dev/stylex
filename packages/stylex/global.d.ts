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
type NormalCssStyle = {
  [K in keyof NormalCssProperties]: NormalCssValues<K> | CssStyle
}

/**
 * This interface can be augmented by users to add default types for custom css properties when
 * using `stylex/global`.
 * Use module augmentation to append your own type definition in a your_custom_type.d.ts file.
 * https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation
 */
interface CustomCssProperties extends NormalCssStyle {
}

export type CssStyle =
  | NormalCssStyle
  | CustomCssProperties
  | {
      [K: string]: NormalCssStyle | CssStyle
    }

export type Style<Name extends string | number | symbol = string> = Record<
  Name,
  | CssStyle
  | string
>

