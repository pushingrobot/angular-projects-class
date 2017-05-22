import {Move} from "./move";
import {MoveDirection} from "./move-direction";
import {Piece} from "./piece";
import {Side} from "./side";
import {Square} from "./square";

const BOARD_SIZE: number = 8;
export type BoardPieces = Array<Array<Piece|undefined>>;
type ListPieces = Piece[];

enum HorizontalDirection {
    None,
    Positive,
    Negative,
}

/** TODO */
function invertTurn(turn: Side): Side {
    return turn === Side.Dark ? Side.Light : Side.Dark;
}
/** TODO */
export class Board {
    /** TODO */
    private static calculatePotentialMoves(pieces: BoardPieces, startingSquare: Square|undefined): Move[] {
        if (startingSquare === undefined) {
            return [];
        }

        if (!startingSquare.getIsValid()) {
            throw new Error("The square is invalid.");
        }

        const piece: Piece|undefined = Board.getPiece(pieces, startingSquare);
        if (piece === undefined) {
            return [];
        }

        const validMoves: Array<Move|undefined> = [];
        const direction: MoveDirection = piece.getMoveDirection();

        if (direction === MoveDirection.Forward || direction === MoveDirection.Both) {
            validMoves.push(this.calculateValidMoveInQuadrant(
                pieces, startingSquare, HorizontalDirection.Negative, MoveDirection.Forward));
            validMoves.push(this.calculateValidMoveInQuadrant(
                pieces, startingSquare, HorizontalDirection.Positive, MoveDirection.Forward));
        }

        if (direction === MoveDirection.Backward || direction === MoveDirection.Both) {
            validMoves.push(this.calculateValidMoveInQuadrant(
                pieces, startingSquare, HorizontalDirection.Negative, MoveDirection.Backward));
            validMoves.push(this.calculateValidMoveInQuadrant(
                pieces, startingSquare, HorizontalDirection.Positive, MoveDirection.Backward));
        }

        return validMoves.filter((x: Move|undefined) => x !== undefined) as Move[];
    }

    /** TODO */
    private static calculateValidMoveInQuadrant(
        pieces: BoardPieces,
        startingSquare: Square,
        horizontalDirection: HorizontalDirection,
        moveDirection: MoveDirection,
        ): Move|undefined {

        let columnModifier: number;
        switch (horizontalDirection) {
            case HorizontalDirection.Positive:
                columnModifier = 1;
                break;
            case HorizontalDirection.Negative:
                columnModifier = -1;
                break;
            default:
                throw new Error("Invalid row move direction.");
        }

        let rowModifier: number;
        switch (moveDirection) {
            case MoveDirection.Forward:
                rowModifier = -1;
                break;
            case MoveDirection.Backward:
                rowModifier = 1;
                break;
            default:
                throw new Error("Invalid column move direction.");
        }

        const moveSquareRow: number = startingSquare.getRow() + rowModifier;
        const moveSquareColumn: number = startingSquare.getColumn() + columnModifier;
        const moveSquare: Square = new Square(moveSquareRow, moveSquareColumn);
        if (moveSquare.getIsValid()) {
            const moveSquarePiece: Piece|undefined = Board.getPiece(pieces, moveSquare);
            if (moveSquarePiece === undefined) {
                return new Move(startingSquare, moveSquare);
            }
            const startPiece: Piece|undefined = Board.getPiece(pieces, startingSquare);
            if (startPiece !== undefined && moveSquarePiece.getSide() !== startPiece.getSide()) {
                const jumpSquareRow: number = moveSquare.getRow() + rowModifier;
                const jumpSquareColumn: number = moveSquare.getColumn() + columnModifier;
                const jumpSquare: Square = new Square(jumpSquareRow, jumpSquareColumn);
                if (jumpSquare.getIsValid())             {
                    const jumpSquarePiece: Piece|undefined = Board.getPiece(pieces, jumpSquare);
                    if (jumpSquarePiece === undefined) {
                        return new Move(startingSquare, jumpSquare);
                    }
                }
            }

        }

        return undefined;
    }

    /** TODO */
    private static calculateValidMoves(pieces: BoardPieces, turn: Side): Move[] {
        const validJumps: Move[] = [];
        const validNonJumps: Move[] = [];
        pieces.forEach((pieceArray: ListPieces, row: number) => {
            pieceArray.forEach((piece: Piece|undefined, column: number) => {
                if (piece === undefined || piece.getSide() !== turn) {
                    return;
                }

                const square: Square = new Square(row, column);
                const potentialMoves: Move[] = this.calculatePotentialMoves(pieces, square);
                const potentialJumps: Move[] = potentialMoves.filter((x: Move) => x.getIsJump());

                if (potentialJumps.length > 0) {
                    validJumps.push.apply(validJumps, potentialJumps);
                } else if (potentialMoves.length > 0 && validJumps.length === 0) {
                    validNonJumps.push.apply(validNonJumps, potentialMoves);
                }
            });
        });

        return validJumps.length > 0 ? validJumps : validNonJumps;
    }

    /** TODO */
    private static flattenPieceArray(pieces: BoardPieces): ListPieces {
        const piecesList: ListPieces = [];
        let piece: Piece|undefined;
        for (let i: number = 0; i < BOARD_SIZE; i++) {
            for (let j: number = 0; j < BOARD_SIZE; j++) {
                piece = pieces[i][j];
                if (piece !== undefined) { piecesList.push(piece); }
            }
        }

        return piecesList;
    }

