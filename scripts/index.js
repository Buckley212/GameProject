
const canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');

const backgroundImage = new Image();
backgroundImage.src = './resources/assets/gameMap.PNG'

const playerImage = new Image();
playerImage.src = './resources/assets/survivor-idle_shotgun_0.png'



class Player {
    constructor(ctx, x, y) {
      this.x = x
      this.y = y

      this.dest = {
        x: 0,
        y: 0
      }

      this.width = 100
      this.height = 100
      this.velocity = 12
      this.angularVelocity = 7
      this.rotation = 0
      this.ctx = ctx

      this.image = playerImage
    }

    draw = () => {
      this.ctx.translate(this.x, this.y)
      this.ctx.rotate(this.rotation + 4.7)
      this.ctx.drawImage(
        this.image,
        -this.width / 2, -this.height / 2,
        this.width, this.height
      )
      this.ctx.rotate(-this.rotation - 4.7)
      this.ctx.translate(-this.x, -this.y)
    }
}

let player = new Player(ctx, canvas.width /2, 200);

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
