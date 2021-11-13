import Piece from "../Piece";

class Pawn extends Piece {
    constructor(color, pos, imgURL) {
        super(color, pos, imgURL);
    }

    showMovement(board=null, playerPiece=true) {
        var moveOptions= [[1,0]];
        if(this.moveHistory.length == 0) { // this is the first move for the pawn
            
        }
        
        return;
    }
}

export default Pawn;