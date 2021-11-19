import React, { useEffect } from 'react'
import Block from './Block'
import Square from './Square';
import { useState } from 'react';
import Bishop from './ChessPieces/Bishop';
import Rook from './ChessPieces/Rook';
import King from './ChessPieces/King';
import Knight from './ChessPieces/Knight';
import Pawn from './ChessPieces/Pawn';
import Queen from './ChessPieces/Queen';
import TempPiece from './ChessPieces/TempPiece';
import bb from './ChessImages/bb.png';
import bk from './ChessImages/bk.png';
import bn from './ChessImages/bn.png';
import bp from './ChessImages/bp.png';
import bq from './ChessImages/bq.png';
import br from './ChessImages/br.png';
import wb from './ChessImages/wb.png';
import wk from './ChessImages/wk.png';
import wn from './ChessImages/wn.png';
import wp from './ChessImages/wp.png';
import wq from './ChessImages/wq.png';
import wr from './ChessImages/wr.png';

function initializeBoard(board) {
    /* 
    Param:
        board: Array[Array[Square]]
    Return:
        board: Array[Array[Square]] 
    */

    const AI_color = 'b';
    const player_color = 'w';
    var i = 0; // init i index counter for the for loops
    
    // intializes a 2d array of the chess board with pieces
    for(i=0;i<8;i++) {
        var row = [];
        for(var j=0;j<8;j++) {
            if(i%2===0) {
                var color = (j % 2 === 0) ? 'w' : 'b';
            } else {
                color = (j % 2 === 1) ? 'w' : 'b';
            }
            
            row.push(new Square(color, null, [i, j]));
        }
        board.push(row);
    }
    board[0][1].addPiece(new Knight(AI_color, [0,1], bn));
    board[0][0].addPiece(new Rook(AI_color, [0,0], br));
    board[0][2].addPiece(new Bishop(AI_color, [0,2], bb));
    board[0][3].addPiece(new Queen(AI_color, [0,3], bq));
    board[0][4].addPiece(new King(AI_color, [0,4], bk));
    board[0][5].addPiece(new Bishop(AI_color, [0,5], bb));
    board[0][6].addPiece(new Knight(AI_color, [0,6], bn));
    board[0][7].addPiece(new Rook(AI_color, [0,7], br));
    for(i=0;i<8;i++) {
        board[1][i].addPiece(new Pawn(AI_color, [1, i], bp));
    }

    board[7][0].addPiece(new Rook(player_color, [7,0], wr));
    board[7][1].addPiece(new Knight(player_color, [7,1], wn));
    board[7][2].addPiece(new Bishop(player_color, [7,2], wb));
    board[7][3].addPiece(new Queen(player_color, [7,3], wq));
    board[7][4].addPiece(new King(player_color, [7,4], wk));
    board[7][5].addPiece(new Bishop(player_color, [7,5], wb));
    board[7][6].addPiece(new Knight(player_color, [7,6], wn));
    board[7][7].addPiece(new Rook(player_color, [7,7], wr));
    for(i=0;i<8;i++) {
        board[6][i].addPiece(new Pawn(player_color, [6, i], wp));
    }

    return board;
}


function getPosOfPiece(e) {
    var x = e.nativeEvent.offsetX - 5; // - 5 for the border offset
    var y = e.nativeEvent.offsetY - 5;
    if(x < 0 || x >= 680 || y < 0 || y >= 680) { return [-1, -1]; } // ignore clicks outside boundaries of the board
    const row = Math.floor(y / 85); // x is the col side
    const col = Math.floor(x / 85);
    return [row, col];
}

function clearMovementOptions(board) {
    for(var i=0;i<8;i++) {
        for(var j=0;j<8;j++) {
            board[i][j].setMoveableSquare(false);
        }
    }
}

