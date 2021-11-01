import React from "react";

class Piece {
    constructor(color, name, pos) {
        this.color = color;
        this.name = name; // img file name
        this.pos = pos
    }

    getImage() {
        return 'img';
    }
}

export default Piece