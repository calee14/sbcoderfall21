import Piece from "../Piece";

class Pawn extends Piece {

    getMovementOptions(board=null, isPlayerPiece=false) {
        /*
            Parameters:
                board: Array[Square]
                playerPiece: bool
            Returns: Array[] of the positions on the board
        */

        // get the position of this piece
        const pos = this.getPos();
        var pieceRow = pos[0];
        var pieceCol = pos[1];

        var moveOptions = [];

        // Check if pawn can move one and two spaces
        var tempPos = [1, 0];
        if(!isPlayerPiece) { tempPos = tempPos.map(function(x) { return x * -1; } ) };
        var newPos = [pieceRow-tempPos[0], pieceCol-tempPos[1]];
        if(!this.outOfBounds(newPos) && !this.pieceExists(board, newPos)) {
            // move forward one is an option
            moveOptions.push(newPos);
            
            // check for the two space movement
            tempPos = [2, 0];
            if(!isPlayerPiece) { tempPos = tempPos.map(function(x) { return x * -1; } ) };
            newPos = [pieceRow-tempPos[0], pieceCol-tempPos[1]];
            if(this.moveHistory.length === 0 && !this.outOfBounds(newPos) && !this.pieceExists(board, newPos)) { // this is the first move for the pawn
                moveOptions.push(newPos);
            }
        }
        
        // Check moves if pawn can attack
        var attackOptions = [[1, 1], [1, -1]];
        for(var i=0;i<attackOptions.length;i++) {
            if(!isPlayerPiece) { attackOptions[i] = attackOptions[i].map(function(x) { return x * -1; } ) };
            const newPos = [pieceRow-attackOptions[i][0], pieceCol-attackOptions[i][1]]
            if(this.pieceExists(board, newPos) && this.hasOppPieceColor(board, newPos)) {
                moveOptions.push(newPos);
            }
        }
        return moveOptions;
    }

    getAttackPos(board=null, isPlayerPiece=false) {
        // get the position of this piece
        const pos = this.getPos();
        var pieceRow = pos[0];
        var pieceCol = pos[1];
        
        var attackPos = [];
        // Check moves if pawn can attack
        var attackOptions = [[1, 1], [1, -1]];
        for(var i=0;i<attackOptions.length;i++) {
            if(!isPlayerPiece) { attackOptions[i] = attackOptions[i].map(function(x) { return x * -1; } ) };
            const newPos = [pieceRow-attackOptions[i][0], pieceCol-attackOptions[i][1]]
            if(!this.outOfBounds(newPos)) {
                attackPos.push(newPos);
            }
        }
        return attackPos;
    }

}

export default Pawn;