import React from "react";

function TempPiece(props) {
    const {mousePos, piece} = props;
    console.log(`${mousePos}`)
    
    const mouseStyle = {
        position: 'absolute',
        top: mousePos.y,
        left: mousePos.x,
    }
    return (
        <>
            <div className={`chess-piece-temp`} style={mouseStyle}>
                <img className="selectDisable" src={piece.imgURL} width={80} height={80}></img>
            </div>
        </>
    );
}

export default TempPiece;