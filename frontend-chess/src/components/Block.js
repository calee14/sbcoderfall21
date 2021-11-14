import React, { useState } from "react";
import './ChessBoard.css'

function Block(props) {
    const {square, getMousePos} = props;
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
        img = <img className="selectDisable" src={square.pieceType.imgURL} width={80} height={80}></img>
    } else {
        img = <img></img>
    }

    return (
        <>
            <div className={`board-block ${square.squareColor}`}>
                {img}
                {square.moveableSquare == true ? <div className="tiny-circle"></div> : null}
            </div>
            
        </>
    );
}

export default Block