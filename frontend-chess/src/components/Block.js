import './ChessBoard.css'

function Block(props) {
    const { square } = props;

    var img;
    if(square.pieceType != null) {
        img = <img className="selectDisable" alt="" src={square.pieceType.imgURL} width={80} height={80}></img>
    } else {
        img = <div></div>
    }

    // ${square.getAttackedByWhite() == true ? 'r' : ''}

    return (
        <>
            <div className={`board-block ${square.getHasKingChecked() === true ? 'r' : `${square.getSquareColor()}`}`}>
                {img}
                {square.moveableSquare === true ? <div className="tiny-circle"></div> : null}
            </div>
            
        </>
    );
}

export default Block