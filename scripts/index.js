
const canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');

const backgroundImage = new Image();
backgroundImage.src = './resources/assets/gameMap.PNG'

const player_image = new Image();
player_image.src = './resources/assets/survivor-idle_shotgun_0.png'

let gMouseX = 0;
let gMouseY = 0;
let gShipAngleInRads = 0;
let centerOfShipX = 0;
let centerOfShipY = 0;
let actualMouseX = 0;
let actualMouseY = 0;

document.addEventListener("mousemove", (e) => {
    gMouseX = e.clientX;
    gMouseY = e.clientY;
  });

class Player {
    constructor(x, y, w, h, img){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.img = img;
}
    draw = () => {
        //>>>>>This code gets the coord of the canvas
        
        
        let canvasXY = canvas.getBoundingClientRect();
        

        let actualMouseX = gMouseX - canvasXY.x;
        let actualMouseY = gMouseY - canvasXY.y;
        let centerOfShipX = this.x + 50;
        let centerOfShipY = this.y + 50;
    
        gShipAngleInRads = Math.atan2(
          actualMouseY - centerOfShipY,
          actualMouseX - centerOfShipX
        );
    
        ctx.translate(centerOfShipX, centerOfShipY);
        ctx.rotate(gShipAngleInRads + (90 * Math.PI) / 180);
        ctx.translate(-centerOfShipX, -centerOfShipY);
        ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
        ctx.setTransform(1, 0, 0, 1, 0, 0);
    
        ctx.beginPath();
        ctx.moveTo(centerOfShipX, centerOfShipY);
        ctx.lineTo(actualMouseX, actualMouseY);
        ctx.lineWidth = 5;
        ctx.stroke();
    }

    
}

const player = new Player(canvas.width/2, 250, 100, 100, player_image)

const background = {
    x: 0,
    y: 0,
    w: canvas.width,
    h: canvas.height,
    draw: function() {
        ctx.drawImage(backgroundImage, this.x, this.y, this.w, this.h)
    }
}

let gameInt = null;

function animate() {
    gameInt=requestAnimationFrame(animate)
    ctx.clearRect(0,0,canvas.width,canvas.height)
    background.draw();
    player.draw();
}

let startBtn = document.getElementById('start-btn');
const startScreen = document.querySelector('.start')
startBtn.addEventListener('click', function () {
    startScreen.classList.add('load-fade')
    animate()
})

// draw() {
//     //>>>>>This code gets the coord of the canvas
//     let canvasXY = canvas.getBoundingClientRect();

//     let actualMouseX = gMouseX - canvasXY.x;
//     let actualMouseY = gMouseY - canvasXY.y;
//     let centerOfShipX = this.x + 52;
//     let centerOfShipY = this.y + 70;

//     gShipAngleInRads = Math.atan2(
//       actualMouseY - centerOfShipY,
//       actualMouseX - centerOfShipX
//     );

//     context.translate(centerOfShipX, centerOfShipY);
//     context.rotate(gShipAngleInRads + (90 * Math.PI) / 180);
//     context.translate(-centerOfShipX, -centerOfShipY);
//     context.drawImage(this.img, this.x, this.y, this.w, this.h);
//     context.setTransform(1, 0, 0, 1, 0, 0);

//     // //>>>>>> Draw line from ship to mouse for clarification of points while coding
//     // context.beginPath();
//     // context.moveTo(centerOfShipX, centerOfShipY);
//     // context.lineTo(actualMouseX, actualMouseY);
//     // context.lineWidth = 5;
//     // context.stroke();
//   }
