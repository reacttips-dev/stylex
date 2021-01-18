/**
 * Copyright (c) Ladifire, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const LETTERS = "abcdefghijklmnopqrstuvwxyz";
const NUMBERS = "0123456789";
const LETTERS_AND_NUMBERS = LETTERS + NUMBERS;

function getOneLetterHash() {
  var a = 0;
  for (var b = arguments.length, c = new Array(b), d = 0; d < b; d++) c[d] = arguments[d];
  for (var e = 0; e < c.length; e++) {
    var f = c[e];
    if (f != null) {
      var h = f.length;
      for (var i = 0; i < h; i++) a = (a << 1) - a + f.charCodeAt(i)
    }
  }
  var j = "";
  for (var k = 0; k < 1; k++) j = LETTERS.charAt(a & 25) + j, a >>= 1;
  return j
}

function getSimpleHash() {
  var a = 0;
  for (var b = arguments.length, c = new Array(b), d = 0; d < b; d++) c[d] = arguments[d];
  for (var e = 0; e < c.length; e++) {
    var f = c[e];
    if (f != null) {
      var h = f.length;
      for (var i = 0; i < h; i++) a = (a << 5) - a + f.charCodeAt(i)
    }
  }
  var j = "";
  for (var k = 0; k < 7; k++) j = LETTERS_AND_NUMBERS.charAt(a & 31) + j, a >>= 6;
  return j
}

module.exports = function getClassHash(text) {
  return getOneLetterHash(text) + getSimpleHash(text);
};
