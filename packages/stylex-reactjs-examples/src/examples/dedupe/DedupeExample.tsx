/**
 * Copyright (c) Ladifire, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';

import stylex from '@ladifire-opensource/stylex';

export const DedupeExample = () => {
  const [selected, setSelected] = React.useState(false);

  const toggleSelected = React.useCallback(() => {
    setSelected(!selected);
  }, [selected, setSelected]);

  return (
    <div
      className={stylex.dedupe(
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
      )}
      onClick={toggleSelected}
    >
      Dedupe example (Click me to change style)
    </div>
  );
};
