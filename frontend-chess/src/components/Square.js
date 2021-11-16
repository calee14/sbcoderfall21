import React from "react";

class Square {
    constructor(color, pieceType, pos, imgURL=null) {
        this.squareColor = color;
        this.pieceType = pieceType; // of class type piece
        this.pos = pos;
        this.imgURL = imgURL// img file name
        this.moveableSquare = false;
        this.attackedByWhite = false;
        this.attackedByBlack = false;
    }

    getImage() { return this.imgURL; }
    getPos() { return this.pos; }
    getPieceType() { return this.pieceType; }
    getSquareColor() { return this.squareColor; }
    getMoveableSquare() { return this.moveableSquare; }
    getAttackedByWhite() { return this.attackedByWhite; }
    getAttackedByBlack() { return this.getAttackedByBlack; }

    setMoveableSquare(b) { this.moveableSquare = b; }
    setAttackedByWhite(b) { this.attackedByWhite = b; }
    setAttackedByBlack(b) { this.attackedByBlack = b; }

    addPiece(piece) {
        this.pieceType = piece;
    }

    removePiece() {
        this.pieceType = null;
    }

}

export default Square;