let app = new App();
let font;

function preload() {
	font = loadFont("assets/fonts/Roboto-Regular.ttf");
}
function setup() {
	let canvas = createCanvas(800, 800, WEBGL);
	canvas.style("display", "block");
	canvas.style("width", "min(100vh, 100vw)");
	canvas.style("height", "min(100vh, 100vw)");
	textFont(font);
	app.init();
}
function draw() {
	app.update();
}
function keyPressed() {
	app.keyPressed();
}
function mousePressed() {
	app.mousePressed();
}