function getAllAttackPosForColor(board, color) {
    var attackPos = []
    for(var row=0;row<8;row++) {
        for(var col=0;col<8;col++) {
            const piece = board[row][col].getPieceType();
            if(piece === null) { continue; }
            if(piece.getPieceColor() === color) {
                const pos = piece.getAttackPos(board, (piece.getPieceColor() === 'w'));
                attackPos.push(...pos);
            }
        }
    }
    // remove the duplicate positions
    attackPos = attackPos.filter(function(item, pos) {
        return attackPos.indexOf(item) === pos;
    })
    return attackPos;
}

function setAllAttackPosForColor(board, attackPos, color) {
    for(var i=0;i<attackPos.length;i++) {
        const pos = attackPos[i];
        if(color === 'w') {
            board[pos[0]][pos[1]].setAttackedByWhite(true);
        } else if(color === 'b') {
            board[pos[0]][pos[1]].setAttackedByBlack(true);
        }
    }
}

function clearAllBoardStatus(board) {
    for(var row=0;row<8;row++) {
        for(var col=0;col<8;col++) {
            const square = board[row][col]
            square.setAttackedByBlack(false);
            square.setAttackedByWhite(false);
            square.setHasKingChecked(false);
        }
    }
}

function findChecksForColor(board, pos, color) {
    /*
        Parameters:
            pos - Array[] of attack position for a certain color
            color - string of King color that the attack positions are checking
        Returns:
            pos - Array[2] pos of checked king
     */
    for(var i=0;i<pos.length;i++) {
        const p = pos[i];
        const piece = board[p[0]][p[1]].getPieceType()
        if(piece == null) { continue; }
        if(piece.constructor.name === "King" && piece.getPieceColor() === color) { // the attacks have checked enemy king
            return piece.getPos();
        }
    }
    return [];
}

function getMeme(piece) {
    var memeImgs = ['https://images.chesscomfiles.com/uploads/v1/images_users/tiny_mce/Xhive24/php3w9lbt.jpeg', piece.getImage(), 'https://preview.redd.it/2q5ybq3nfeh41.jpg?auto=webp&s=2ae344d6dab55af21d44e1813e2542a9a1a456c0', 'https://images.chesscomfiles.com/uploads/v1/images_users/tiny_mce/PedroPinhata/phpqGmKAs.png', 'https://images.chesscomfiles.com/uploads/v1/images_users/tiny_mce/PedroPinhata/phpfpQiuI.png', 'https://images.chesscomfiles.com/uploads/v1/images_users/tiny_mce/PedroPinhata/phpu8o1eM.jpeg', 'https://images.chesscomfiles.com/proxy/img.memecdn.com/i-heard-chess-memes-are-the-new-meta_o_3377699725002209/https/70880214af.jpg', 'https://images.chesscomfiles.com/uploads/v1/images_users/tiny_mce/Ritesh_ratn/phpYaMNsS.jpeg', 'https://pics.me.me/transcending-normy-chess-39654795.png']
    var randIdx = Math.floor( Math.random() * memeImgs.length );
    return memeImgs[randIdx];
}

