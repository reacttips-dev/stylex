/**
 * Copyright (c) Ladifire, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

function a(a, b, c, d) {
  function e(a, b) {
    return 1 - 3 * b + 3 * a
  }

  function f(a, b) {
    return 3 * b - 6 * a
  }

  function g(a) {
    return 3 * a
  }

  function h(a, b, c) {
    return ((e(b, c) * a + f(b, c)) * a + g(b)) * a
  }

  function i(a, b, c) {
    return 3 * e(b, c) * a * a + 2 * f(b, c) * a + g(b)
  }

  function j(b) {
    var d = b;
    for (var e = 0; e < 4; ++e) {
      var f = i(d, a, c);
      if (f === 0) return d;
      var g = h(d, a, c) - b;
      d -= g / f
    }
    return d
  }
  return function (e) {
    return a === b && c === d ? e : h(j(e), b, d)
  }
}

function b(a) {
  switch (a) {
    case "dark":
      return {
        backgroundColor: "rgba(190,195,201, 0.2)",
        foregroundColor: "rgba(0, 0, 0, 0.2)"
      };
    case "light":
      return {
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        foregroundColor: "#FFFFFF"
      };
    case "blue":
      return {
        backgroundColor: "rgba(24, 119, 242, 0.2)",
        foregroundColor: "hsl(214, 89%, 52%)"
      };
    case "disabled":
      return {
        backgroundColor: "rgba(190,195,201, 0.2)",
        foregroundColor: "#BEC3C9"
      };
    default:
      return {
        backgroundColor: "rgba(190,195,201, 0.2)",
        foregroundColor: "rgba(0, 0, 0, 0.2)"
      }
  }
}

export const CometProgressRingUtils = {
  getCubicBezierPercentageFunc: a,
  getRingColor: b,
};
