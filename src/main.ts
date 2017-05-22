import "./polyfills.browser";

import { NgModule, PlatformRef } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

import { AppComponent } from "./app/app.component";
import { BoardComponent } from "./app/board.component";
import { PieceComponent } from "./app/piece.component";
import { StatusComponent } from "./app/status.component";

import { GameService } from "./app/game.service";

/** TODO */
@NgModule({
    imports: [
        BrowserModule,
    ],
    declarations: [
        AppComponent,
        BoardComponent,
        PieceComponent,
        StatusComponent,
    ],
    providers: [
        GameService,
    ],
    bootstrap: [
        AppComponent,
    ],
})
class AppModule { }

const platform: PlatformRef = platformBrowserDynamic();
// tslint:disable-next-line
platform.bootstrapModule(AppModule).catch((reason: any) => console.log(reason));
