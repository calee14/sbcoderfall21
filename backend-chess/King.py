import pygame
from Piece import Piece


class King(Piece):
    def __init__(self, color, pos):
        super().__init__(color, color + "k.png", pos)


    # TODO: list the movement options of a king
    def show_movement(self):
        arr = []


