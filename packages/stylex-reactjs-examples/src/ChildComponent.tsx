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

export const ChildComponent = () => {
  return (
    <div className={stylex(styles.root)}>
      Child Component
    </div>
  );
};
