import React from "react";

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
    
    addMoveHistory(pos) { this.moveHistory.push(pos); }
}

export default Piece