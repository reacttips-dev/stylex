/**
 * Copyright (c) Ladifire, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';

import stylex from '@ladifire-opensource/stylex';

import {CometProgressRingIndeterminate} from '../../components-shared-version/ProgressRing';

const styles = stylex.create({
  root: {
    display: 'flex',
    alignItems: "center",
  },
});

export const KeyframesExample = () => {
  const TYPES = ["dark", "light", "blue", "disabled"];
  const [type, setType] = React.useState(TYPES[0]);

  const handleChange = (event) => {
    setType(event.target.value);
  };

  return (
    <div className={stylex(styles.root)}>
      <select value={type} onChange={handleChange}>
        {TYPES.map((t) => (
          <option key={t} value={t}>{t}</option>
        ))}
      </select>
      <div
        className={stylex.dedupe(
          {
            marginLeft: 8,
            padding: 16
          },
          type === "light" ? {
            backgroundColor: "#222"
          } : null,
        )}
      >
        <CometProgressRingIndeterminate size={32} color={type}/>
      </div>
    </div>
  );
};
