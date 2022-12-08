import {print_grid, new_grid, insert_new, generate_new, get_random_empty_position,
    condense_left, shift_left, shift_right, has_adjacents, transpose, check_digits,
    gridclass, UP, DOWN, LEFT, RIGHT} from "./grid2048.js";



// gridObj.grid = [[0, 2, 4, 8], [16, 32, 64, 128], [256, 512, 1024, 2048], [4096, 8192, 16384, 32768]];
// gridObj.grid_t = transpose(gridObj.grid);


function CanvasPrintGrid(gridt, size) {
    console.log(size);
    const grid = transpose(gridt);
    const canvas = document.querySelector("#canvas");
    const ctx = canvas.getContext("2d");
    const WIDTH = 600;
    const radiusSize = WIDTH/(2*size);

    canvas.height = WIDTH;
    canvas.width = WIDTH;
    ctx.font = '20px Segoe UI';
    
    ctx.textAlign = "center";
    ctx.lineWidth = 5;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            const value = grid[i][j];
            console.log(typeof(value) == "undefined");
            if (value != 0) {
                const fontsize = radiusSize / 2^(Math.ceil(Math.log10(value)));
                ctx.font = fontsize.toString().concat("px Segoe UI");
                ctx.fillText(value, (2*i+1) * radiusSize , (2*j+1) * radiusSize + fontsize/4);
            }
            ctx.strokeStyle = Colours[Math.log2(value)];

            ctx.beginPath();
            ctx.arc( (2*i+1) * radiusSize , (2*j+1) * radiusSize, radiusSize, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.closePath();
            ctx.strokeStyle = "black";
        }
    }
}

const Colours = ["Azure", "AliceBlue", "LightBlue","DeepSkyBlue", "Blue", "DarkSlateBlue", "Indigo", "MediumPurple", "Orchid", "Plum", "Pink", "Cyan"];


//-------------------------------------

window.addEventListener('load', ()=> {
    const form = document.querySelector("#new-task-form");
    const input = document.querySelector("#new-task-input");
    let size = 3;
    let gridObj = new gridclass(size); //default 4.
    gridObj.print();
    CanvasPrintGrid(gridObj.grid, size);
    console.log("Loading default grid");

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        console.log("Loading new grid");

        const task = input.value;
    
        if(!task) {
            alert("Please fill out the task");
            return;
        }
        size = parseInt(task);
        
        gridObj = new gridclass(size);
        gridObj.print();
        CanvasPrintGrid(gridObj.grid, size);
    })
        

    // Functions _____________________
    const keydownAction = function (event) {
        if (event.keyCode >= 37 && event.keyCode <= 40) {
            let NewInput = event.keyCode;
    
            if (gridObj.set_move(NewInput) == false) {
                // set_move will always try make a change to the grid.
                console.log("Input did not change game");
            } else {
                gridObj.set_new();
                if (gridObj.is_game_over()) {
                    print_grid(gridObj.grid)
                    gridObj.print();
                    CanvasPrintGrid(gridObj.grid, size);
                    console.log("game over")  
                    alert("Game over.");           
                    return 0
                    // finish this function, game is over.
                }
            }
            console.log(`real grid size: ${gridObj.grid.length}`);
            gridObj.print();
            CanvasPrintGrid(gridObj.grid, size);
        } 
    }

    document.body.addEventListener('keydown', keydownAction);
    // document.body.removeEventListener('keydown', keydownAction);

})
