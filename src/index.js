let app = new App();

let font;

function preload() {
	font = loadFont("assets/fonts/Roboto-Regular.ttf");
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