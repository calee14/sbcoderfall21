import pygame
from Piece import Piece


class Knight(Piece):
    def __init__(self, color, pos):
        super().__init__(color, color + "n.png", pos)


    # TODO: list the movement options of a knight
    def show_movement(self):
        arr = []


