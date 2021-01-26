// @author: somibuon, Duc Hoang
// TODO: need more review

import {CssStyle, Style} from './global';

// tslint:disable-next-line:export-just-namespace
export = stylex;
export as namespace stylex;

declare function stylex(...style: (CssStyle | CssStyle[])[]): string;

declare namespace stylex {
  function create<T extends string | number>(styles: Style<T>) : { [key in T]: CssStyle }

  function dedupe(...styles: CssStyle[]): string;

  // TODO: maybe remove in next release
  function compose(...styles: CssStyle[]): CssStyle;

  function keyframes(rules: CssStyle): string;

  function inject(cssString: string): void;
}
