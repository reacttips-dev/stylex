/**
 * Copyright (c) Ladifire, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';

import stylex from '@ladifire-opensource/stylex';

const styles = stylex.create({
  code: {
    position: "relative",
    whiteSpace: "pre-line",
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: 6,
    paddingTop: 26,
    paddingLeft: 6,
    paddingRight: 6,
    paddingBottom: 6,

    ":before": {
      content: '"classes"',
      position: "absolute",
      top: 6,
      left: 6,
      fontWeight: 700,
    },
  },
});

export const DedupeExample = () => {
  const [selected, setSelected] = React.useState(true);

  const toggleSelected = React.useCallback(() => {
    setSelected(!selected);
  }, [selected, setSelected]);

  const classes = stylex.dedupe(
    {
      borderRadius: 6,
      border: "1px solid rgba(0, 0, 0, 0.1)",
      backgroundColor: "#fff",
      padding: 8,
      cursor: "pointer",
      userSelect: "none",
    },
    selected ? {
      backgroundColor: "#0089ff",
      color: "#fff"
    } : null,
  );

  return (
    <React.Fragment>
      <div
        className={classes}
        onClick={toggleSelected}
      >
        Dedupe example (Click me to change style)
      </div>
      <div>
        <pre className={stylex(styles.code)}>
          {classes}
        </pre>
      </div>
    </React.Fragment>
  );
};
