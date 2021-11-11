import Piece from "../Piece";

class Rook extends Piece {
    constructor(color, pos, imgURL) {
        super(color, pos, imgURL);
    }

    showMovement(board=null) {
        var arr= [];
        return;
    }
}

export default Rook;