/**
 * Copyright (c) Ladifire, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (!Array.prototype.flatMap) {
  var b = function(a, callback) {
    var c = [];
    if (typeof callback !== "function") throw new TypeError("Callback function must be callable.");
    for (var d = 0; d < a.length; d++) {
      var e = callback.call(a, a[d], d, a);
      Array.isArray(e) ? c.push.apply(c, e) : c.push(e)
    }
    return c
  };

  Array.prototype.flatMap = function(a) {
    var c = arguments[1] || this;
    return b(c, a)
  }
}

(function() {
  var a = Object.prototype.hasOwnProperty;
  Object.entries = function(b) {
    if (b == null) throw new TypeError("Object.entries called on non-object");
    var c = [];
    for (var d in b) a.call(b, d) && c.push([d, b[d]]);
    return c
  };
  typeof Object.fromEntries !== "function" && (Object.fromEntries = function(a) {
    var b = {};
    for (var a = a, c = Array.isArray(a), d = 0, a = c ? a : a[typeof Symbol === "function" ? Symbol.iterator : "@@iterator"]();;) {
      var e;
      if (c) {
        if (d >= a.length) break;
        e = a[d++]
      } else {
        d = a.next();
        if (d.done) break;
        e = d.value
      }
      e = e;
      var f = e[0];
      e = e[1];
      b[f] = e
    }
    return b
  });
  Object.values = function(b) {
    if (b == null) throw new TypeError("Object.values called on non-object");
    var c = [];
    for (var d in b) a.call(b, d) && c.push(b[d]);
    return c
  }
})();
