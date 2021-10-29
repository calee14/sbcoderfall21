import pygame
from PIL import Image

class Board:
    def __init__(self, dim, border, name):
        self.DIM = dim
        self.BORDER = border
        self.name = name
        self.resize()

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




