import {Injectable} from "@angular/core";
import {Game} from "./game-logic/game";
import {Move} from "./game-logic/move";
import {Piece} from "./game-logic/piece";
import {Side} from "./game-logic/side";
import {Square} from "./game-logic/square";

/** TODO */
@Injectable() // tslint:disable-line
export class GameService {
    /** TODO */
    private game: Game = new Game();
    /** TODO */
    private selectedSquare?: Square;
    /** TODO */
    private validMoves: Move[] = [];

    /** TODO */
    public getPieces(): Array<Array<Piece|undefined>> {
        return this.game.getPieces();
    }

    /** TODO */
    public getSelectedSquare(): Square|undefined {
        return this.selectedSquare;
    }

    /** TODO */
    public getTurn(): Side {
        return this.game.getTurn();
    }

    /** TODO */
    public getValidMoves(): Move[] {
        return this.validMoves;
    }

    /** TODO */
    public getWinner(): Side|undefined {
        return this.game.getWinner();
    }

    /** TODO */
    public reset(): void {
        this.game = new Game();
    }

    /** TODO */
    public selectSquare(square: Square): void {
        const currentSide: Side = this.game.getTurn();
        const newlySelectedPiece: Piece|undefined = this.game.getPiece(square);
        if (newlySelectedPiece === undefined) {
            if (this.selectedSquare !== undefined) {
                const isValidMove: boolean =
                    this.game.getValidMovesForSquare(this.selectedSquare)
                        .map((x: Move) => x.getTargetSquare())
                        .filter((x: Square) => x.getColumn() === square.getColumn() && x.getRow() === square.getRow())
                        .length > 0;

                if (isValidMove) {
                    const move: Move = new Move(this.selectedSquare, square);
                    this.game.move(move);
                }
            }
            this.selectedSquare = undefined;
            this.validMoves = [];
        } else if (newlySelectedPiece.getSide() === currentSide) {
            this.selectedSquare = square;
            this.validMoves = this.game.getValidMovesForSquare(square);
        } else {
            this.selectedSquare = undefined;
            this.validMoves = [];
        }
    }
}
