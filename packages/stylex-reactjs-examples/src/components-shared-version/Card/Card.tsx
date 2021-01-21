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

import {BaseView} from '../BaseView';


const i = stylex.create({
  "base-wash": {
    backgroundColor: "var(--wash)"
  },
  "dark-wash": {
    backgroundColor: "var(--shadow-5)"
  },
  error: {
    backgroundColor: "var(--negative)"
  },
  highlight: {
    backgroundColor: "var(--accent)"
  },
  "light-wash": {
    backgroundColor: "var(--web-wash)"
  },
  transparent: {
    backgroundColor: "transparent"
  },
  white: {
    backgroundColor: "var(--surface-background)"
  }
});

const j = stylex.create({
  borderHighlightAnimationOverlay: {
    animationDuration: "1s",
    animationFillMode: "both",
    animationName: stylex.keyframes({
      '0%': {
        border: '2px solid var(--accent)',
      },
      '100%': {
        border: '2px solid transparent',
      },
    }),
    animationTimingFunction: "cubic-bezier(.25,.75,.75,.25)",
    border: "2px solid var(--accent)",
    borderRadius: 10,
    bottom: -2,
    right: -2,
    pointerEvents: "none",
    position: "absolute",
    left: -2,
    top: -2,
    zIndex: 1
  },
  borderInset: {
    bottom: 0,
    boxSizing: "border-box",
    right: 0,
    position: "absolute",
    left: 0,
    top: 0,
    borderRadius: 8,
    boxShadow: "inset 0 0 0 1px rgba(0, 0, 0, 0.1)",
    pointerEvents: "none"
  },
  borderOnWash: {
    borderColor: "#CED0D4",
  },
  borderOnWhite: {
    borderColor: "#CED0D4",
  },
  borderSolid: {
    borderStyle: "solid",
    borderWidth: 1,
  },
  container: {
    display: "flex",
    position: "relative",
    width: "100%"
  },
  expanding: {
    flexGrow: 1
  },
  root: {
    borderRadius: 8,
    overflow: "hidden",
    width: "100%"
  }
});

const k = stylex.create({
  1: {
    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.2)"
  },
  2: {
    boxShadow: "0 2px 12px rgba(0, 0, 0, 0.2)"
  },
});

// modified for shared version
function CometCard(a, c) {
  var d = a.background;
  d = d === void 0 ? "transparent" : d;
  var e = a.border;
  e = e === void 0 ? "none" : e;
  var f = a.borderHighlightAnimation;
  f = f === void 0 ? !1 : f;
  var l = a.children,
    m = a.dropShadow;
  m = m === void 0 ? 0 : m;
  var n = a.expanding;
  n = n === void 0 ? !1 : n;
  a = a.xstyle;
  m = k[m];

  return (
    <div
      className={stylex(j.container, n && j.expanding)}
    >
      <BaseView
        ref={c}
        style={{
          borderRadius: "max(0px, min(8px, calc((100vw - 4px - 100%) * 9999))) / 8px"
        }}
        xstyle={[i[d], e === "solid" && d !== "white" && j.borderOnWash, e === "solid" && d === "white" && j.borderOnWhite, e === "solid" && j.borderSolid, j.root, m, a]}
      >
        {l}
      </BaseView>
      {
        e === "inset" && React.createElement("div", {
          className: stylex(j.borderInset)
        })
      }
      {
        f && React.createElement("div", {
          className: stylex(j.borderHighlightAnimationOverlay)
        })
      }
    </div>
  );
}

const _CometCard = React.forwardRef(CometCard);
export {_CometCard as CometCard}
