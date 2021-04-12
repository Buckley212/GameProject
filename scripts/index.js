<<<<<<< HEAD

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
=======

const canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');

const backgroundImage = new Image();
backgroundImage.src = './resources/assets/gameMap.PNG'

const player_image = new Image();
player_image.src = './resources/assets/survivor-idle_shotgun_0.png'

const zombie_image = new Image();
zombie_image.src = './resources/assets/zombie.png'

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

class Zombie {
    constructor(health, x, y, w, h, img){
        this.health = health;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.img = img;
    }
    draw = () => {
        ctx.drawImage(this.img, this.x, this.y, this.w, this.h)
    }
    move = () => {
        if (this.y > 300){
            this.y -=1
        }
        else { this.y -= 0}
    }
}

let zombies = [];

setInterval(function () {
    zombies.push(new Zombie(100, Math.floor(Math.random()*canvas.width), canvas.height, 100, 100, zombie_image))
}, 3000)

function detectCollision(rect1, rect2) {
    if (
      rect1.x < rect2.x + rect2.w &&
      rect1.x + rect1.w > rect2.x &&
      rect1.y < rect2.y + rect2.h &&
      rect1.y + rect1.h > rect2.y
    ) {
        zombie.health -= 50
    }
}

const player = new Player(canvas.width/2 - 20, 200, 100, 100, player_image)

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
    zombies.forEach(badguy => {
        badguy.draw()
        badguy.move();
    })
}

let startBtn = document.getElementById('start-btn');
const startScreen = document.querySelector('.start')
startBtn.addEventListener('click', function () {
    startScreen.classList.add('load-fade')
    animate()
})
>>>>>>> 244cc57d122ec69c4b57862b55d164a9cb9fe33a
