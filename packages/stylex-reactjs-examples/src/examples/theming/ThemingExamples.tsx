/**
 * Copyright (c) Ladifire, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';

import stylex from '@ladifire-opensource/stylex';
import CometStyleXSheet from "@ladifire-opensource/stylex-theme";

import {themeDataBase} from './themeDataBase';
import {themeDataCustom} from './themeDataCustom';

const styles = stylex.create({
  root: {
    color: "var(--accent)",
  },
  card: {
    backgroundColor: "var(--surface-background)"
  },
});

export const ThemingExamples = () => {
  React.useEffect(() => {
    CometStyleXSheet.rootStyleSheet.setRootTheme(themeDataBase);
    CometStyleXSheet.rootStyleSheet.setCustomTheme(themeDataCustom);
  }, []);

  const [isDark, setIsDark] = React.useState<boolean>(() => false);
  const toggleIsDark = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    setIsDark(target.checked);
    CometStyleXSheet.rootStyleSheet.toggleCustomTheme(!isDark);
  }, [isDark, setIsDark]);

  return (
    <div className={stylex(styles.root)}>
      <div
        className={stylex(styles.card)}
      >
        <label>
          <input type="checkbox" checked={isDark} onChange={toggleIsDark}/>
          Use dark theme
        </label>
      </div>
    </div>
  );
};
