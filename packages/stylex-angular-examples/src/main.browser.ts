import 'core-js/es6';
import 'core-js/es7/reflect';
import 'zone.js/dist/zone';

import {AppModule} from './app/app.module';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

platformBrowserDynamic().bootstrapModule(AppModule);
