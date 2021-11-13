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
    board.add_piece(screen, Rook("w", "a1"))
    board.add_piece(screen, Knight("w", "b1"))
    board.add_piece(screen, Bishop("w", "c1"))
    board.add_piece(screen, Queen("w", "d1"))
    board.add_piece(screen, King("w", "e1"))
    for i in range (8):
        board.add_piece(screen, Pawn("w", (chr(i + 97) + "2" )))
        board.add_piece(screen, Pawn("b", (chr(i + 97) + "7" )))


def main():
    # pygame runtime
    clock = pygame.time.Clock()
    while True:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                return
            board_load()
            opening_load()
            if event.type == pygame.MOUSEBUTTONDOWN:
                print ("down")
                x, y = board.get_mouse_square()
                clickedPiece = board.getPiece(y, x)
                clickedPiece.show_movement()
                # highlight current clicked square, if there is a piece
                # highlight options for clicked square, if there is a piece
                # track image to mouse position
                pass
            if event.type == pygame.MOUSEBUTTONUP:
                print ("up")
                # update board to have the new piece in the position indicated, if legal
                pass

            else:
                x, y = board.get_mouse_square()
                board.highlight_mouse_square(x, y, screen)
            pygame.display.flip()
            clock.tick(60)
if __name__ == '__main__':
    main()
    # board.print_board()
