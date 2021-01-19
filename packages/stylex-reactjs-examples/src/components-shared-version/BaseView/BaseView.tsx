/**
 * Copyright (c) Ladifire, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from "react";

import stylex from '@ladifire-opensource/stylex';

// not available for shared version
// import {LegacyHidden} from "./LegacyHidden";

type Style =
  | 'root'
  | 'hidden';

const styles = stylex.create<Style>({
  root: {
    boxSizing: "border-box",
    position: "relative",
    zIndex: 0
  },
  hidden: {
    display: "none"
  },
});

interface Props {
  children?: any;
  suppressHydrationWarning?: boolean;
  testid?: string;
  xstyle?: any;
  hidden?: boolean;
}

const BaseView = (props: Props, ref: React.RefObject<any>) => {
  const {
    children,
    suppressHydrationWarning,
    testid,
    xstyle,
    hidden,
    ...otherProps
  } = props;

  const _isHidden = hidden === true;

  // This is not available for shared version, because we use React 17.x version
  // (must use custom build of React for using LegacyHidden)
  // return (
  //   <LegacyHidden
  //     htmlAttributes={Object.assign({}, otherProps, {
  //       className: stylex(styles.root, xstyle, _isHidden && styles.hidden)
  //     })}
  //     mode={_isHidden ? "hidden" : "visible"}
  //     ref={ref}
  //     suppressHydrationWarning={suppressHydrationWarning}
  //   >
  //     {children}
  //   </LegacyHidden>
  // );

  // This is for shared version
  return (
    <div
      className={stylex(styles.root, xstyle)}
      ref={ref}
      {...otherProps}
    >
      {children}
    </div>
  );
};

const _BaseView = React.forwardRef(BaseView);
export {_BaseView as BaseView}