function ChessBoard(props) {

    var initBoard = []; 
    
    initBoard = initializeBoard(initBoard);

    const MOUSESTATE = {
        PRESSDOWN: "pressdown", // The user has pressed down on the board
        NOPRESS: "nopress", // not pressing the mouse
    }

    const [board, setBoard] = useState(initBoard);
    const [mousePos, setMousePos] = useState({x: 0, y: 0});
    const [mouseState, setMouseState] = useState(MOUSESTATE.NOPRESS);
    const [heldPiece, setHeldPiece] = useState(null);
    const [orgPosition, setOrgPosition] = useState([0, 0]);
    const [memeImg, setMemeImg] = useState('');
    
    
    function handleMouseUp(e) {
        var pos = getPosOfPiece(e);
        console.log('pos we logging', pos)
        if(pos === [-1, -1]) { // attempt to move piece failed and won't be processed
            board[orgPosition[0]][orgPosition[1]].addPiece(heldPiece);
        } else if(heldPiece !== null) { // complete an valid movement of a piece
            // add the piece to the board and add to its history
            board[pos[0]][pos[1]].addPiece(heldPiece) // place the piece onto the board
            console.log('pos before log', pos)
            board[pos[0]][pos[1]].getPieceType().addMoveHistory(pos) // add the pos to the move history and set the new piece's pos
            
            clearMovementOptions(board); // clear the board

            const whiteAttackPos = getAllAttackPosForColor(board, 'w');
            const blackAttackPos = getAllAttackPosForColor(board, 'b')
            clearAllBoardStatus(board); // clear all board status (attack and checks) before updating them
            setAllAttackPosForColor(board, whiteAttackPos, 'w'); // update the attack pos for both piece colors
            setAllAttackPosForColor(board, blackAttackPos, 'b');

            // find checks for white and black king
            if(heldPiece.getPieceColor() === 'w') {
                if(findChecksForColor(board, blackAttackPos, 'w').length > 0) { // reset the board if enemey can check king if move piece
                    board[orgPosition[0]][orgPosition[1]].addPiece(heldPiece);
                    board[pos[0]][pos[1]].removePiece();
                } else {
                    var kingPos = findChecksForColor(board, whiteAttackPos, 'b');
                    if(kingPos.length > 0) {
                        board[kingPos[0]][kingPos[1]].setHasKingChecked(true);
                    }
                }
            } else if(heldPiece.getPieceColor() === 'b') {
                if(findChecksForColor(board, whiteAttackPos, 'b').length > 0) {
                    board[orgPosition[0]][orgPosition[1]].addPiece(heldPiece);
                    board[pos[0]][pos[1]].removePiece()
                }
                kingPos = findChecksForColor(board, blackAttackPos, 'w');
                if(kingPos.length > 0) {
                    board[kingPos[0]][kingPos[1]].setHasKingChecked(true);
                }
            } 
            
        }
        console.log(getPosOfPiece(e), "end");
        setMouseState(MOUSESTATE.NOPRESS)
        setHeldPiece(null);
    }

    function handleMouseLeave(e) {
        switch(mouseState) {
            case MOUSESTATE.PRESSDOWN: // cancel the attempt to move piece and reset
                board[orgPosition[0]][orgPosition[1]].addPiece(heldPiece);
                console.log(getPosOfPiece(e), "end");
                setMouseState(MOUSESTATE.NOPRESS)
                setHeldPiece(null);
                clearMovementOptions(board);
                break;
            default:
                break;
        }
        
    }

    function handleMouseDrag(e) {
        switch(mouseState) {
            case MOUSESTATE.PRESSDOWN:
                setMousePos({x: e.nativeEvent.clientX, y: e.nativeEvent.clientY});
                break;
            default:
                break;
        }
    }

    function handleMouseEnter(e) {
        const [row, col] = getPosOfPiece(e);
        if(board[row][col].getPieceType()) { // grabbed a piece
            const pieceSelected = board[row][col].getPieceType(); // get the piece selected 
            
            // find all move options for the piece
            const moveOptions = pieceSelected.getMovementOptions(board, (pieceSelected.getPieceColor() === 'w'));
            for(var i=0;i<moveOptions.length;i++) {
                const pos = moveOptions[i];
                board[pos[0]][pos[1]].setMoveableSquare(true);
            }

            // handle chess grab mechanics
            setHeldPiece(board[row][col].getPieceType());
            setMemeImg(getMeme(board[row][col].getPieceType()));
            setOrgPosition([row, col]);
            board[row][col].removePiece();
        }
        setMousePos({x: e.nativeEvent.clientX, y: e.nativeEvent.clientY});
        setMouseState(MOUSESTATE.PRESSDOWN);
    }

    return (
    <>
        <div className="board-container">
            <br/>
            <br/>
            <div className="chess-board" onMouseLeave={handleMouseLeave} onMouseDown={handleMouseEnter} onMouseMove={handleMouseDrag} onMouseUp={handleMouseUp}>
                { board.map((row) => row.map((square) => <Block key={square.pos} square={square}/> )) }
                { heldPiece ? <TempPiece mousePos={mousePos} piece={heldPiece} imgLink={memeImg}/> : null}
            </div>
        </div>
    </>
    );
}

export default ChessBoard