import { Component } from "@angular/core";
import { Side } from "./game-logic/side";
import { GameService } from "./game.service";

/** TODO */
@Component({
    selector: "status",
    templateUrl: "./status.component.html",
})
export class StatusComponent {

    /** TODO */
    private static sideToString(side?: Side): string|undefined {
        switch (side) {
            case Side.Dark:
                return "Red";
            case Side.Light:
                return "White";
            default:
                return undefined;
        }
    }
    public constructor(private game: GameService) {}

    /** TODO */
    public getTurn(): string|undefined {
        return StatusComponent.sideToString(this.game.getTurn());
    }

    /** TODO */
    public getWinner(): string|undefined {
        return StatusComponent.sideToString(this.game.getWinner());
    }

    /** TODO */
    public resetGame(): void {
        this.game.reset();
    }
}
