console.clear();

let app = new App();

let font = null;
function preload() {
	font = loadFont("../misc/roboto.ttf");
}

function setup() {
	createCanvas(800, 800, WEBGL);
	
	textFont(font);

	app.init();
}
function draw() {
	app.update();
}
function keyPressed() {
	app.keyPressed();
}