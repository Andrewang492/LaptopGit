from random import random
import math
from grid2048 import grid
        

def main():
    gridObj = grid()
    while True:
        print(gridObj)
        wasd:str = input("(Ctrl+C to exit) Enter WASD: ") 
        wasd.lower()
        if gridObj.set_move(wasd) is False: # this will try do the move
            print("invalid input - Type wasd, and read rules (your input did not change game)")
        else:
            gridObj.set_new()
            
            try:
                gridObj.set_is_game_over()
            except:
                print(gridObj)
                print("game over")
                break
        
if __name__ == '__main__':
    main()