import pygame
from PIL import Image

class Piece():
    def __init__(self, color, name, pos):
        self.DIM = 700
        self.BORDER = 5
        self.color = color
        self.name = name
        self.pos = pos
        self.resize()


    def resize(self):
        piece = Image.open(self.name)
        piece = piece.resize(((int)(self.DIM / 8), (int)(self.DIM / 8)), Image.ANTIALIAS)
        piece.save(fp= self.name)

    def load(self, screen):
        screen.blit(pygame.image.load(self.name), self.translate_pos_coord())

    # turn chess coord notation (e.g. "e4") into a coordinate index
    def translate_pos_coord(self):
        if len(self.pos) != 2:
            return (0, 0)
        letter = self.pos[0]
        number = self.pos[1]
        j = ord(letter) - 97
        i = 8 - (ord(number) - 48)
        return (self.DIM/8 * j + self.BORDER, self.DIM/8 * i + self.BORDER)

    # turn chess coord notation (e.g. "e4") into an array index
    def translate_pos_matrix(self):
        i = 8 - (ord(self.pos[1]) - 48)
        j = ord(self.pos[0]) - 97
        return i, j

    # TODO write algorithm
    def show_movement(self):
        pass
