import pygame
from Piece import Piece


class Rook(Piece):
    def __init__(self, color, pos):
        super().__init__(color, color + "r.png", pos)


    # TODO: list the movement options of a rook
    def show_movement(self):
        arr = []


