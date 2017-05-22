const BOARD_SIZE: number = 8;

/** TODO */
export class Square {
    /** TODO */
    private isValid: boolean;

    public constructor(private row: number, private column: number) {
        this.isValid = this.isValidCoordinate(this.getRow()) && this.isValidCoordinate(this.getColumn());
    }

    /** TODO */
    public getColumn(): number {
        return this.column;
    }

    /** TODO */
    public getIsValid(): boolean {
        return this.isValid;
    }

    /** TODO */
    public getRow(): number {
        return this.row;
    }

    /** TODO */
    public isEquivalentTo(square: Square|undefined): boolean {
        return square !== undefined && this.row === square.row && this.column === square.column;
    }

    /** TODO */
    private isValidCoordinate(coordinate: number): boolean {
        return coordinate >= 0 && coordinate < BOARD_SIZE;
    }
}
