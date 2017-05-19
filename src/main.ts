import "./polyfills.browser";

import { NgModule, PlatformRef } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { RouterModule } from "@angular/router";

import { AppComponent } from "./app/app.component";
import { CityListComponent } from "./app/city-list.component";
import { CityWeatherComponent } from "./app/city-weather.component";

/** TODO */
@NgModule({
    imports: [
        BrowserModule,
        RouterModule,
    ],
    declarations: [
        AppComponent,
        CityListComponent,
        CityWeatherComponent,
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
