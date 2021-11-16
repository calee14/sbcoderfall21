import Piece from "../Piece";

class Bishop extends Piece {
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
        
        // find squares where bishop can move
        const dirOptions = [[1, 1], [1, -1], [-1, -1], [-1, 1]];
        for(var i=0;i<dirOptions.length;i++) {
            var newPos = [pieceRow-dirOptions[i][0], pieceCol-dirOptions[i][1]];
            while(!this.outOfBounds(newPos) && !this.pieceExists(board, newPos)) {
                console.log(newPos);
                moveOptions.push(newPos);
                newPos = [newPos[0]-dirOptions[i][0], newPos[1]-dirOptions[i][1]];
            }
            if(!this.outOfBounds(newPos) && this.pieceExists(board, newPos) && this.hasOppPieceColor(board, newPos)) {
                moveOptions.push(newPos);
            }
        }
        return moveOptions;
    }
}

export default Bishop;