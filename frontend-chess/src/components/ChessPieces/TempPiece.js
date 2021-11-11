import React from "react";

function TempPiece(props) {
    const {mousePos, piece} = props;
    console.log(`${mousePos}`)
    
    const mouseStyle = {
        position: 'absolute',
        top: mousePos.y-40,
        left: mousePos.x-40,
    }
    return (
        <>
            <div className={`chess-piece-temp selectDisable`} style={mouseStyle}>
                <img className="selectDisable" src={piece.imgURL} width={80} height={80}></img>
            </div>
        </>
    );
}

export default TempPiece;