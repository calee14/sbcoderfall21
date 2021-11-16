import Piece from "../Piece";

class Pawn extends Piece {
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

        // Check if pawn can move one and two spaces
        var tempPos = [1, 0];
        var newPos = [pieceRow-tempPos[0], pieceCol-tempPos[1]];
        if(!this.outOfBounds(newPos) && !this.pieceExists(board, newPos)) {
            // move forward one is an option
            moveOptions.push(newPos);
            
            // check for the two space movement
            tempPos = [2, 0];
            newPos = [pieceRow-tempPos[0], pieceCol-tempPos[1]];
            if(this.moveHistory.length == 0 && !this.outOfBounds(newPos) && !this.pieceExists(board, newPos)) { // this is the first move for the pawn
                moveOptions.push(newPos);
            }
        }
        
        // Check moves if pawn can attack
        const attackOptions = [[1, 1], [1, -1]];
        for(var i=0;i<attackOptions.length;i++) {
            const newPos = [pieceRow-attackOptions[i][0], pieceCol-attackOptions[i][1]]
            if(this.pieceExists(board, newPos) && this.hasOppPieceColor(board, newPos)) {
                moveOptions.push(newPos);
            }
        }
        return moveOptions;
    }

}

export default Pawn;