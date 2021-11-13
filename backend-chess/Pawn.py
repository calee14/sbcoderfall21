import pygame
from Piece import Piece


class Pawn(Piece):
    def __init__(self, color, pos):
        super().__init__(color, color + "p.png", pos)


    # TODO: list the movement options of a pawn
    def show_movement(self):
        i, j = super().translate_pos_matrix()
        print(i)
        print(j)
        if self.color == "w":
            super().possibleMoves.append((i-1, j))
            if i == 7:
                # highlight the first two squares in front
                super().possibleMoves.append((i-2, j))
        elif self.color == "b":
            pass