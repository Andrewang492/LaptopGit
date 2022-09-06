import {size, print_grid, new_grid, insert_new, generate_new, get_random_empty_position,
    condense_left, shift_left, shift_right, has_adjacents, transpose, check_digits,
    gridclass, UP, DOWN, LEFT, RIGHT} from "./grid2048.js";



let IsNewInput = false;
let NewInput = UP; //default up, but will be changed and only used with user input.

let gridObj = new gridclass();

function main() {
    if (IsNewInput) {
        //     console.log(`There was input KeyCode: ${NewInput} `);
        if (gridObj.set_move(NewInput) == false) {
            console.log("Input did not change game");
        } else {
            gridObj.set_new();
            if (gridObj.is_game_over()) {
                print_grid(gridObj.grid)
                console.log("game over")             
                return 0
                // finish this function, game is over.
            }
        }
        print_grid(gridObj.grid)
    }
    IsNewInput = false;
    setTimeout(main, 1000/10); //update 10 times a second.
}




document.body.addEventListener('keydown',inputToLetter);

function inputToLetter(event){
    if (event.keyCode >= 37 && event.keyCode <= 40) {
        NewInput = event.keyCode
        IsNewInput = true
    }
}

gridObj.print();
main();