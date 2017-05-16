import "./polyfills.browser";

import { NgModule, PlatformRef } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

import { AppComponent } from "./app/app.component";

/** TODO */
@NgModule({
    imports: [
        BrowserModule,
    ],
    declarations: [
        AppComponent,
    ],
    providers: [

    ],
    bootstrap: [
        AppComponent,
    ],
})
class AppModule { }

const platform: PlatformRef = platformBrowserDynamic();
// tslint:disable-next-line
platform.bootstrapModule(AppModule).catch((reason: any) => console.log(reason));
