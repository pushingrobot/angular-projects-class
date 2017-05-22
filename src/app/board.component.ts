import { Component } from "@angular/core";
import { BoardPieces } from "./game-logic/board";
import { Move } from "./game-logic/move";
import { Square } from "./game-logic/square";
import { GameService } from "./game.service";

/** TODO */
@Component({
    selector: "board",
    templateUrl: "./board.component.html",
})
export class BoardComponent {
    /** TODO */
    private movableSquares: Square[] = [];
    public constructor(private game: GameService) {}

    /** TODO */
    public getPieces(): BoardPieces {
        return this.game.getPieces();
    }

    /** TODO */
    public isMovableSquare(row: number, column: number): boolean {
        return this.movableSquares.filter((x: Square) => x.getRow() === row && x.getColumn() === column).length > 0;
    }

    /** TODO */
    public onSelect(row: number, column: number): void {
        if ((row + column) % 2 === 0) {
            return;
        }

        const square: Square = new Square(row, column);
        this.game.selectSquare(square);
        this.movableSquares = this.game.getValidMoves().map((x: Move) => x.getTargetSquare());
    }
}
