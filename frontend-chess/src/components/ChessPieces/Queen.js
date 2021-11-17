import Piece from "../Piece";

class Queen extends Piece {
    constructor(color, pos, imgURL) {
        super(color, pos, imgURL);
    }

    getMovementOptions(board=null, isPlayerPiece=true) {
        /*
            Parameters:
                board: Array[Square]
                isPlayerPiece: bool
            Returns: Array[] of the positions on the board
        */

        const pos = this.getPos();
        console.log(pos);
        var pieceRow = pos[0];
        var pieceCol = pos[1];

        var moveOptions = [];
        
        // find squares where queen can move

        const dirOptions = [[0, 1], [0, -1], [-1, 0], [1, 0], [1, 1], [1, -1], [-1, -1], [-1, 1]]; // direction of the rook
        // loop through each direction and mark every square in that direction
        for(var i=0;i<dirOptions.length;i++) {
            var newPos = [pieceRow-dirOptions[i][0], pieceCol-dirOptions[i][1]];
            while(!this.outOfBounds(newPos) && !this.pieceExists(board, newPos)) { // stop loop when we reach a piece
                console.log(newPos);
                moveOptions.push(newPos);
                newPos = [newPos[0]-dirOptions[i][0], newPos[1]-dirOptions[i][1]];
            }
            // add the movement option if the queen can take an opponent's piece
            if(!this.outOfBounds(newPos) && this.pieceExists(board, newPos) && this.hasOppPieceColor(board, newPos)) {
                moveOptions.push(newPos);
            }
        }
        return moveOptions;
    }

    getAttackPos(board=null, isPlayerPiece=false) {
        /*
            Parameters:
                board: Array[Square]
                isPlayerPiece: bool
            Returns: Array[] of the positions on the board
        */

            const pos = this.getPos();
            console.log(pos);
            var pieceRow = pos[0];
            var pieceCol = pos[1];
    
            var attackOptions = [];
            
            // find squares where queen can attack
    
            const dirOptions = [[0, 1], [0, -1], [-1, 0], [1, 0], [1, 1], [1, -1], [-1, -1], [-1, 1]]; // direction of the rook
            // loop through each direction and mark every square in that direction
            for(var i=0;i<dirOptions.length;i++) {
                var newPos = [pieceRow-dirOptions[i][0], pieceCol-dirOptions[i][1]];
                while(!this.outOfBounds(newPos) && !this.pieceExists(board, newPos)) { // stop loop when we reach a piece
                    console.log(newPos);
                    attackOptions.push(newPos);
                    newPos = [newPos[0]-dirOptions[i][0], newPos[1]-dirOptions[i][1]];
                }
                // add the movement option if the queen can take an opponent's piece
                if(!this.outOfBounds(newPos)) {
                    attackOptions.push(newPos);
                }
            }
            return attackOptions;
    }
}

export default Queen;