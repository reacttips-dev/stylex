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
    width: 150,
    height: 150,
    backgroundColor: "red",
    color: "#fff",
    padding: 8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,

    // pseudo DONE
    ":hover": {
      color: "yellow",
    },

    // missing
    "@media (max-width: 899px)": {
      width: "100%",
    },
  },
  tip: {
    color: "var(--secondary-text)"
  },
});

export const ResponsiveExample = () => {
  return (
    <div>
      <strong className={stylex(styles.tip)}>Inspect, resize browser to see me responsive!</strong>
      <div className={stylex(styles.root)}>
        ReasponsiveExample
      </div>
    </div>
  );
};
