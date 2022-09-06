from grid2048 import shift_left, shift_right, transpose


test_rows = [[0,2,0,2],[2,2,2,2],[2,0,2,2],[0,0,0,0],[0,0,2,2],[0,2,2,0],[2,4,2,0],[2,2,4,0],[4,2,2,4],[2,4,8,16]]

def test_shift_left():
    print("shift_left_________________:")
    result = list(map(lambda x: shift_left(x), test_rows))
    for answer in result:
        print(answer)

def test_shift_right():
    print("shift_right_________________:")
    result = list(map(lambda x: shift_right(x), test_rows))
    for answer in result:
        print(answer)

def test_transpose(grid):
    columns = transpose(grid)
    print(columns)
    print(transpose(columns))

if __name__ == '__main__':
    test_shift_left()
    test_shift_right()
    test_transpose([[0,2,0,2],[2,2,2,2],[2,0,2,2],[0,0,0,0]])