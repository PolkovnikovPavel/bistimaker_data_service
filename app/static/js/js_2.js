async function sleep(ms) {
    // await new Promise(resolve => setTimeout(resolve, ms))
    await new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve()
        }, ms);
    });
}


function px(p) {
    return canvas.width * p / 100
}

function py(p) {
    return canvas.height * p / 100
}

async function drawImg(ctx, name, x, y, w = -1, h = -1) {
    let img = new Image();
    img.src = name;
    img.onload = function () {
        if (w !== -1 & h !== -1) {
            ctx.drawImage(img, x, y, w, h);
        } else {
            ctx.drawImage(img, x, y);
        }

    }
}

function resizeCanvas() {
    canvas.height = window.innerHeight - canvas.offsetTop - 6
    canvas.width = window.innerWidth
    canvas.style.height = canvas.height + 'px';
    canvas.style.width = canvas.width + 'px';
    draw();

}

async function drawRightImg(ctx, img, x, y, w=-1, h=-1) {
    img.onload = function () {
        if (w !== -1 & h !== -1) {
            ctx.drawImage(img, x, y, w, h);
        } else {
            ctx.drawImage(img, x, y);
        }

    }
}

function drawPicture(Event) {
    img_x = Event.pageX - canvas.offsetLeft;
    img_y = Event.pageY - canvas.offsetTop;
    draw();
    
}


function draw() {
    // ctx.clearRect(0, 0, px(100), py(100));
    ctx.drawImage(bg, img_x/2, img_y/2, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);

    // ctx.fillStyle = 'rgb(200,0,0,0.5)';
    // ctx.fillRect(px(10), py(10), py(50), py(50));
    // ctx.fillStyle = 'rgb(0,0,200,0.5)';
    // ctx.fillRect(px(10) + py(25), py(35), py(50), py(50));
    // ctx.fillStyle = 'rgb(0,0,0)';
    // ctx.beginPath();
    // ctx.moveTo(75,50);
    // ctx.lineTo(100,75);
    // ctx.lineTo(100,25);
    // ctx.closePath();
    // ctx.stroke();
    // ctx.beginPath();
    // ctx.arc(90,65,5,0,Math.PI*2,true);
    // ctx.stroke();

    const k = 50;
    const r = 20;
    for (let i = 0; i < 11; i++) {
        for (let j = 0; j < 6; j++) {
            ctx.beginPath();
            ctx.arc(i * k, j * k, r, 0, Math.PI * 2)
            ctx.rect(i * k, j * k, r, r);
            ctx.stroke();
        }
    }

    ctx.drawImage(img, img_x, img_y);

    


    ctx.fillStyle = 'rgb(200,100,0,1)';
    ctx.font = "50px calibri";
    ctx.fillText(nameOb.value, px(10), py(60));

}


let canvas = document.getElementById('mainCanvas');
let nweCanvas = document.createElement('canvas');
let ctx = canvas.getContext('2d');
let img_x = 0;
let img_y = 0;
let img = new Image();
img.src = 'static/images/img_2.png';
let bg = new Image();
bg.src = 'static/images/img_6.jpg';

let nameOb = document.getElementById('name');
nameOb.value = 'Наш девиз: "Я МЫ - ПАВЕЛ"'


document.onmousemove = function (Event) {
    drawPicture(Event);
};
window.onresize = resizeCanvas;
window.onkeyup = draw;



resizeCanvas();
draw();

