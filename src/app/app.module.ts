import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from "./app.component";
import { BoardComponent } from "./board.component";
import { PieceComponent } from "./piece.component";
import { StatusComponent } from "./status.component";

import { GameService } from "./game.service";

/** TODO */
@NgModule({
    imports: [
        BrowserModule.withServerTransition({appId: "checkers-universal"}),
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
export class AppModule { }
