var sprite = {
    IMAGE: "img/raiserRunning.png",
    SIZE: 32,
    
    numberOfFrames: 8,
    currentFrame: 0,

    sourceX: 0,
    sourceY: 0,

    updateAnimation: function() {
	if (this.currentFrame < this.numberOfFrames - 1) {
	    this.currentFrame++;
	} else {
	    this.currentFrame = 0;
	}

	this.sourceX = this.currentFrame * this.SIZE;
	this.sourceY = 0;
    }
};

var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");

var image = new Image();
image.addEventListener("load", loadHandler, false);
image.src = sprite.IMAGE;

function loadHandler() {
    updateAnimation();
}

function updateAnimation() {
    setTimeout(updateAnimation, 200);

    sprite.updateAnimation();

    render();

}

function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.drawImage(
	image,
	sprite.sourceX, sprite.sourceY, sprite.SIZE, sprite.SIZE,
	144, 144, sprite.SIZE, sprite.SIZE
    );
}
