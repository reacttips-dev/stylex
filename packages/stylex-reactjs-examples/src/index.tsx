/**
 * Copyright (c) Ladifire, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from "react";
import * as ReactDOM from "react-dom";

import App from './App';

function renderRootComponent() {
  ReactDOM.render((
      <App/>
    ),
    document.getElementById('root'));
}

// This is for anything that needs to be done for ALL react components.
// This runs before we start to render anything.
function preRenderSetup(callwhendone: any) {
  window.onerror = (msg, url, line, column, stack) => {
    if (msg === 'ResizeObserver loop limit exceeded') {
      return;
    }
    var l: any = {};
    l.level = 'ERROR';
    l.message = 'msg: ' + msg + ' row: ' + line + ' col: ' + column + ' stack: ' + stack + ' url: ' + url;

    const req = new XMLHttpRequest();
    req.open('POST', '/api/v1/logs');
    req.setRequestHeader('Content-Type', 'application/json');
    req.send(JSON.stringify(l));
  };
  callwhendone();
}

/**
 * Adds a function to be invoked onload appended to any existing onload
 * event handlers.
 *
 * @param   {function} fn onload event handler
 *
 */
function appendOnLoadEvent(fn: any) {
  // @ts-ignore
  if (window.attachEvent) {
    // @ts-ignore
    window.attachEvent('onload', fn);
  } else if (window.onload) {
    const curronload = window.onload;
    window.onload = (evt: any) => {
      // @ts-ignore
      curronload(evt);
      fn(evt);
    };
  } else {
    window.onload = fn;
  }
}

appendOnLoadEvent(() => {
  // Do the pre-render setup and call renderRootComponent when done
  preRenderSetup(renderRootComponent);
});
