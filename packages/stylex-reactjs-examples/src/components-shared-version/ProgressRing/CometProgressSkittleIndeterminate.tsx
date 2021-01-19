/*
 * Copyright 2020-present Ladifire. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import * as React from 'react';

import stylex from '@ladifire-opensource/stylex';

import {CometProgressRingIndeterminate} from './CometProgressRingIndeterminate';

const styles = stylex.create({
  root: {
    borderRadius: '50%',
    position: 'relative',
    justifyContent: 'center',
    display: 'inline-flex',
    boxSizing: 'border-box',
    borderWidth: 0,
    alignItems: 'center',
    backgroundColor: 'var(--secondary-button-background)',
    width: 36,
    height: 36,
  },
});

export function CometProgressSkittleIndeterminate() {
  return React.createElement("div", {
    className: stylex(styles.root),
    children: React.createElement(CometProgressRingIndeterminate, {
      color: "disabled",
      size: 20
    })
  })
}
