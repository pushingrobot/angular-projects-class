import "./polyfills.browser";

import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { AppModule } from "./app/app.module";

// tslint:disable-next-line:no-floating-promises no-any
platformBrowserDynamic().bootstrapModule(AppModule).catch((reason: any) => { console.log(reason); });