    /** TODO */
    private static getEmptyPiecesArray(): BoardPieces {
        const pieces: BoardPieces = [];
        for (let i: number = 0; i < BOARD_SIZE; i++) {
            pieces[i] = [];
        }

        return pieces;
    }

    /** TODO */
    private static getInitialPieces(): BoardPieces {
        const pieces: BoardPieces = this.getEmptyPiecesArray();
        for (let row: number = 0; row < BOARD_SIZE; row++) {
            for (let column: number = 0; column < BOARD_SIZE; column++) {
                pieces[row][column] =
                    (row + column) % 2 === 1 && row !== (BOARD_SIZE / 2) && row !== (BOARD_SIZE / 2) - 1 ?
                        new Piece(row < (BOARD_SIZE / 2) ? Side.Light : Side.Dark) :
                        undefined;
            }
        }

        return pieces;
    }

    /** TODO */
    private static getPiece(pieces: BoardPieces, square: Square): Piece|undefined {
        return pieces[square.getRow()][square.getColumn()];
    }

    /** TODO */
    private static setPiece(pieces: BoardPieces, square: Square, piece: Piece|undefined): void {
        pieces[square.getRow()][square.getColumn()] = piece;
    }

    /**
     *  PRIVATE ASSIGNMENTS
     */

    /** TODO */
    private darkCount: number;
    /** TODO */
    private lightCount: number;
    /** TODO */
    private turn: Side;
    /** TODO */
    private validMoves: Move[];

    /**
     * CONSTRUCTOR
     * @param pieces: Optional. Continue a game by passing in an existing BoardPieces
     * @param previousTurn: Optional. Defaults to Turn.Light
     * @param lastJumpTargetSquare: Optional.
     */
    public constructor(
        private pieces: BoardPieces = Board.getInitialPieces(),
        previousTurn: Side = Side.Light,
        lastJumpTargetSquare?: Square,
    ) {
        const allPieces: ListPieces = Board.flattenPieceArray(this.pieces);
        this.darkCount = allPieces.filter((x: Piece) => x.getSide() === Side.Dark).length;
        this.lightCount = allPieces.filter((x: Piece) => x.getSide() === Side.Light).length;

        if (lastJumpTargetSquare !== undefined) {
            const nextJumps: Move[] = Board.calculateValidMoves(this.pieces, previousTurn)
                .filter((x: Move) => x.getIsJump() && x.getSourceSquare().isEquivalentTo(lastJumpTargetSquare));
            this.turn = nextJumps.length > 0 ? previousTurn : invertTurn(previousTurn);
        } else {
            this.turn = invertTurn(previousTurn);
        }

        this.validMoves = Board.calculateValidMoves(this.pieces, this.turn);
    }

   /** TODO */
    public applyMove(move: Move): Board {
        let piece: Piece|undefined = this.getPiece(move.getSourceSquare());
        if (piece === undefined) {
            throw Error("The move's source square does not contain a piece.");
        }

        if (this.getPiece(move.getTargetSquare()) !== undefined) {
            throw Error("The move's target square contains a piece.");
        }

        const pieces: BoardPieces = this.clonePieces();
        const source: Square = move.getSourceSquare();
        const target: Square = move.getTargetSquare();
        Board.setPiece(pieces, source, undefined);
        if ((target.getRow() === 0 || target.getRow() === (BOARD_SIZE - 1)) && !piece.getIsKinged()) {
            piece = new Piece(piece.getSide(), true);
        }

        Board.setPiece(pieces, target, piece);
        if (move.getIsJump()) {
            const jumpedRow: number = move.getSourceSquare().getRow() +
                ((move.getTargetSquare().getRow() - move.getSourceSquare().getRow()) / 2);
            const jumpedColumn: number = move.getSourceSquare().getColumn() +
                ((move.getTargetSquare().getColumn() - move.getSourceSquare().getColumn()) / 2); // tslint:disable-line
            const jumpedSquare: Square = new Square(jumpedRow, jumpedColumn);
            Board.setPiece(pieces, jumpedSquare, undefined);
        }

        const jumpTargetSquare: Square|undefined = move.getIsJump() ? move.getTargetSquare() : undefined;

        return new Board(pieces, this.turn, jumpTargetSquare);
    }

    /** TODO */
    public getDarkCount(): number {
        return this.darkCount;
    }

    /** TODO */
    public getLightCount(): number {
        return this.lightCount;
    }

    /** TODO */
    public getPiece(square: Square): Piece|undefined {
        return Board.getPiece(this.pieces, square);
    }

    /** TODO */
    public getPieces(): BoardPieces {
        return this.pieces;
    }

    /** TODO */
    public getTurn(): Side {
        return this.turn;
    }

    /** TODO */
    public getValidMovesForSquare(startingSquare: Square): Move[] {
        return this.validMoves.filter((x: Move) => x.getSourceSquare().isEquivalentTo(startingSquare));
    }

    /** TODO */
    private clonePieces(): BoardPieces {
        const pieces: BoardPieces = Board.getEmptyPiecesArray();
        for (let row: number = 0; row < BOARD_SIZE; row++) {
            for (let column: number = 0; column < BOARD_SIZE; column++) {
                // We can reuse pieces because they are immutable.
                pieces[row][column] = this.pieces[row][column];
            }
        }

        return pieces;
    }

}
