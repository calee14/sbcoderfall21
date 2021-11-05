import React, { useState } from "react";
import './ChessBoard.css'

function Block(props) {
    const {square} = props;
    const [isClicked, setClicked] = useState(false)
    
    function handleClicked(e) {
        e.preventDefault();
        console.log('You clicked a square.');
        console.log(square.pos);
        setClicked(!isClicked);
        console.log(isClicked);
    }

    var img;
    if(square.pieceType != null) {
        img = <img src={square.pieceType.imgURL} width={80} height={80}></img>
    } else {
        img = <img></img>
    }

    return (
        <>
            <div className={`board-block ${square.squareColor}`} onClick={handleClicked}>
                {img}
            </div>
        </>
    );
}

export default Block