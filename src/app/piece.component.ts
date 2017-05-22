import { Component, Input } from "@angular/core";
import { Side } from "./game-logic/side";

/** TODO */
@Component({
    selector: "piece",
    templateUrl: "./piece.component.html",
})
export class PieceComponent {
    /** TOOD */
    @Input() public isKinged: boolean;
    /** TODO */
    @Input() public side: Side;

    /** TODO */
    public isDark(): boolean {
        return this.side === Side.Dark;
    }
}
