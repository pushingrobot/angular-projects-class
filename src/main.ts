import "./polyfills.browser";

import { NgModule, PlatformRef } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { BrowserModule } from "@angular/platform-browser";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

import { routing } from "./app/app.routes";

import { AppComponent } from "./app/app.component";
import { BarGraphComponent } from "./app/bar-graph.component";
import { LineGraphComponent } from "./app/line-graph.component";
import { TweetList } from "./app/tweet-list.component";

import { MomentPipe } from "./app/moment.pipe";
import { TweetFilterPipe } from "./app/tweet-filter.pipe";

/** TODO */
@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing,
    ],
    declarations: [
        AppComponent,
        BarGraphComponent,
        LineGraphComponent,
        MomentPipe,
        TweetFilterPipe,
        TweetList,
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
