import { Square } from "./square";

/** TODO */
export class Move {
    /** TODO */
    private isJump: boolean;
    /** TODO */
    private sourceSquare: Square;
    /** TODO */
    private targetSquare: Square;

    public constructor(sourceSquare: Square, targetSquare: Square) {
        if (!sourceSquare.getIsValid()) {
            throw new Error("The source square is invalid.");
        }

        if (!targetSquare.getIsValid()) {
            throw new Error("The target square is invalid.");
        }

        const deltaRow: number = Math.abs(sourceSquare.getRow() - targetSquare.getRow());
        const deltaColumn: number = Math.abs(sourceSquare.getColumn() - targetSquare.getColumn());

        if (deltaRow === 1 && deltaColumn === 1) {
            this.isJump = false;
        } else if (deltaRow === 2 && deltaColumn === 2) {
            this.isJump = true;
        } else {
            throw new Error("The move is invalid.");
        }

        this.sourceSquare = sourceSquare;
        this.targetSquare = targetSquare;
    }

    /** TODO */
    public getIsJump(): boolean {
        return this.isJump;
    }

    /** TODO */
    public getSourceSquare(): Square {
        return this.sourceSquare;
    }

    /** TODO */
    public getTargetSquare(): Square {
        return this.targetSquare;
    }
}
