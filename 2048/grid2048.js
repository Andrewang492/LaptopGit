// up down left right 
// 38  40   37   39
const UP = 38
const DOWN = 40
const LEFT = 37
const RIGHT = 39

function new_grid (size) {
    let grid = [];

    for (let i = 0;i < size ;i++ ) {
            let row = [];
            for (let j= 0;j < size ;j++ ) {
                row.push(0);
            }
            grid.push(row);
    }

    //grid = [[4096,2048,1024,16],[8,0,0,0],[16,64,256,128],[32,128,32,16]]
    insert_new(grid);
    insert_new(grid);
    return grid
}

function print_grid (grid) {
    let outputstring = '';
    while (true) {
        //print
        for (let i = 0; i < grid.length; i++){
            for (let j = 0; j < grid.length; j++) {
                outputstring += `${grid[i][j]} `;
            }
            outputstring += '\n';
        }
        break;
    }
    console.log(outputstring);
}

function insert_new (grid) {
    let num = generate_new();
    let pos = get_random_empty_position(grid);
    grid[pos[0]][pos[1]] = num;
}

function generate_new() {
    return Math.floor(Math.random()*2) * 2 + 2;
}

function get_random_empty_position(grid) {
    let possible_coords = [];
    for (let i = 0;i < grid.length ;i++ ) {
        for (let j = 0;j < grid.length ;j++ ) {
            if (grid[i][j] == 0) {
                possible_coords.push([i,j]);
            }
        }
    }

    if (possible_coords.length == 0) {
        console.log("Problem");
        return [];
    }

    let i = Math.floor(Math.random() * possible_coords.length ); // if is 1, get 0. If is 2, 2 choices ...
    return possible_coords[i];
}

function condense_left(row) {
    function checkNonZero(x) {return x != 0;}
    
    let newlist = row.filter(checkNonZero);
    while (row.length > newlist.length)  {
        newlist.push(0);
    }
    return newlist;
}

function shift_left(row) {
    //let newlist = [...row]
    let newlist = condense_left(row)

    for (let i = 0; i < newlist.length; i++) {
        let a = newlist[i];
        let b = newlist[i+1];
        if (a == b && a != 0) {
            // If you are going to cause a swap, the left item will not be seen again in the loop.
            // the right item turns to 0 to stop it from combinining again too.
            newlist[i] = a * 2;
            newlist[i+1] = 0;
        }
    }
    newlist = condense_left(newlist);

    return newlist;
}
    
function shift_right(row) {
    let newlist = [...row];
    newlist.reverse();
    newlist = shift_left(newlist);
    newlist.reverse();
    return newlist;
}

function has_adjacents(row){
    // check there are adjacents for a given row.
    for (let i = 0; i < row.length; i++){
        const a = row[i];
        const b = row[i+1];
        if (a == b && a != 0){
            return true;
        } //not used in context with any 0's anyway.
    }
    return false;
}

function transpose(grid){
    //return columns as array of rows, first item is topmost of returned array.
    let columns_list = [];

    for (let i = 0; i < grid.length; i++){
        let column_i = [];
        for (let j = 0; j < grid.length; j++){
            column_i.push(grid[j][i]);
        }
        columns_list.push(column_i);
    }

    if (columns_list.length == 0){
        console.log("fail transpose")
    }

    return columns_list
}

function check_digits(grid) {
    let maxi = 0
  
    for(let i = 0; i < grid.length; i++) {
        let rowmax = Math.max.apply(Math, grid[i])
        if (rowmax > maxi) {
            maxi = rowmax;
        }
    }
    return Math.floor(Math.log10(maxi)) + 1
}

function AreGridsEqual(grid1, grid2) {
    for (let row = 0; row < grid1.length; row++) {
        for (let col = 0; col < grid1.length; col++) {
            if (grid1[row][col] != grid2[row][col]){
                return false;
            }
        }
    }
    return true;
}

class gridclass {
    constructor(size) {
        this.grid = new_grid(size);
        this.grid_t = transpose(this.grid);
        this.digits = 1;
        this.size = size;
    }

    print() {
        //print_grid(this.grid);
        let out = '';
        const digits = this.digits + 1;
        const grid = this.grid;
        for (let row = 0; row < grid.length; row++) {
            for (let i = 0; i < grid.length; i++) {
                const rowInstance = grid[row];
                if (rowInstance[i] == 0) {
                    out = out.concat( "_".padStart(digits, " "));
                } else {
                    out = out.concat( String(rowInstance[i]).padStart(digits, " "));
                }
            }
            out = out.concat("\n");
        }
        console.log(out);
        return;
    }

    set_new() {
        insert_new(this.grid);
        this.grid_t = transpose(this.grid);
    }

    set_move(inputcode){
        const start_grid = this.grid.map((row) => row.map((x)=>x) );

        switch(inputcode) {
            case UP:
                this.grid_t = this.grid_t.map( (col) => shift_left(col));
                this.grid = transpose(this.grid_t);
                break;
            case LEFT:
                this.grid = this.grid.map( (row) => shift_left(row));
                this.grid_t = transpose(this.grid);
                break;
            case DOWN:
                this.grid_t = this.grid_t.map( (col) => shift_right(col));
                this.grid = transpose(this.grid_t);     
                break;
            case RIGHT:
                this.grid = this.grid.map( (row) => shift_right(row));
                this.grid_t = transpose(this.grid);
                break;
            default:
                return false;
        }
        
        this.digits = check_digits(this.grid);
        return !AreGridsEqual(start_grid, this.grid);    // if grids are equal, return false - can't move. 
    }
    // return false if cant do it - because of input, or because no effect.
    is_game_over(){
        if (typeof(this.grid.find((row) => typeof(row.find((x) => x == 0)) != "undefined")) != "undefined"){
            return false;
        }
        //if its full, only playable if theres adjacents.
        if (typeof(this.grid.find((row) => has_adjacents(row))) != "undefined") {
            return false;
        }
        if (typeof(this.grid_t.find((col) => has_adjacents(col))) != "undefined") {
            return false;
        }
        console.log("Game should be over - method call")
        return true;
    }
  }; 


export {new_grid, print_grid, insert_new, generate_new, get_random_empty_position,
    condense_left, shift_left, shift_right, has_adjacents, transpose, check_digits, gridclass,
    UP, DOWN, LEFT, RIGHT}