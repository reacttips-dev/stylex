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

import {CSSPropertiesWithNestedPseudo, CSSObject, CSSProperties} from './global';

// tslint:disable-next-line:export-just-namespace
export = stylex;
export as namespace stylex;

declare function stylex<T extends string>(...style: (CSSObject | CSSObject[])[]): string;

declare namespace stylex {
  // TODO 1: phần này chưa có definition
  // vd 1: className={stylex(styles.root)} <== truyền 1 object stylex
  // vd 2: className={stylex([styles.root, styles.container, ....])} <== truyền 1 mảng các objects stylex

  // TODO 2: stylex.create(...)
  // vd:
  // const styles = stylex.create({
  //   root: {
  //     alignItems: 'center',
  //     cursor: 'pointer',
  //     display: 'flex',
  //     marginTop: 0,
  //     marginRight: 12,
  //     marginBottom: 0,
  //     marginLeft: 8,
  //   },
  // });
  function create<T extends string | number>(styles: CSSPropertiesWithNestedPseudo<T>):
    { [key in T]: CSSProperties } & (
    (...styles: (
      | keyof T
      | boolean
      | undefined
      | null
      | { [key in keyof T]?: boolean | undefined | null }
      )[]) => string
    )

  // TODO 3: stylex.dedupe(...)
  // Hàm này dedupe (có thể hiểu là sẽ lấy các giá trị sau đè lên các giá trị trước) các dối tượng theo một điều kiện nào đó
  // kết quả trả về là một chuỗi string gồm các className ("aadsdfs etrewtre asdfs454s wer1werterw5 ....")
  // Cấu trúc: vd1
  //     stylex.dedupe({
  //       display: "flex",
  //       flexDirection: "row",
  //       flexWrap: "wrap"
  //     }, d === "narrow" ? {
  //       margin: -2,
  //     } : null, d === "wide" ? {
  //       margin: -3,
  //     } : null)
  //
  // ví dụ khác:
  //
  // <div
  //   className={stylex.dedupe(
  //     {
  //       position: 'absolute',
  //       top: 0,
  //       left: 0,
  //       bottom: 0,
  //       right: 0,
  //       transitionTimingFunction: 'var(--lf-animation-fade-out)',
  //       pointerEvents: 'none',
  //       transitionDuration: 'var(--lf-duration-extra-extra-short-out)',
  //       transitionProperty: 'opacity',
  //       cursor: 'pointer',
  //     },
  //     !isLink ? {
  //       backgroundColor: 'var(--hover-overlay)',
  //     } : null,
  //     !isLink && (isHovered || selected) ? {
  //       opacity: 1,
  //     } : {
  //       opacity: 0,
  //     },
  //     !isLink && isPressed ? {
  //       backgroundColor: 'var(--press-overlay)',
  //     } : null,
  //     !isLink && isPressed && variant === 'primary-deemphasized' ? {
  //       backgroundColor: 'var(--primary-deemphasized-button-pressed-overlay)',
  //     } : null,
  //     rounded ? {
  //       borderRadius: '50%',
  //     } : {
  //       borderRadius: 6,
  //     },
  //   )}
  // />
  function dedupe(...styles: CssStyle[]): string;

  // TODO 4: stylex.compose(...)
  // Hàm này merge các đối tượng stylex lại với nhau (kết quả là một đối tượng stylex duy nhất)
  // Hàm này tương tự như Object.assign
  // <div
  //   className={stylex.compose(
  //     {
  //      //... stylex object 1
  //     },
  //     {
  //       //... stylex object 1
  //     }
  //   )};
  // />
  function compose(...styles: CssStyle[]): CssStyle;

  // TODO 5: stylex.keyframes(...)
  // Hàm này khai báo một keyframes animation name
  // Ví dụ:
  // let j = stylex.create({
  //   root: {
  //     animationDirection: "alternate",
  //     animationDuration: "1s",
  //     animationIterationCount: "infinite",
  //     animationName: stylex.keyframes({
  //       '0%': {
  //         opacity: 0.25,
  //       },
  //       '100%': {
  //         opacity: 1,
  //       },
  //     }),
  //     animationTimingFunction: "steps(10,end)",
  //     backgroundColor: "var(--wash)",
  //     opacity: 0.25
  //   }
  // });
  function keyframes(rules: CssStyle): string;

  // TODO 6: stylex.inject(...)
  // inject một chuỗi css vào compiled js
  // vd: inject(".a55dalm2{background-color:red}")
  function inject(cssString: string): void;
}
