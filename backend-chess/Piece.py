import pygame
from PIL import Image
import Board

class Piece():
    board = Board.Board(700, 5, "chess_board.png")
    def __init__(self, color, name, pos):
        self.color = color
        self.name = name
        self.pos = self.translate_pos(pos)
        self.resize()


    def resize(self):
        piece = Image.open(self.name)
        piece = piece.resize(((int)(self.board.DIM / 8), (int)(self.board.DIM / 8)), Image.ANTIALIAS)
        piece.save(fp= self.name)

    def load(self, screen):
        screen.blit(pygame.image.load(self.name), self.pos)

    # turn chess coord notation (e.g. "e4") into an array index
    def translate_pos(self, pos):
        if len(pos) != 2:
            return (0, 0)
        letter = pos[0]
        number = pos[1]
        j = ord(letter) - 97
        i = 8 - (ord(number) - 48)
        return (self.board.DIM/8 * j + self.board.BORDER, self.board.DIM/8 * i + self.board.BORDER)
    # TODO write algorithm
    def show_movement(self):
        pass
