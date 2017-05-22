import {MoveDirection} from "./move-direction";
import {Side} from "./side";

/** TODO */
export class Piece {
    /** TODO */
    private isKinged: boolean;
    /** TODO */
    private moveDirection: MoveDirection;

    public constructor(private side: Side, isKinged: boolean = false) {
        this.isKinged = isKinged;
        this.moveDirection =
            this.isKinged ?
                MoveDirection.Both :
                this.getSide() === Side.Dark ?
                    MoveDirection.Forward :
                    MoveDirection.Backward;
    }

    /** TODO */
    public getIsKinged(): boolean {
        return this.isKinged;
    }

    /** TODO */
    public getMoveDirection(): MoveDirection {
        return this.moveDirection;
    }

    /** TODO */
    public getSide(): Side {
        return this.side;
    }
}
