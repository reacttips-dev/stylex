/**
 * Copyright (c) Ladifire, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';

import stylex from '@ladifire-opensource/stylex';

const j = stylex.create({
  base: {
    maxWidth: "100%",
    minWidth: 0,
    wordBreak: "break-word",
    wordWrap: "break-word"
  },
  block: {
    display: "block",
    "::before": {
      content: '""',
      display: "block",
      height: 0
    },
    "::after": {
      content: '""',
      display: "block",
      height: 0
    }
  },
  fixFontForChrome81: {
    fontFamily: "Helvetica Neue,Helvetica,Arial,sans-serif!important"
  },
  heading: {
    maxWidth: "100%",
    minWidth: 0
  }
});

const k = stylex.create({
  center: {
    textAlign: "center"
  },
  end: {
    textAlign: "right"
  },
  start: {
    textAlign: "left"
  }
});

type Colors =
  | "blueLink"
  | "disabled"
  | "highlight"
  | "negative"
  | "placeholder"
  | "positive"
  | "primary"
  | "primaryButton"
  | "secondary"
  | "secondaryOnMedia"
  | "tertiary"
  | "white";

const l = stylex.create({
  blueLink: {
    color: "var(--blue-link)"
  },
  disabled: {
    color: "var(--disabled-text)"
  },
  highlight: {
    color: "var(--accent)"
  },
  negative: {
    color: "var(--negative)"
  },
  placeholder: {
    color: "var(--placeholder-text)"
  },
  positive: {
    color: "var(--positive)"
  },
  primary: {
    color: "var(--primary-text)"
  },
  primaryButton: {
    color: "var(--primary-button-text)"
  },
  secondary: {
    color: "var(--secondary-text)"
  },
  secondaryOnMedia: {
    color: "var(--secondary-text-on-media)"
  },
  tertiary: {
    color: "var(--placeholder-text)"
  },
  white: {
    color: "var(--always-white)"
  }
});

const m = stylex.create({
  12: {
    fontSize: ".75rem",
    lineHeight: 1.3333
  },
  13: {
    fontSize: ".8125rem",
    lineHeight: 1.2308
  },
  15: {
    fontSize: ".9375rem",
    lineHeight: 1.3333
  },
  17: {
    fontSize: "1.0625rem",
    lineHeight: 1.1765
  },
  20: {
    fontSize: "1.25rem",
    lineHeight: 1.2
  },
  24: {
    fontSize: "1.5rem",
    lineHeight: 1.1667
  },
  28: {
    fontSize: "1.75rem",
    lineHeight: 1.1429
  },
  32: {
    fontSize: "2rem",
    lineHeight: 1.1875
  }
});

const n = stylex.create({
  12: {
    fontSize: ".75rem",
    lineHeight: 1.3333
  },
  13: {
    fontSize: ".75rem",
    lineHeight: 1.2308
  },
  15: {
    fontSize: ".875rem",
    lineHeight: 1.3333
  },
  17: {
    fontSize: "1rem",
    lineHeight: 1.1765
  },
  20: {
    fontSize: "1.25rem",
    lineHeight: 1.2
  },
  24: {
    fontSize: "1.5rem",
    lineHeight: 1.1667
  },
  28: {
    fontSize: "1.75rem",
    lineHeight: 1.1429
  },
  32: {
    fontSize: "2rem",
    lineHeight: 1.1875
  }
});

const o = stylex.create({
  bold: {
    fontWeight: 700
  },
  medium: {
    fontWeight: 500
  },
  normal: {
    fontWeight: "normal"
  },
  semibold: {
    fontWeight: 600
  }
});

const p = stylex.create({
  1: {
    "::before": {
      marginTop: -1
    }
  },
  2: {
    "::before": {
      marginTop: -2
    }
  },
  3: {
    "::before": {
      marginTop: -3
    }
  },
  4: {
    "::before": {
      marginTop: -4
    }
  },
  5: {
    "::before": {
      marginTop: -5
    }
  },
  6: {
    "::before": {
      marginTop: -6
    }
  },
  7: {
    "::before": {
      marginTop: -7
    }
  },
  8: {
    "::before": {
      marginTop: -8
    }
  },
  9: {
    "::before": {
      marginTop: -9
    }
  },
  10: {
    "::before": {
      marginTop: -10
    }
  }
});

const q = stylex.create({
  1: {
    "::after": {
      marginBottom: -1
    }
  },
  2: {
    "::after": {
      marginBottom: -2
    }
  },
  3: {
    "::after": {
      marginBottom: -3
    }
  },
  4: {
    "::after": {
      marginBottom: -4
    }
  },
  5: {
    "::after": {
      marginBottom: -5
    }
  },
  6: {
    "::after": {
      marginBottom: -6
    }
  },
  7: {
    "::after": {
      marginBottom: -7
    }
  },
  8: {
    "::after": {
      marginBottom: -8
    }
  },
  9: {
    "::after": {
      marginBottom: -9
    }
  },
  10: {
    "::after": {
      marginBottom: -10
    }
  }
});

interface Props {
  children: string | React.ReactElement;
  color?: Colors;
}

const Text = (props: Props, ref: React.RefObject<any>) => {
  const {
    children,
    color = "primary"
  } = props;

  return (
    <span
      ref={ref}
      className={stylex(j.base, l[color])}
    >
      {children}
    </span>
  );
};

const _Text = React.forwardRef(Text);
export {_Text as Text}
