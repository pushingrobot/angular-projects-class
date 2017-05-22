import { Component } from "@angular/core";
import { GameService } from "./game.service";

/** TODO */
@Component({
    providers: [ GameService ],
    selector: "my-app",
    templateUrl: "app.component.html",
})
export class AppComponent {
    public constructor(public game: GameService) {}
}
