var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");

var image = new Image();
image.addEventListener("load", loadHandler, false);
image.src = "armor2Walk.png";

var alien = new Sprite("alien", image, 0, 128, 64, 64, canvas.width/2 - 32, canvas.height/2 - 32, 64, 64, true, false, 1);

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
    this.rotation = 0;
    this.visible = visible;
    this.shadow = shadow;
    this.alpha = alpha;
}

function loadHandler() {
    render(alien);

    update();
}


function update() {
    window.mozRequestAnimationFrame(update, canvas);

    render(alien);
}


function render(sprite) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (sprite.visible) {
	ctx.save();

	ctx.translate(Math.floor(sprite.x + sprite.w / 2), 
		      Math.floor(sprite.y + sprite.y / 2));
	ctx.rotate(sprite.rotation * Math.PI / 180);

	ctx.globalAlpha = sprite.alpha;

	if (sprite.shadow) {
	    ctx.shadowColor = "rgba(100, 100, 100, 0.5)";
	    ctx.shadowOffsetX = 3;
	    ctx.shadowOffsetY = 3;
	    ctx.shadowBlur = 3;
	}
	
	ctx.drawImage(sprite.img,
		      sprite.srcX, sprite.srcY, sprite.srcW, sprite.srcH,
		      Math.floor(-sprite.w / 2), Math.floor(-sprite.h / 2), sprite.w, sprite.h);

	ctx.restore();
    }
}

function moveLeft(sprite) {
    sprite.x -= 10;
}

function moveRight(sprite) {
    sprite.x += 10;
}

function moveUp(sprite) {
    sprite.y -= 10;
}

function moveDown(sprite) {
    sprite.y += 10;
}


function show(sprite) {
    sprite.visible = true;
}

function hide(sprite) {
    sprite.visible = false;
}

function rotateCW(sprite) {
    sprite.rotation += 5;
}

function rotateCCW(sprite) {
    sprite.rotation -= 5;
}


function incAlpha(sprite) {
    if (sprite.alpha < 1)
	sprite.alpha += 0.1;
}

function decAlpha(sprite) {
    if (sprite.alpha > 0.1)
	sprite.alpha -= 0.1;
}

function toggleShadow(sprite) {
    if (sprite.shadow)
	sprite.shadow = false;
    else sprite.shadow = true;
    console.log(sprite.shadow);
}
