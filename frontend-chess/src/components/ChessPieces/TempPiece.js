import React from "react";

function TempPiece(props) {
    const {mousePos, piece} = props;
    
    const mouseStyle = {
        position: 'absolute',
        top: mousePos.y-40,
        left: mousePos.x-40,
    }
    return (
        <>
            <div className={`chess-piece-temp selectDisable`} style={mouseStyle}>
                <img className="selectDisable" alt="" src={piece.imgURL} width={80} height={80}></img>
            </div>
        </>
    );
}

export default TempPiece;