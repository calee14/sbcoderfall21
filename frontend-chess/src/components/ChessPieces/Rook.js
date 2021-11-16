import Piece from "../Piece";

class Rook extends Piece {
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
        console.log(pos);
        var pieceRow = pos[0];
        var pieceCol = pos[1];

        var moveOptions = [];
        
        // find squares where rook can move

        const dirOptions = [[0, 1], [0, -1], [-1, 0], [1, 0]]; // direction of the rook
        // loop through each direction and mark every square in that direction
        for(var i=0;i<dirOptions.length;i++) {
            var newPos = [pieceRow-dirOptions[i][0], pieceCol-dirOptions[i][1]];
            while(!this.outOfBounds(newPos) && !this.pieceExists(board, newPos)) { // stop loop when we reach a piece
                console.log(newPos);
                moveOptions.push(newPos);
                newPos = [newPos[0]-dirOptions[i][0], newPos[1]-dirOptions[i][1]];
            }
            // add the movement option if the rook can take an opponent's piece
            if(!this.outOfBounds(newPos) && this.pieceExists(board, newPos) && this.hasOppPieceColor(board, newPos)) {
                moveOptions.push(newPos);
            }
        }
        return moveOptions;
    }
}

export default Rook;