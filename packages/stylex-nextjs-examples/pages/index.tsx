/**
 * Copyright (c) Ladifire, Inc. And its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from "react";
import Head from "next/head";
import stylex from "@ladifire-opensource/stylex";

const styles = stylex.create({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  button: {
    borderRadius: 8
  }
});

export default function Home() {
  return (
    <div className={stylex(styles.root)}>
      <button className={stylex(styles.button)}>Stylex button!</button>
    </div>
  );
}
