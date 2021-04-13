
const canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');

const backgroundImage = new Image();
backgroundImage.src = './resources/assets/gameMap.PNG'

const player_image = new Image();
player_image.src = './resources/assets/survivor-idle_shotgun_0.png'

const player_image_shoot = new Image();
player_image_shoot.src = './resources/assets/survivor-idle_shotgun_fire.png'

const zombie_image = new Image();
zombie_image.src = './resources/assets/zombie.png'

const splatter_image = new Image();
const bloodimages = ['./resources/assets/bloodPools/blood-splatter1.png','./resources/assets/bloodPools/blood-splatter3.png','./resources/assets/bloodPools/blood-splatter4.png','./resources/assets/bloodPools/blood-splatter5.png']

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

const score = {
    points: 0,
    draw: function () {
        ctx.font = "30px Arial";
        ctx.fillStyle = "yellow";
        ctx.fillText("Score: "+this.points, 50, 50);
    }
}

const cash = {
    money: 0,
    draw: function () {
        ctx.font = "30px Arial";
        ctx.fillStyle = "yellow";
        ctx.fillText("Cash: "+this.money, canvas.width - 150, 50);
    }
}

class Player {
    constructor(x, y, w, h, img, img2){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.img = img;
        this.img2 = img2;
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
        if(shooting){
            ctx.globalAlpha = .4;
            ctx.drawImage(this.img2, this.x, this.y, this.w, this.h);
            ctx.globalAlpha = 1;
            ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
        } else {ctx.drawImage(this.img, this.x, this.y, this.w, this.h);}
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        
    }
}

class Blood {
    constructor(x, y, src) {
        this.x = x;
        this.y = y;
        this.src = src;
    }
    draw() {
        splatter_image.src = this.src;
        ctx.drawImage(splatter_image, this.x, this.y, 200, 200)
    }
}

const bloodPools = [];

let bulletSpeed = 9;

class Bullet {
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
let shooting = false;
const bullets = [];

addEventListener("click", (event) => {
    let canvasXY = canvas.getBoundingClientRect();

    let actualMouseClickX = event.clientX - canvasXY.x;
    let actualMouseClickY = event.clientY - canvasXY.y; 

    let centerPlayerX = player.x + 52;
    let centerPlayerY = player.y + 70;
    shooting = true;

    setTimeout(() => shooting = false, 100) 
    const angle = Math.atan2(
      actualMouseClickY - centerPlayerY,
      actualMouseClickX - centerPlayerX
    );

    const velocity = {
      x: Math.cos(angle),
      y: Math.sin(angle),
    };

    bullets.push(
        new Bullet(
            player.x + 52,
            player.y + 70,
            5,
            `darkGrey`,
            velocity
        )
    )
});
  
function detectCollision(rect1, rect2) {
    if (
        rect1.x < rect2.x + rect2.w &&
        rect1.x + rect1.w > rect2.x &&
        rect1.y < rect2.y + rect2.h &&
        rect1.y + rect1.h > rect2.y
      ) {
        if (rect2.health >= 51) {
            rect2.health -= 50;
            score.points += 5
            bullets.splice(bullets.indexOf(rect1), 1);
            bloodPools.push(new Blood(rect2.x - 50, rect2.y, bloodimages[Math.floor(Math.random()*bloodimages.length)]))
        } 
        else {
            setTimeout(() => {
                cash.money += 5
                score.points += 10
                bullets.splice(bullets.indexOf(rect1), 1);
                zombies.splice(zombies.indexOf(rect2), 1);
                bloodPools.push(new Blood(rect2.x -50, rect2.y, bloodimages[Math.floor(Math.random()*bloodimages.length)]))
            }, 0);
        }
      }
  }

  function detectCollision2(rect1, rect2) {
    if (
        rect1.x < rect2.x + rect2.w &&
        rect1.x + rect1.w > rect2.x &&
        rect1.y < rect2.y + rect2.h &&
        rect1.y + rect1.h > rect2.y
      ) {
        if (rect2.health >= 51) {
            rect2.health -= 50;
            score.points += 5
            bullets.splice(bullets.indexOf(rect1), 1);
            bloodPools.push(new Blood(rect2.x - 50, rect2.y, bloodimages[Math.floor(Math.random()*bloodimages.length)]))
        } 
        else {
            setTimeout(() => {
                cash.money += 5
                score.points += 10
                bullets.splice(bullets.indexOf(rect1), 1);
                fastZombies.splice(fastZombies.indexOf(rect2), 1);
                bloodPools.push(new Blood(rect2.x - 50, rect2.y, bloodimages[Math.floor(Math.random()*bloodimages.length)]))
            }, 0);
        }
      }
  }

