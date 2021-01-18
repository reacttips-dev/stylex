/**
 * Copyright (c) Ladifire, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';

import stylex from '@ladifire-opensource/stylex';

const styles = stylex.create({
  root: {
    fontWeight: 700,
    color: "yellow"
  },
  button: {
    borderRadius: 8,
  },
});

export const ChildComponent = () => {
  return (
    <div className={stylex(styles.root)}>
      Child Component
    </div>
  );
};
