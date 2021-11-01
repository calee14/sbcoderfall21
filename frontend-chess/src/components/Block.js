import React from "react";
import './ChessBoard.css'

function Block(props) {
    const {piece} = props;
    return (
        <>
            <div className={`board-block ${piece.color}`}></div>
        </>
    );
}

export default Block