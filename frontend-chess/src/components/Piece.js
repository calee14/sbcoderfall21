class Piece {
    constructor(color, pos, imgURL="") {
        this.pieceColor = color;
        this.pos = pos;
        this.imgURL = imgURL// img file name
        this.moveHistory = []
    }

    getImage() { return this.imgURL; }
    getPos() { return this.pos; }
    getPieceColor() { return this.pieceColor; }
    getMoveHistory() { return this.moveHistory; }

    addMoveHistory(newPos) { // store history of movement and update current pos
        console.log('our pos before log', this.pos)
        if(JSON.stringify(newPos) !== JSON.stringify(this.pos)) {
            this.moveHistory.push(newPos); 
            this.pos = newPos;
        }
    }

    hasOppPieceColor(board, pos) {
        if(pos[0] < 0 || pos[0] > 7 || pos[1] < 0 || pos[1] > 7) { return false; }
        const sqaureAtPos = board[pos[0]][pos[1]];
        console.log('reach func')
        if(sqaureAtPos.getPieceType() === null) { return false; }
        if(sqaureAtPos.getPieceType().getPieceColor() !== this.pieceColor) {
            console.log('has opposite color')
            return true;
        }
        console.log('has same color')
        return false;
    }

    outOfBounds(pos) {
        if(pos[0] < 0 || pos[0] > 7 || pos[1] < 0 || pos[1] > 7) { return true; }
        return false;
    }

    pieceExists(board, pos) {
        if(pos[0] < 0 || pos[0] > 7 || pos[1] < 0 || pos[1] > 7) { return false; }
        const sqaureAtPos = board[pos[0]][pos[1]];
        if(sqaureAtPos.getPieceType() != null) {
            return true;
        }
        return false;
    }

    getMovementOptions(board=null, isPlayerPiece=false) { return []; }
    getAttackPos(board=null, isPlayerPiece=false) { return []; }
}

export default Piece