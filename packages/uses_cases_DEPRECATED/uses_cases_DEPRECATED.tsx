/**
 * Copyright (c) Ladifire, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// These are some stylex real examples of uses in our projects

const k = stylex.create({
  base: {
    backgroundColor: "var(--divider)",
    display: "none",
    height: "100%",
    opacity: 0,
    position: "absolute",
    right: 0,
    top: 0,
    transitionDuration: ".5s",
    transitionProperty: "opacity",
    transitionTimingFunction: "ease",
    width: 16,
    ":hover": {
      opacity: 0.3
    }
  }
});

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

let i = stylex.create({
  backgroundContainerDialog: {
    "@media (max-width: 899px)": {
      height: "calc(50vh)"
    }
  },
  backgroundContainerDialogWithFooter: {
    height: "calc(100vh - 52px)",
    "@media (max-width: 899px)": {
      height: "calc(50vh - 52px)"
    }
  },
  backgroundContainerResponsive: {
    alignItems: "center",
    display: "flex",
    position: "relative",
    "@media (max-width: 899px)": {
      height: "auto"
    }
  },
  backgroundContainerTabs: {
    height: "calc(100vh - var(--header-height))",
    "@media (max-width: 899px)": {
      height: "calc(50vh - var(--header-height))"
    }
  },
  backgroundContainerTabsWithFooter: {
    height: "calc(100vh - var(--header-height) - 52px)",
    "@media (max-width: 899px)": {
      height: "calc(50vh - var(--header-height) - 52px)"
    }
  },
  image: {
    maxWidth: "100%",
    "@media (max-width: 899px)": {
      maxHeight: "50vh"
    }
  },
  maxImageHeightDialog: {
    maxHeight: "100vh",
    "@media (max-width: 899px)": {
      maxHeight: "calc(50vh - var(--header-height))"
    }
  },
  maxImageHeightDialogWithFooter: {
    maxHeight: "calc(100vh - 52px)",
    "@media (max-width: 899px)": {
      maxHeight: "calc(50vh - 52px)"
    }
  },
  maxImageHeightTabs: {
    maxHeight: "calc(100vh - var(--header-height))",
    "@media (max-width: 899px)": {
      maxHeight: "calc(50vh - var(--header-height))"
    }
  },
  maxImageHeightTabsWithFooter: {
    maxHeight: "kgqd366c",
    "@media (max-width: 899px)": {
      maxHeight: "calc(50vh - var(--header-height) - 52px)"
    }
  },
  passthroughImage: {
    backgroundPosition: "center center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
    height: "100%",
    width: "100%"
  },
  photoWrapperPlaceholder: {
    height: "100%",
    width: "100%"
  },
  photoWrapperResponsive: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    position: "relative"
  },
  placeholderContainer: {
    height: "100%",
    width: "100%"
  }
});

function aaaa() {
  return (
    <CheckMarkIcon
      size={18}
      UNSAFE_className={stylex.dedupe(
        {
          display: 'inline-block',
          pointerEvents: 'none',
          fill: 'currentColor',
          width: 18,
          height: 18,
          position: 'absolute',
          color: 'var(--always-white)',
          transition: 'opacity 100ms ease-in-out, transform 100ms ease-in-out',
        },
        state.isSelected ? {
          opacity: 1,
        } : {
          opacity: 0,
        },
      )}
    />
  )
}

function aaa() {
  return (
    <div
      {...hoverProps}
      key={`${bodyId}-row-${index}`}
      className={joinClasses(
        stylex.dedupe(
          {
            boxSizing: 'border-box',
          },
          !isHovered ? {
            backgroundColor: 'var(--card-background)',
          } : {
            backgroundColor: 'var(--light-light-color)',
          },
          !state.noBorders ? {
            borderStyle: 'solid',
            borderColor: 'var(--divider)'
          } : null,
          !state.noBorders && (index > 0 || !state.noHeader && index === 0) ? {
            borderBottomWidth: 1,
            borderLeftWidth: 0,
            borderRightWidth: 0,
            borderTopWidth: 0,
          } : null,
          !state.noBorders && state.noHeader && index === 0 ? {
            borderTopWidth: 1,
            borderBottomWidth: 1,
            borderLeftWidth: 0,
            borderRightWidth: 0,
          } : null,
        ),
        state.rowClassName,
      )}
      style={{display: 'flex'}}
    >
      aa
    </div>
  );
}


function aaa() {
  return React.createElement("svg", {
    className: stylex.dedupe({
      position: "absolute"
    }, a === 36 ? {
      left: -3,
      top: -3
    } : null, a === 60 ? {
      left: -3,
      top: -3
    } : null, a === 40 ? {
      left: -3,
      top: -3
    } : null),
    height: d,
    width: d,
    children: React.createElement("g", {
      className: stylex.dedupe({
          transformOrigin: '50% 50%',
          animationTimingFunction: 'linear',
          animationName: stylex.keyframes({
            to: {
              transform: 'rotate(1turn)',
            },
          }),
          animationIterationCount: 'infinite',
          animationDuration: '4s',
        },
        c ? {
          animationPlayState: 'paused',
        } : null,
      ),
      children: React.createElement("circle", {
        className: stylex.dedupe({
          animationDirection: "reverse",
          animationDuration: "16s",
          animationIterationCount: "infinite",
          animationTimingFunction: "linear",
          transformOrigin: "50% 50%"
        }, a === 36 ? {
          animationDirection: "reverse",
          animationDuration: "4s",
          animationIterationCount: "infinite",
          animationTimingFunction: "linear",
          transformOrigin: "50% 50%",
          animationName: stylex.keyframes({
            '0%': {
              animationTimingFunction: 'cubic-bezier(.895, .03, .685, .22)',
              strokeDasharray: '71 95',
              strokeDashoffset: 0,
            },
            '49.999%': {
              strokeDasharray: '0 95',
              strokeDashoffset: 0
            },
            '50.001%': {
              animationTimingFunction: 'cubic-bezier(.165, .84, .44, 1)',
              strokeDasharray: '0 95',
              strokeDashoffset: -95,
            },
            '100%': {
              strokeDasharray: '71 95',
              strokeDashoffset: 0
            }
          }),
          strokeWidth: 2
        } : null, a === 40 ? {
          animationDirection: "reverse",
          animationDuration: "4s",
          animationIterationCount: "infinite",
          animationTimingFunction: "linear",
          transformOrigin: "50% 50%",
          animationName: stylex.keyframes({
            '0%': {
              animationTimingFunction: 'cubic-bezier(.895, .03, .685, .22)',
              strokeDasharray: '79 106',
              strokeDashoffset: 0
            },
            '49.999%': {
              strokeDasharray: '0 106',
              strokeDashoffset: 0
            },
            '50.001%': {
              animationTimingFunction: 'cubic-bezier(.165, .84, .44, 1)',
              strokeDasharray: '0 106',
              strokeDashoffset: -106
            },
            '100%': {
              strokeDasharray: '79 106',
              strokeDashoffset: 0
            }
          }),
          strokeWidth: 3
        } : null, a === 60 ? {
          animationDirection: "reverse",
          animationDuration: "4s",
          animationIterationCount: "infinite",
          animationTimingFunction: "linear",
          transformOrigin: "50% 50%",
          animationName: stylex.keyframes({
            '0%': {
              animationTimingFunction: 'cubic-bezier(.895, .03, .685, .22)',
              strokeDasharray: '118 158',
              strokeDashoffset: 0,
            },
            '49.999%': {
              strokeDasharray: '0 158',
              strokeDashoffset: 0,
            },
            '50.001%': {
              animationTimingFunction: 'cubic-bezier(.165, .84, .44, 1)',
              strokeDasharray: '0 158',
              strokeDashoffset: -158,
            },
            '100%': {
              strokeDasharray: '118 158',
              strokeDashoffset: 0,
            }
          }),
          strokeWidth: 4
        } : null, c ? {
          animationPlayState: 'paused',
        } : null),
        cx: e,
        cy: e,
        fill: "none",
        r: f,
        stroke: "#1877F2",
        strokeWidth: a === 36 ? m : a === 40 ? n : o
      })
    })
  })
}

