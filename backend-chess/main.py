import pygame
from Piece import Piece
from Board import Board
from Knight import Knight
from Pawn import Pawn
from King import King
from Bishop import Bishop
from Rook import Rook
from Queen import Queen
from PIL import Image
import sys

pygame.init()
board = Board(700, 5, "chess_board.png")
DIM = board.DIM
screen = pygame.display.set_mode((DIM + 2 * board.BORDER, DIM + 2 * board.BORDER))

def board_load():
    board.load(screen)

#loads the pieces onto the board (TODO: move to Board.py)
def opening_load():
    pieces = [
        Rook("w", "a1"),
        Knight("w", "b1"),
        Bishop("w", "c1"),
        Queen("w", "d1"),
        King("w", "e1"),
        Bishop("w", "f1"),
        Knight("w", "g1"),
        Rook("w", "h1"),
        Rook("b", "a8"),
        Knight("b", "b8"),
        Bishop("b", "c8"),
        Queen("b", "d8"),
        King("b", "e8"),
        Bishop("b", "f8"),
        Knight("b", "g8"),
        Rook("b", "h8")
    ]
    pieces += [Pawn("w", (chr(i + 97) + "2")) for i in range(8)]
    pieces += [Pawn("b", (chr(i + 97) + "7")) for i in range(8)]
    for piece in pieces:
        piece.load(screen)

def main():
    # pygame runtime
    clock = pygame.time.Clock()
    while True:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                return

            board_load()
            opening_load()
            x, y = board.get_mouse_square()
            board.highlight_mouse_square(x, y, screen)
            pygame.display.flip()
            clock.tick(60)
if __name__ == '__main__':
    main()