import React from "react";

class Piece {
    constructor(color, pos, imgURL="") {
        this.pieceColor = color;
        this.pos = pos;
        this.imgURL = imgURL// img file name
    }

    getImage() { return this.imgURL; }
    getPos() { return this.pos; }
    getPieceColor() { return this.pieceColor; }
}

export default Piece