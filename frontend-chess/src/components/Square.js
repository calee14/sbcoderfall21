import React from "react";

class Square {
    constructor(color, pieceType, pos, imgURL=null) {
        this.squareColor = color;
        this.pieceType = pieceType; // of class type piece
        this.pos = pos;
        this.imgURL = imgURL// img file name
        this.moveableSquare = false;
    }

    getImage() { return this.imgURL; }
    getPos() { return this.pos; }
    getPieceType() { return this.pieceType; }
    getSquareColor() { return this.squareColor; }
    getMoveableSquare() { return this.moveableSquare; }

    setMoveableSquare(bool) { this.moveableSquare = bool; }

    addPiece(piece) {
        this.pieceType = piece;
    }

    removePiece() {
        this.pieceType = null;
    }

}

export default Square;