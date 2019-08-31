
    var cvs = document.getElementById('canvas')
    var ctx = canvas.getContext('2d')

// load images

var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeNorth = new Image();
var pipeSouth = new Image();


bird.src = "img/bird.png";
bg.src = "img/bg.png";
fg.src = "img/fg.png";
pipeNorth.src = "img/pipeNorth.png";
pipeSouth.src = "img/pipeSouth.png";

// some variables

var gap = 50;
var constant = pipeNorth.height+gap;

var bX = 10;
var bY =150;

//on key down
document.addEventListener("keydown", moveUp);

function moveUp(){
    bY -= 20;
}
// pipe coordinates
var pipe = [];

pipe[0] = {
    x : cvs.width, 
    y : 0
}

// draw images

var gravity = 1.5;

function draw(){
    ctx.drawImage(bg, 0, 0);

    for(var i = 0; i< pipe.length; i++){
        ctx.drawImage(pipeNorth, pipe[i].x,pipe[i].y);
        ctx.drawImage(pipeSouth, pipe[i].x, pipe[i].y+constant);

        pipe[i].x--;

        if(pipe[i].x == 125){
            pipe.push({
                x : cvs.width,
                y : Math.floor(Math.random()*pipeNorth.height)-pipeNorth.height
            })
        }
        if(bX + bird.width >= pipe[i].x && bX <= pipe[i].x + pipeNorth.width && bY <= pipe[i].y + pipeNorth.height || bY+bird.height >= pipe[i].y + constant){
            location.reload();
        }
    }
    
    ctx.drawImage(fg, 0, cvs.height - fg.height);
    ctx.drawImage(bird, bX, bY);

    bY += gravity;

    requestAnimationFrame(draw);
}

draw();
