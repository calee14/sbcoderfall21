import Piece from "../Piece";

class Pawn extends Piece {
    constructor(color, pos, imgURL) {
        super(color, pos, imgURL);
    }

    showMovement(board=null) {
        var arr= [];
        return;
    }
}

export default Pawn;