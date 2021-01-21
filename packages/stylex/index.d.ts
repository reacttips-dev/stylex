/**
 * Copyright (c) Ladifire, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// TODO: Phần mô tả ở dưới đây mình tạm để tiếng việt cho một số bạn không rành TA tham gia
// TODO: Xem ví dụ thực tế khi sử dụng trong file: ./packages/uses_cases_DEPRECATED/uses_cases_DEPRECATED.tsx
// TODO: Hàm create dưới đây là đoạn mình viết, nhưng nó vẫn chưa thực sự chuẩn với mọi trường hợp, nên cũng cần review lại
// TODO: (Khi viết type definition nhớ để ý pseudo, media query nhé)

import {
  CSSPropertiesWithNestedPseudo,
  CSSObject,
  CSSProperties
} from "./global";
// tslint:disable-next-line:export-just-namespace
export = stylex;
export as namespace stylex;

/**
 * stylex(...)
 * Return css class(es) from stylex object(s)
 *
 * Example:
 *   // Single stylex object
 *   const styleRoot = stylex(styles.root)
 *
 *   // Multiple stylex objects
 *   const multiStyle = stylex(styles.root, styles.container, ....)
 *
 *   // Array of stylex objects
 *   const arrayStyle = stylex([styles.root, styles.container, ....])
 */
declare function stylex<T extends string>(
  ...style: (CSSObject | CSSObject[])[]
): string;

declare namespace stylex {
  /*
   * stylex.create(obj1, obj2, ...)
   * Return a dictionary of stylex objects
   *
   * Example
   * const styles = stylex.create({
   *   root: {
   *     alignItems: 'center',
   *     display: 'flex',
   *   },
   * });
   *
   * // Later on, styles Object can be used as
   * <div className={stylex(styles.root)}>Hello</div>
   * <div className={styles("root")}>Hello</div>
   *
   * TODO: Remove below note
   * note:
   *    In the above example, I've mentioned how we use this function, but it is
   *    still vague. Perhaps this function should be better described.
   */
  function create<T extends string | number>(
    styles: CSSPropertiesWithNestedPseudo<T>
  ): { [key in T]: CSSObject } & ((...styles: T[]) => string);

  /*
   * Dedupe stylex object based on conditions and return a string contains css class names.
   * stylex.dedupe(obj1, obj2)
   *
   * Example
   *     stylex.dedupe({
   *       display: "flex",
   *       flexDirection: "row",
   *       flexWrap: "wrap"
   *     }, d === "narrow" ? {
   *       margin: -2,
   *     } : null, d === "wide" ? {
   *       margin: -3,
   *     } : null)
   */
  function dedupe(...styles: CSSObject[]): string;

  /*
   * Merge multiple stylex object
   *
   * Example:
   *   stylex.compose(
   *     {
   *      //... stylex object 1
   *     },
   *     {
   *       //... stylex object 2
   *     }
   *  )
   */
  function compose(...styles: CSSObject[]): CSSObject;

  /*
   * stylex.keyframes(...)
   * Declare a keyframes animation name
   *
   * Example:
   * let j = stylex.create({
   *   root: {
   *     animationDirection: "alternate",
   *     animationDuration: "1s",
   *     animationIterationCount: "infinite",
   *     animationName: stylex.keyframes({
   *       '0%': {
   *         opacity: 0.25,
   *       },
   *       '100%': {
   *         opacity: 1,
   *       },
   *     }),
   *     animationTimingFunction: "steps(10,end)",
   *     backgroundColor: "var(--wash)",
   *     opacity: 0.25
   *   }
   * });
   */
  function keyframes(rules: CSSObject): string;

  /*
   * stylex.inject(str)
   * Inject css into compiled js
   *
   * Example:
   *    inject(".a55dalm2{background-color:red}")
   */
  function inject(cssString: string): void;
}
