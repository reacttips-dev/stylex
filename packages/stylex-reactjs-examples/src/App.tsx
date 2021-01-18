/**
 * Copyright (c) Ladifire, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';

import stylex from '@ladifire-opensource/stylex';

import "./test.css";

type Style =
  | 'root';

const styles = stylex.create<Style>({
  root: {
    color: "blue",
    padding: 4,
    backgroundColor: 'red'
  },
});

export default () => {
  return (
    <div className={stylex(styles.root)}>
      Wellcome to Stylex
    </div>
  );
}
