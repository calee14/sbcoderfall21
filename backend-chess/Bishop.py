import pygame
from Piece import Piece


class Bishop(Piece):
    def __init__(self, color, pos):
        super().__init__(color, color + "b.png", pos)


    # TODO: list the movement options of a bishop
    def show_movement(self):
        arr = []


