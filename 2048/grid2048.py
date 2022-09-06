from random import random
from functools import reduce 
from typing import List
# failing grid = [[4096,2048,1024,16],[8,0,0,0],[16,64,256,128],[32,128,32,16]]

def get_random_empty_position(grid):
    #get empty positions. If not got any, return None.
    possible_coords = []
    for i in range(len(grid)):
        for j in range(len(grid)):
            if grid[i][j] == 0:
                possible_coords.append((i,j))
    if possible_coords == []:
        raise Exception("should be game over") # fail.

    i = round(random()*(len(possible_coords) - 1)) #eg 2 items, could be 0 or 1. our index.
    return possible_coords[i]

def generate_new():
    return round(random())*2 + 2

def insert_new(grid):
    # tries to put new number into grid after turn. If fail, returns None.
    num = generate_new()
    pos = get_random_empty_position(grid)
    grid[pos[0]][pos[1]] = num
    # dont need to return new grid since its referencing it.

def initialise_grid():
    size = 4
    grid = []  

    for i in range(size):
        row = []
        for j in range(size):
            row.append(0)
        grid.append(row)
    #grid = [[4096,2048,1024,16],[8,0,0,0],[16,64,256,128],[32,128,32,16]]
    insert_new(grid)
    insert_new(grid)
    return grid


def condense_left(row:List) -> List:
    new = list(filter(lambda x: x != 0,row))
    while len(new) < len(row): 
        new.append(0)  
    return new

def shift_left(row:List) ->List:
    new = row.copy()
    new = condense_left(row)
    for i in range(len(new)-1):
        a = new[i]
        b = new[i+1]
        if a == b & a != 0:
            new[i] = a*2
            new[i+1] = 0

    new = condense_left(new)   
    return new

def shift_right(row:List)->List:
    new = row.copy()
    new.reverse()
    new = shift_left(new)
    new.reverse()
    return new

def has_adjacents(row:List):
    #check there are adjacents for a given row.
    for i in range(len(row) - 1):
        a = row[i]
        b = row[i+1]
        if a == b & a != 0: #not used in context with any 0's anyway.
            return True
    return False

def transpose(grid:List[List[int]])->List[List[int]]:
    # return columns as array of rows, first item is topmost of returned array.
    columns_list = []
    for i in range(len(grid)):
        column_i = list(map(lambda row: row[i], grid)) #does not change original array.
        columns_list.append(column_i)
    if columns_list == []:
        raise Exception("fail tranpose")
    return columns_list

def check_digits(grid:List[List])->int:
    maxi = 0
    for row in grid:
        rowmax = max(row)
        if rowmax > maxi:
            maxi = rowmax
    return len(str(maxi))
# __________________________________________
class grid:
    def __init__(self):
        self.grid = initialise_grid()
        self.grid_t = transpose(self.grid) #surely this runs after the first.
        self.digits = 1
        #self.is_game_over = False 

    def __str__(self) -> str:
        out = ''
        digits = self.digits
        for row in self.grid:
            for num in row:
                if num == 0:
                    out += f'[{" ":<{digits}}]'
                else:
                    out += f"[{num:<{digits}}]"
            out += '\n'
        out = out[0:-1]
        return out

    def set_new(self):
        insert_new(self.grid)
        self.grid_t = transpose(self.grid)

    def set_move(self, wasd:str):
        # return false if cant do it - because of input, or because no effect.

        start_grid = self.grid.copy()
        if wasd == 'w':
            self.grid_t = list(map(lambda col: shift_left(col), self.grid_t))
            self.grid = transpose(self.grid_t)
        elif wasd == 'a':
            self.grid = list(map(lambda row: shift_left(row), self.grid))
            self.grid_t = transpose(self.grid)
        elif wasd == 's':
            self.grid_t = list(map(lambda col: shift_right(col), self.grid_t))
            self.grid = transpose(self.grid_t)       
        elif wasd == 'd':
            self.grid = list(map(lambda row: shift_right(row), self.grid))
            self.grid_t = transpose(self.grid)
        else:
            return False

        self.digits = check_digits(self.grid)

        if start_grid == self.grid:
            return False
        return True   

    def set_is_game_over(self):
        for row in self.grid: #if theres a zero, false (not full.)
            for i in row:
                if i == 0:
                    return False    
        #if its full, only playable if theres adjacents.
        for row in self.grid: 
            if has_adjacents(row):
                return False
        for col in self.grid_t: 
            if has_adjacents(col):
                return False
        # game over if there are no adjacents.
        raise Exception("Game shoudl be over by method")







