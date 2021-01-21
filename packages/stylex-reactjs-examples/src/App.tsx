/**
 * Copyright (c) Ladifire, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';

import stylex from '@ladifire-opensource/stylex';

import {ChildComponent} from './ChildComponent';
import {CometCard} from './components-shared-version/Card';

import {DedupeExample} from './examples/dedupe';
import {ResponsiveExample} from './examples/responsive';
import {KeyframesExample} from './examples/keyframes';

import "./test.css";

type Style =
  | 'root'
  | 'card';

const styles = stylex.create<Style>({
  root: {
    display: "flex",
    flexDirection: "column",
    maxWidth: 850,
    marginTop: 0,
    marginBottom: 0,
    marginLeft: "auto",
    marginRight: "auto",
  },
  card: {
    padding: 16,
  },
});

// TODO: test custom inject
stylex.inject(".a55dalm2{background-color:red}");

export default () => {
  const isError = false;

  return (
    <div className={stylex(styles.root)}>
      <CometCard
        dropShadow={1}
        background="white"
        xstyle={styles.card}
      >
        <h1>
          Stylex Reactjs examples
        </h1>
        <hr/>
        <div>
          <ChildComponent />
        </div>
        <div>
          <h3>Dedupe examples</h3>
          <DedupeExample/>
        </div>
        <div>
          <h3>Keyframes examples</h3>
          <KeyframesExample/>
        </div>
        <div>
          <h3>Responsive examples</h3>
          <ResponsiveExample/>
        </div>
      </CometCard>
    </div>
  );
}
