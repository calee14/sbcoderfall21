import Piece from "../Piece";

class King extends Piece {
    constructor(color, pos, imgURL) {
        super(color, pos, imgURL);
    }

    getMovementOptions(board=null, playerPiece=true) {
        /*
            Parameters:
                board: Array[Square]
                playerPiece: bool
            Returns: Array[] of the positions on the board
        */

        const pos = this.getPos();
        console.log(pos)
        var pieceRow = pos[0];
        var pieceCol = pos[1];

        var moveOptions = [];
        
        // find squares where bishop can move
        const dirOptions = [[1, 1], [0, 1], [-1, 1], [0, -1], [-1, -1], [-1, 0], [1, 0], [1, -1]];
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
}

export default King;