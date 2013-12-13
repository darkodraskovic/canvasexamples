// Get a reference to the stage and output
var stage = document.querySelector("#stage");
var output = document.querySelector("#output");

var parsedJSON;
var setup = function() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "images/maps/test.json", false);
    xhr.onload = function() {
//	console.log(this.responseText);
	parsedJSON = JSON.parse(this.responseText);
    };
    xhr.send();
};

setup();
// The game map

// console.log("map height: " + parsedJSON["height"]);
//console.log(parsedJSON["layers"][0]);

var map = parsedJSON["layers"][0];
//console.log(map["data"]);

// Map code

// The size of each cell
var SIZE = parsedJSON["tilewidth"];
console.log(SIZE);

// The number of map rows and columns
var ROWS = map["height"];
var COLS = map["width"];
var mapArray = map["data"];

render();

// Render the game by looping through the map array
function render(){
    var i, j;
    for (i = 0; i < ROWS;i++) {
	for (j = 0; j < COLS; j++) {
	    // Create an img tag called cell
	    var cell = document.createElement("img");

	    // Set its CSS class to "cell"
	    cell.setAttribute("class", "cell");

	    // Add img tag to the <div id="stage"> tag
	    stage.appendChild(cell);

	    cell.src = "images/walls/wall_" +  mapArray[i * COLS + j] + ".png";

	    cell.style.top = i * SIZE + "px";
	    cell.style.left = j * SIZE + "px";
	}
    }
}


