/**
 * Copyright (c) Ladifire, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';

import stylex from '@ladifire-opensource/stylex';

import {ChildComponent} from './ChildComponent';
import "./test.css";

type Style =
  | 'root';

const styles = stylex.create<Style>({
  root: {
    color: "blue",
    padding: 4,
    backgroundColor: 'red',
    // color <= TODO: test realtime edit error, this will crash webpack => need fix
  },
});

// TODO: test custom inject
stylex.inject(".a55dalm2{background-color:red}");

export default () => {
  const isError = false;

  return (
    <div className={stylex(styles.root)}>
      <div>
        Wellcome to Stylex
      </div>
      <div
        className={stylex.dedupe(
          {
            color: "var(--primary-text)",
            animationName: stylex.keyframes({
              '0%': {
                transform: 'rotate(0deg)',
              },
              '45%': {
                transform: 'rotate(-45deg)',
              },
              '100%': {
                transform: 'rotate(-90deg)',
              },
            }),
            animationIterationCount: "infinite",
            animationTimingFunction: "cubic-bezier(.33,0,.67,1)",
            animationDuration: "5s",
          },
          isError ? {
            color: "var(--negative)"
          } : null,
        )}
      >
        Dedupe
      </div>
      <ChildComponent />
      <div>
        {`animation is not working yet for {inject: true} option`}
      </div>
    </div>
  );
}
