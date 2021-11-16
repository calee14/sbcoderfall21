import React, { useEffect, Component } from 'react'
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

    // intializes a 2d array of the chess board with pieces
    for(var i=0;i<8;i++) {
        var row = [];
        for(var j=0;j<8;j++) {
            if(i%2==0) {
                var color = (j % 2 == 0) ? 'w' : 'b';
            } else {
                var color = (j % 2 == 1) ? 'w' : 'b';
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
    for(var i=0;i<8;i++) {
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
    for(var i=0;i<8;i++) {
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
            if(piece == null) { continue; }
            if(piece.getPieceColor() == color) {
                const pos = piece.getAttackPos(board, (piece.getPieceColor() == 'w'));
                attackPos.push(...pos);
            }
        }
    }
    // remove the duplicate positions
    attackPos = attackPos.filter(function(item, pos) {
        return attackPos.indexOf(item) == pos;
    })
    return attackPos;
}

function setAllAttackPosForColor(board, attackPos, color) {
    for(var i=0;i<attackPos.length;i++) {
        const pos = attackPos[i];
        console.log(pos)
        if(color == 'w') {
            board[pos[0]][pos[1]].setAttackedByWhite(true);
        } else if(color == 'b') {
            board[pos[0]][pos[1]].setAttackedByBlack(true);
        }
    }
}

function clearAllAttackPos(board) {
    for(var row=0;row<8;row++) {
        for(var col=0;col<8;col++) {
            const square = board[row][col]
            square.setAttackedByBlack(false);
            square.setAttackedByWhite(false);
        }
    }
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
    const [orgPosition, setOrgPosition] = useState([0, 0])
    
    
    function handleMouseUp(e) {
        var pos = getPosOfPiece(e);
        console.log('pos we logging', pos)
        if(pos == [-1, -1]) { // attempt to move piece failed and won't be processed
            board[orgPosition[0]][orgPosition[1]].addPiece(heldPiece);
        } else if(heldPiece != null) { // complete an valid movement of a piece
            board[pos[0]][pos[1]].addPiece(heldPiece) // place the piece onto the board
            console.log('pos before log', pos)
            board[pos[0]][pos[1]].getPieceType().addMoveHistory(pos) // add the pos to the move history and set the new piece's pos
            
            clearMovementOptions(board);

            const whiteAttackPos = getAllAttackPosForColor(board, 'w');
            const blackAttackPos = getAllAttackPosForColor(board, 'b')
            clearAllAttackPos(board); // clear all attack pos before updating them
            setAllAttackPosForColor(board, whiteAttackPos, 'w'); // update the attack pos for both piece colors
            setAllAttackPosForColor(board, blackAttackPos, 'b');
        }
        console.log(getPosOfPiece(e), "end");
        setMouseState(MOUSESTATE.NOPRESS)
        setHeldPiece(null);
    }

    function handleMouseLeave(e) {
        switch(mouseState) {
            case MOUSESTATE.PRESSDOWN:
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
            const pieceSelected = board[row][col].getPieceType();
            const moveOptions = pieceSelected.getMovementOptions(board, (pieceSelected.getPieceColor() == 'w'));
            console.log(moveOptions);
            for(var i=0;i<moveOptions.length;i++) {
                const pos = moveOptions[i];
                board[pos[0]][pos[1]].setMoveableSquare(true);
            }
            setHeldPiece(board[row][col].getPieceType());
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
                { heldPiece ? <TempPiece mousePos={mousePos} piece={heldPiece}/> : null}
            </div>
        </div>
    </>
    );
}

export default ChessBoard