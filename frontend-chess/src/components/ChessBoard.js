import React from 'react'
import Block from './Block'
import Piece from './Piece';
import { useState } from 'react';
import './ChessBoard.css'

function ChessBoard(props) {

    var initBoard = [];
    for(var i=0;i<8;i++) {
        var row = [];
        for(var j=0;j<8;j++) {
            if(i%2==0) {
                var color = (j % 2 == 0) ? 'white' : 'black';
            } else {
                var color = (j % 2 == 1) ? 'white' : 'black';
            }
            
            row.push(new Piece(color, null, [i, j]));
        }
        initBoard.push(row);
    }

    const [board, setBoard] = useState(initBoard);
    
    console.log(board)
    for(var i=0;i<8;i++) {
        for(var j=0;j<8;j++) {
            console.log(board[i][j].color);
        }
    }

    return (
    <>
        <div className="board-container">
            <div className="chess-board">
                { board.map((row) => row.map((piece) => <Block key={piece.pos} piece={piece}/>)) }
            </div>
        </div>
    </>
    );
}

export default ChessBoard