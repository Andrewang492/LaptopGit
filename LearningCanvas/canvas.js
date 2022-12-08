window.addEventListener("load", ()=> {
    const canvas = document.querySelector("#canvas");
    const ctx = canvas.getContext("2d");

    //Resizing
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    ctx.fillRect(100, 100, 200, 200);

    ctx.strokeStyle = "red";
    ctx.strokeRect(100, 400, 200, 200);

    ctx.lineWidth = 5;
    ctx.strokeStyle = "blue";
    ctx.strokeRect(500, 500, 100, 100);

    ctx.beginPath();
    ctx.moveTo(100, 100);
    ctx.lineTo(200, 100);
    ctx.lineTo(200,150);
    ctx.closePath();
    ctx.stroke();
    ctx.beginPath();

    //variables
    let painting = false;

    //Event Listeners

    function startPosition(e) {
        painting = true;
        draw(e); //draw on single clicks without dragging
    }
    function endPosition() {
        painting = false;
        ctx.beginPath(); // to prevent jumping between holds of the mouse.
    }
    function draw(e) {
        if(!painting) return; //if not holding mouse, downt do anything.
        ctx.lineWidth = 10;
        ctx.lineCap = 'round';
        
        ctx.lineTo(e.clientX, e.clientY) //line to X and Y pos of mouse.
        ctx.stroke();

        // these two allow it to be smoother
        // ctx.beginPath();
        // ctx.moveTo(e.clientX, e.clientY);

    }

    canvas.addEventListener("mousedown", startPosition);
    canvas.addEventListener("mouseup", endPosition);
    canvas.addEventListener("mousemove", draw);
})

// window.addEventListener("resize", ()=>{
//     canvas.height = window.innerHeight;
//     canvas.width = window.innerWidth;
// })