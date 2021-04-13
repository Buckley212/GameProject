
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
let gPlayerAngleInRads = 0;
let centerOfPlayerX = 0;
let centerOfPlayerY = 0;
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
        let centerOfPlayerX = this.x + 50;
        let centerOfPlayerY = this.y + 50;
    
        gPlayerAngleInRads = Math.atan2(
          actualMouseY - centerOfPlayerY,
          actualMouseX - centerOfPlayerX
        );
    
        ctx.translate(centerOfPlayerX, centerOfPlayerY);
        ctx.rotate(gPlayerAngleInRads + (90 * Math.PI) / 180);
        ctx.translate(-centerOfPlayerX, -centerOfPlayerY);
        ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        
    }
}

let bulletSpeed = 9;

class Laser {
    constructor(x, y, radius, color, velocity) {
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.color = color;
      this.velocity = velocity;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      ctx.fillStyle = this.color;
      ctx.fill();
    }
    update() {
        this.draw();
        this.x = this.x + this.velocity.x * bulletSpeed;
        this.y = this.y + this.velocity.y * bulletSpeed;
    }
}

const bullets = [];

addEventListener("click", (event) => {
  let canvasXY = canvas.getBoundingClientRect();

  let actualMouseClickX = event.clientX - canvasXY.x;
  let actualMouseClickY = event.clientY - canvasXY.y;

  let centerPlayerX = player.x + 52;
  let centerPlayerY = player.y + 70;


  const angle = Math.atan2(
    actualMouseClickY - centerPlayerY,
    actualMouseClickX - centerPlayerX
  );
  const velocity = {
    x: Math.cos(angle),
    y: Math.sin(angle),
  };
  bullets.push(
    new Laser(
      player.x + 52,
      player.y + 70,
      5,
      `darkGrey`,
      velocity
    )
  );
});

function detectCollision(rect1, rect2) {
    if (
      rect1.x < rect2.x + rect2.w &&
      rect1.x + rect1.w > rect2.x &&
      rect1.y < rect2.y + rect2.h &&
      rect1.y + rect1.h > rect2.y
    ) {
      if (rect2.w > 50) {
        rect2.w -= 50;
        rect2.h -= 50;
        bullets.splice(bullets.indexOf(rect1), 1);
      } else {
        setTimeout(() => {
          bullets.splice(bullets.indexOf(rect1), 1);
          zombies.splice(zombies.indexOf(rect2), 1);
        }, 0);
      }
    }
  }
  
  function detectCollision2(rect1, rect2) {
    if (
      rect1.x < rect2.x + rect2.w &&
      rect1.x + rect1.w > rect2.x &&
      rect1.y < rect2.y + rect2.h &&
      rect1.y + rect1.h > rect2.y) {
        setTimeout(() => {
          bullets.splice(bullets.indexOf(rect1), 1);
          zombies.splice(zombies.indexOf(rect2), 1);
        }, 0);
      }
    }

  function detectCollision3(rect1, rect2) {
    if (
      rect1.x < rect2.x + rect2.w &&
      rect1.x + rect1.w > rect2.x &&
      rect1.y < rect2.y + rect2.h &&
      rect1.y + rect1.h > rect2.y) {
        setTimeout(() => {
          bullets.splice(bullets.indexOf(rect1), 1);
          zombies.splice(zombies.indexOf(rect2), 1);
        }, 0);
      }
    }
  

class Zombie {
    constructor(x, y, w, h, img){
        this.health = 200
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.img = img;
    }

    draw = () => {
        if(this.health > 0){
            ctx.drawImage(this.img, this.x, this.y, this.w, this.h)
        }
    }
    
    move = () => {
        if (this.y > 300){
            this.y -=1
        }
        else { this.y -= 0}
    }
    shoot = () => {
        this.health -= 50;
    }
}

let zombies = [];

setInterval(function () {
    zombies.push(new Zombie(Math.floor(Math.random()*canvas.width), canvas.height, 100, 100, zombie_image))
}, 3000)


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
        badguy.move()
        bullets.forEach((bullet) => {
            bullet.update();
            bullet.w = bullet.radius * 2;
            bullet.h = bullet.radius * 2;
            detectCollision2(bullet, badguy);
        });
    })
}

let startBtn = document.getElementById('start-btn');
const startScreen = document.querySelector('.start')
startBtn.addEventListener('click', function () {
    startScreen.classList.add('load-fade')
    animate()
})
