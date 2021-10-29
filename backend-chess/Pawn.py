import pygame
from Piece import Piece


class Pawn(Piece):
    def __init__(self, color, pos):
        super().__init__(color, color + "p.png", pos)


    # TODO: list the movement options of a pawn
    def show_movement(self):
        arr = []