  function detectCollision3(rect1, rect2) {
    if (
        rect1.x < rect2.x + rect2.w &&
        rect1.x + rect1.w > rect2.x &&
        rect1.y < rect2.y + rect2.h &&
        rect1.y + rect1.h > rect2.y
      ) {
        if (rect2.health >= 51) {
            rect2.health -= 50;
            score.points += 5
            bullets.splice(bullets.indexOf(rect1), 1);
            bloodPools.push(new Blood(rect2.x + 75, rect2.y + 50, bloodimages[Math.floor(Math.random()*bloodimages.length)]))
        } 
        else {
            setTimeout(() => {
                cash.money += 5
                score.points += 10
                bullets.splice(bullets.indexOf(rect1), 1);
                tankZombies.splice(tankZombies.indexOf(rect2), 1);
                bloodPools.push(new Blood(rect2.x + 75, rect2.y + 50, bloodimages[Math.floor(Math.random()*bloodimages.length)]))
            }, 0);
        }
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
        else {
            this.y -= 0;
        }
    }
    shoot = () => {
        this.health -= 50;
    }
}

class FastZ extends Zombie {
    constructor(x, y, w, h, img){
        super(x, y, w, h, img);
        this.health = 50;
    }
    draw = () => {
        if(this.health > 0){
            ctx.drawImage(this.img, this.x, this.y, this.w, this.h)
        }
    }
    move = () => {
        if (this.y > 300){
            this.y -= 5
        }
        else {
            this.y -= 0;
        }
    }
}

class TankZ extends Zombie {
    constructor(x, y, w, h, img){
        super(x, y, w, h, img);
        this.health = 1000;
    }
    draw = () => {
        if(this.health > 0){
            ctx.drawImage(this.img, this.x, this.y, this.w, this.h)
        }
    }
    move = () => {
        if (this.y > 300){
            this.y -= 0.1;
        }
        else {
            this.y -= 0;
        }
    }
}

let tankZombies = [];
let zombies = [];
let fastZombies = [];

setInterval(function () {
    zombies.push(new Zombie(Math.floor(Math.random()*canvas.width - 50), canvas.height, 100, 100, zombie_image))
}, 3000)

setInterval(function (){
    fastZombies.push(new FastZ(Math.floor(Math.random()*canvas.width), canvas.height, 75, 75, zombie_image))
}, 10000)

setInterval(function (){
    tankZombies.push(new TankZ(Math.floor(Math.random()*canvas.width), canvas.height, 300, 300, zombie_image))
}, 30000)

const player = new Player(canvas.width/2 - 20, 200, 100, 100, player_image, player_image_shoot)

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
    bloodPools.forEach(pool => {
        pool.draw()
    })
    zombies.forEach(badguy => {
        badguy.draw()
        badguy.move()
        bullets.forEach((bullet) => {
            bullet.update();
            bullet.w = bullet.radius * 2;
            bullet.h = bullet.radius * 2;
            detectCollision(bullet, badguy);
        });
    })
    fastZombies.forEach(badguy => {badguy.draw()
        badguy.move()
        bullets.forEach((bullet) => {
        bullet.update();
        bullet.w = bullet.radius * 2;
        bullet.h = bullet.radius * 2;
        detectCollision2(bullet, badguy);
    });
    })
    tankZombies.forEach(badguy => {badguy.draw()
        badguy.move()
        bullets.forEach((bullet) => {
        bullet.update();
        bullet.w = bullet.radius * 2;
        bullet.h = bullet.radius * 2;
        detectCollision3(bullet, badguy);
    });
    })
    score.draw();
    cash.draw();
}

let startBtn = document.getElementById('start-btn');
const startScreen = document.querySelector('.start')
startBtn.addEventListener('click', function () {
    startScreen.classList.add('load-fade')
    animate()
})
