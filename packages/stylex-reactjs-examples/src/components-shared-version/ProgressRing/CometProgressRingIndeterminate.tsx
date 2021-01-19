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

import {ariaGlimmerProps} from './ariaGlimmerProps';
import {CometProgressRingUtils} from './CometProgressRingUtils';

const i = stylex.create({
  animationFillModeAndTimingFn: {
    animationFillMode: "both",
    animationTimingFunction: "cubic-bezier(0,0,1,1)",
  },
  foregroundCircle: {
    animationDuration: "2s",
    animationFillMode: "both",
    animationIterationCount: "infinite",
    animationTimingFunction: "cubic-bezier(.33,0,.67,1)",
    transformOrigin: "50% 50%"
  },
  foregroundCircle12: {
    animationName: stylex.keyframes({
      '0%': {
        strokeDashoffset: 6.3,
        transform: 'rotate(-90deg)',
      },
      '25%': {
        strokeDashoffset: 28.3,
        transform: 'rotate(162deg)',
      },
      '50%': {
        strokeDashoffset: 14.1,
        transform: 'rotate(72deg)',
      },
      '75%': {
        strokeDashoffset: 28.3,
        transform: 'rotate(162deg)',
      },
      '100%': {
        strokeDashoffset: 6.3,
        transform: 'rotate(-90deg)',
      },
    })
  },
  foregroundCircle12Optimized: {
    strokeDashoffset: 6.3
  },
  foregroundCircle16: {
    animationName: stylex.keyframes({
      '0%': {
        strokeDashoffset: 8.8,
        transform: 'rotate(-90deg)',
      },
      '25%': {
        strokeDashoffset: 39.6,
        transform: 'rotate(162deg)',
      },
      '50%': {
        strokeDashoffset: 19.8,
        transform: 'rotate(72deg)',
      },
      '75%': {
        strokeDashoffset: 39.6,
        transform: 'rotate(162deg)',
      },
      '100%': {
        strokeDashoffset: 8.8,
        transform: 'rotate(-90deg)',
      },
    })
  },
  foregroundCircle16Optimized: {
    strokeDashoffset: 8.8
  },
  foregroundCircle20: {
    animationName: stylex.keyframes({
      '0%': {
        strokeDashoffset: 11.3,
        transform: 'rotate(-90deg)',
      },
      '25%': {
        strokeDashoffset: 50.9,
        transform: 'rotate(162deg)',
      },
      '50%': {
        strokeDashoffset: 25.4,
        transform: 'rotate(72deg)',
      },
      '75%': {
        strokeDashoffset: 50.9,
        transform: 'rotate(162deg)',
      },
      '100%': {
        strokeDashoffset: 11.3,
        transform: 'rotate(-90deg)',
      },
    })
  },
  foregroundCircle20Optimized: {
    strokeDashoffset: 11.3
  },
  foregroundCircle24: {
    animationName: stylex.keyframes({
      '0%': {
        strokeDashoffset: 13.8,
        transform: 'rotate(-90deg)',
      },
      '25%': {
        strokeDashoffset: 62.2,
        transform: 'rotate(162deg)',
      },
      '50%': {
        strokeDashoffset: 31.1,
        transform: 'rotate(72deg)',
      },
      '75%': {
        strokeDashoffset: 62.2,
        transform: 'rotate(162deg)',
      },
      '100%': {
        strokeDashoffset: 13.8,
        transform: 'rotate(-90deg)',
      },
    })
  },
  foregroundCircle24Optimized: {
    strokeDashoffset: 13.8
  },
  foregroundCircle32: {
    animationName: stylex.keyframes({
      '0%': {
        strokeDashoffset: 18.8,
        transform: 'rotate(-90deg)',
      },
      '25%': {
        strokeDashoffset: 84.8,
        transform: 'rotate(162deg)',
      },
      '50%': {
        strokeDashoffset: 42.4,
        transform: 'rotate(72deg)',
      },
      '75%': {
        strokeDashoffset: 84.8,
        transform: 'rotate(162deg)',
      },
      '100%': {
        strokeDashoffset: 18.8,
        transform: 'rotate(-90deg)',
      },
    })
  },
  foregroundCircle32Optimized: {
    strokeDashoffset: 18.8
  },
  foregroundCircle48: {
    animationName: stylex.keyframes({
      '0%': {
        strokeDashoffset: 28.9,
        transform: 'rotate(-90deg)',
      },
      '25%': {
        strokeDashoffset: 130,
        transform: 'rotate(162deg)',
      },
      '50%': {
        strokeDashoffset: 65,
        transform: 'rotate(72deg)',
      },
      '75%': {
        strokeDashoffset: 130,
        transform: 'rotate(162deg)',
      },
      '100%': {
        strokeDashoffset: 28.9,
        transform: 'rotate(-90deg)',
      },
    })
  },
  foregroundCircle48Optimized: {
    strokeDashoffset: 28.9
  },
  foregroundCircle60: {
    animationName: stylex.keyframes({
      '0%': {
        strokeDashoffset: 36.4,
        transform: 'rotate(-90deg)',
      },
      '25%': {
        strokeDashoffset: 164,
        transform: 'rotate(162deg)',
      },
      '50%': {
        strokeDashoffset: 82,
        transform: 'rotate(72deg)',
      },
      '75%': {
        strokeDashoffset: 164,
        transform: 'rotate(162deg)',
      },
      '100%': {
        strokeDashoffset: 36.4,
        transform: 'rotate(-90deg)',
      },
    })
  },
  foregroundCircle60Optimized: {
    strokeDashoffset: 36.4,
  },
  foregroundCircle72: {
    animationName: stylex.keyframes({
      '0%': {
        strokeDashoffset: 43.98,
        transform: 'rotate(-90deg)',
      },
      '25%': {
        strokeDashoffset: 197.9,
        transform: 'rotate(162deg)',
      },
      '50%': {
        strokeDashoffset: 98.9,
        transform: 'rotate(72deg)',
      },
      '75%': {
        strokeDashoffset: 197.9,
        transform: 'rotate(162deg)',
      },
      '100%': {
        strokeDashoffset: 43.98,
        transform: 'rotate(-90deg)',
      },
    })
  },
  foregroundCircle72Optimized: {
    strokeDashoffset: 43.98
  },
  hideOutline: {
    outline: "none"
  },
  rotationCircle: {
    animationDuration: "2s",
    animationIterationCount: "infinite",
    animationName: stylex.keyframes({
      '0%': {
        transform: "rotate(-90deg)"
      },
      '25%': {
        transform: "rotate(90deg)"
      },
      '50%': {
        transform: "rotate(270deg)"
      },
      '75%': {
        transform: "rotate(450deg)"
      },
      '100%': {
        transform: "rotate(990deg)"
      },
    }),
    animationTimingFunction: "steps(10,end)",
    transformOrigin: "50% 50%"
  }
});

const j = 2;

export function CometProgressRingIndeterminate(a) {
  let c = a.color,
    d = a.size;
  a = CometProgressRingUtils.getRingColor(c);
  let e = a.foregroundColor,
    f = (d - j) * Math.PI;

  return (
    <svg
      {...Object.assign({
        className: stylex(i.rotationCircle, i.animationFillModeAndTimingFn, !c && i.hideOutline),
        height: d,
        viewBox: "0 0 " + d + " " + d,
        width: d
      }, ariaGlimmerProps, {
        children: React.createElement("circle", {
          className: stylex([i.foregroundCircle, d === 12 && i.foregroundCircle12, d === 16 && i.foregroundCircle16, d === 20 && i.foregroundCircle20, d === 24 && i.foregroundCircle24, d === 32 && i.foregroundCircle32, d === 48 && i.foregroundCircle48, d === 60 && i.foregroundCircle60, d === 72 && i.foregroundCircle72]),
          cx: d / 2,
          cy: d / 2,
          fill: "none",
          r: (d - j) / 2,
          stroke: e,
          strokeDasharray: f,
          strokeWidth: j
        })
      })}
    />
  );
}
