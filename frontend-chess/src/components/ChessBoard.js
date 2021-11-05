import React from 'react'
import Block from './Block'
import Square from './Square';
import { useState } from 'react';
import Bishop from './ChessPieces/Bishop';
import Rook from './ChessPieces/Rook';
import King from './ChessPieces/King';
import Knight from './ChessPieces/Knight';
import Pawn from './ChessPieces/Pawn';
import Queen from './ChessPieces/Queen';
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
    board[0][6].addPiece(new Knight(AI_color, [0,6], bk));
    board[0][7].addPiece(new Rook(AI_color, [0,7], br));
    for(var i=0;i<8;i++) {
        board[1][i].addPiece(new Pawn(AI_color, [0, i], bp));
    }

    board[7][0].addPiece(new Rook(player_color, [7,0], wr));
    board[7][1].addPiece(new Knight(player_color, [7,1], wn));
    board[7][2].addPiece(new Bishop(player_color, [7,2], wb));
    board[7][3].addPiece(new Queen(player_color, [7,3], wq));
    board[7][4].addPiece(new King(player_color, [7,4], wk));
    board[7][5].addPiece(new Bishop(player_color, [7,5], wb));
    board[7][6].addPiece(new Knight(player_color, [7,6], wk));
    board[7][7].addPiece(new Rook(player_color, [7,7], wr));
    for(var i=0;i<8;i++) {
        board[6][i].addPiece(new Pawn(player_color, [0, i], wp));
    }

    return board;
}

function ChessBoard(props) {

    var initBoard = []; 
    
    initBoard = initializeBoard(initBoard);

    const [board, setBoard] = useState(initBoard);
    
    for(var i=0;i<8;i++) {
        for(var j=0;j<8;j++) {
            console.log(board[i][j].pieceType);
        }
    }

    return (
    <>
        <div className="board-container">
            <div className="chess-board">
                { board.map((row) => row.map((square) => <Block key={square.pos} square={square}/>)) }
            </div>
        </div>
    </>
    );
}

export default ChessBoard