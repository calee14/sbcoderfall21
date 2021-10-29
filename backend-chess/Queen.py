import pygame
from Piece import Piece


class Queen(Piece):
    def __init__(self, color, pos):
        super().__init__(color, color + "q.png", pos)


    # TODO: list the movement options of a queen
    def show_movement(self):
        arr = []


