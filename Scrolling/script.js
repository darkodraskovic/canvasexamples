var FPS = 60;
var dt = 1 / FPS;

var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");

var backgroundImg = new Image();
backgroundImg.src = "fullMoon_filterPredator.jpg";

var spriteSheetImg = new Image();
spriteSheetImg.src = "ships.png";

var gameWorld = {
    x: 0,
    y: 0,
    w: backgroundImg.width,
    h: backgroundImg.height
};

var camera = {
    x: 0,
    y: 0,
    w: canvas.width,
    h: canvas.height
};

// INPUT
// Arrow key codes
var LEFT = 37;
var RIGHT = 39;   
var UP = 38;   
var DOWN = 40;   

// Movement & facing directions
var moveLeft = false;
var moveRight = false;
var moveUp = false;
var moveDown = false;

var facDir = RIGHT;

// Event listeners
window.addEventListener("keydown", function(event){
    switch(event.keyCode) {
    case LEFT:
	moveLeft = true;
	break;	   	
    case RIGHT:
	moveRight = true;
	break;
    case UP:
	moveUp = true;
	break;	   
    case DOWN:
	moveDown = true;
	break;	   	
    default:
	break;
    }
});

window.addEventListener("keyup", function(event){
    switch(event.keyCode) {
    case LEFT:
	moveLeft = false;
	break;	   	
    case RIGHT:
	moveRight = false;
	break;
    case UP:
	moveUp = false;
	break;	   
    case DOWN:
	moveDown = false;
	break;	   	
    default:
	break;
    }
});

camera.x = (gameWorld.x + gameWorld.w / 2) - camera.w / 2;
camera.y = (gameWorld.y + gameWorld.h / 2) - camera.h / 2;

function Sprite(name, img, srcX, srcY, srcW, srcH, x, y, w, h, visible, shadow, alpha) {
    this.name = name;
    this.img = img;
    this.srcX = srcX;
    this.srcY = srcY;
    this.srcW = srcW;
    this.srcH = srcH;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.speedX = 0;
    this.speedY = 0;
    this.vx = 0;
    this.vy = 0;
    this.ax = 0;
    this.ay = 0;
    this.rotation = 0;
    this.visible = visible;
    this.shadow = shadow;
    this.alpha = alpha;
}

var spritesArr = [];

var backgroundSprite = new Sprite("background", backgroundImg, 0, 0, 1280, 960, 0, 0, 1280, 960, true, false, 1.0);
var redShip = new Sprite("redShip", spriteSheetImg, 
			 spriteSheetJSON.ships.red[0], spriteSheetJSON.ships.red[1], spriteSheetJSON.ships.red[2], spriteSheetJSON.ships.red[3],
			 gameWorld.x + gameWorld.w / 2, gameWorld.y + gameWorld.h / 2, spriteSheetJSON.ships.red[2] / 4, spriteSheetJSON.ships.red[3] / 4,
			 true, false, 1.0);
redShip.speedX = 100;
redShip.speedY = 100;

spritesArr.push(backgroundSprite);
spritesArr.push(redShip);

function update() {
    mozRequestAnimationFrame(update, ctx);

    updatePlayer(redShip);

    updateCamera(redShip);

    render(spritesArr);

    //    console.log("player x: " + redShip.x + "; player y: " + redShip.y);
}

function updatePlayer(player) {
    // move player
    if (moveLeft && !moveRight) {
	player.vx = -player.speedX;
    }
    if (moveRight && !moveLeft) {
	player.vx = player.speedX;
    }
    if (moveUp && !moveDown) {
	player.vy = -player.speedY;
    }
    if (moveDown && !moveUp) {
	player.vy = player.speedY;
    }
    if (!moveLeft && !moveRight) {
	player.vx = 0;
    }
    if (!moveUp && !moveDown) {
	player.vy = 0;
    }

    player.x += Math.floor(player.vx * dt);
    player.y += Math.floor(player.vy * dt);
}

function updateCamera(followee) {
    // center the camera on the followee & keep it inside the gameworld boundaries
    camera.x = Math.max(0, Math.min(
	Math.floor((followee.x + followee.w / 2) - camera.w / 2),
	gameWorld.w - camera.w)
    );

    camera.y = Math.max(0, Math.min(
	Math.floor((followee.y + followee.h / 2) - camera.h / 2),
	gameWorld.h - camera.h)
    ); 
    console.log(camera.y);
}


function render(sprites) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();

    ctx.translate(-camera.x, -camera.y);
    if (spritesArr.length != 0) {
	for(var i = 0; i < spritesArr.length; i++) {
	    var sprite = spritesArr[i];
	    ctx.drawImage  
            (  
		sprite.img,
		sprite.srcX, sprite.srcY,   
		sprite.srcW, sprite.srcH,  
		Math.floor(sprite.x), Math.floor(sprite.y),   
		sprite.w, sprite.h  
            );   
	}
    }

    ctx.restore();
}


update();
