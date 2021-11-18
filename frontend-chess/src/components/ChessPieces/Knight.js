import Piece from "../Piece";

class Knight extends Piece {

    getMovementOptions(board=null, isPlayerPiece=false) {
        /*
            Parameters:
                board: Array[Square]
                isPlayerPiece: bool
            Returns: Array[] of the positions on the board
        */

        // get the position of this piece
        const pos = this.getPos();
        var pieceRow = pos[0];
        var pieceCol = pos[1];

        var moveOptions = [];
        
        // find squares where bishop can move
        const dirOptions = [[2, 1], [2, -1], [-2, -1], [-2, 1], [1, 2], [1, -2], [-1, -2], [-1, 2]];
        for(var i=0;i<dirOptions.length;i++) {
            var newPos = [pieceRow-dirOptions[i][0], pieceCol-dirOptions[i][1]];

            // condition ot check if not out of bounds and if there no piece in the square we can move the knight there
            // if there's a piece with the opposite color there then we can move the knight as well
            if(!this.outOfBounds(newPos) && (!this.pieceExists(board, newPos) || this.hasOppPieceColor(board, newPos))) {
                moveOptions.push(newPos);
            }
        }
        return moveOptions;
    }

    getAttackPos(board=null, isPlayerPiece=false) {
        // for a knight its attack positions are the same as the movement ones but it can be any piece no matter color
        /*
            Parameters:
                board: Array[Square]
                isPlayerPiece: bool
            Returns: Array[] of the positions on the board
        */

        // get the position of this piece
        const pos = this.getPos();
        var pieceRow = pos[0];
        var pieceCol = pos[1];

        var attackOptions = [];
        
        // find squares where bishop can move
        const dirOptions = [[2, 1], [2, -1], [-2, -1], [-2, 1], [1, 2], [1, -2], [-1, -2], [-1, 2]];
        for(var i=0;i<dirOptions.length;i++) {
            var newPos = [pieceRow-dirOptions[i][0], pieceCol-dirOptions[i][1]];

            // condition ot check if not out of bounds and if there no piece in the square we can move the knight there
            // if there's a piece with the opposite color there then we can move the knight as well
            if(!this.outOfBounds(newPos)) {
                attackOptions.push(newPos);
            }
        }
        return attackOptions;
    }
}

export default Knight;