import "./polyfills.browser";

import { platformBrowser } from "@angular/platform-browser";
import { AppModuleNgFactory } from "../aot/src/app/app.module.ngfactory";

// tslint:disable-next-line:no-floating-promises no-any
platformBrowser().bootstrapModuleFactory(AppModuleNgFactory).catch((reason: any) => { console.log(reason); });
