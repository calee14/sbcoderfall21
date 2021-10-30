import pygame
from Piece import Piece
from PIL import Image

class Board:
    def __init__(self, dim, border, name):
        self.DIM = dim
        self.BORDER = border
        self.name = name
        self.resize()
        self.pieces = [[None]*8 for i in range(8)]

    def resize(self):
        import_board = Image.open(self.name)
        import_board = import_board.resize((self.DIM, self.DIM), Image.ANTIALIAS)
        import_board.save(fp= self.name)

    def load(self, screen):
        screen.blit(pygame.image.load(self.name), (self.BORDER, self.BORDER))

    def get_mouse_square(self):
        mouse = pygame.Vector2(pygame.mouse.get_pos()) - (self.BORDER, self.BORDER)
        x, y = [int(v // (self.DIM / 8)) for v in mouse]
        try:
            if x >= 0 and y >= 0:
                return (x, y)
        except IndexError:
            pass
        return None, None

    def highlight_mouse_square(self, x, y, screen):
        if (x != None):
            rect = (self.BORDER + x*self.DIM/8, self.BORDER + y*self.DIM/8, self.DIM/8, self.DIM/8)
            pygame.draw.rect(screen, (255, 0, 0, 50), rect, 2)

    def print_board(self):
        print(self.pieces)

    # @param Piece object and chess notation position (string)
    def add_piece(self, screen, piece):
        x, y = piece.translate_pos_matrix()
        self.pieces[x][y] = piece
        piece.load(screen)


