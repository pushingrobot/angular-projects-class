import { Board } from "./board";
import { Move } from "./move";
import { Piece } from "./piece";
import { Side } from "./side";
import { Square } from "./square";

/** TODO */
export class Game {
    /** TODO */
    private boards: Board[];

    public constructor(board?: Board) {
        this.boards = [board instanceof Board ? board : new Board()];
    }

    /** TODO */
    public getPiece(square: Square): Piece|undefined {
        return this.getBoard().getPiece(square);
    }

    /** TODO */
    public getPieces(): Array<Array<Piece|undefined>> {
        return this.getBoard().getPieces();
    }

    /** TODO */
    public getTurn(): Side {
        return this.getBoard().getTurn();
    }

    /** TODO */
    public getValidMovesForSquare(startingSquare: Square): Move[] {
        return this.getBoard().getValidMovesForSquare(startingSquare);
    }

    /** TODO */
    public getWinner(): Side|undefined {
        return this.getBoard().getDarkCount() === 0 ?
            Side.Light :
            this.getBoard().getLightCount() === 0 ?
                Side.Dark :
                undefined;
    }

    /** TODO */
    public move(move: Move): void {
        const newBoard: Board = this.getBoard().applyMove(move);
        this.boards.push(newBoard);
    }

    /** TODO */
    private getBoard(): Board {
        return this.boards[this.boards.length - 1];
    }
}
