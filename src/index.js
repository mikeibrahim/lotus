console.clear();

let app = new App();

function setup() {
	createCanvas(800, 800, WEBGL);
	
	let font = loadFont("../misc/roboto.ttf");
	textFont(font);

	app.init();
}
function draw() {
	app.update();
}
function keyPressed() {
	app.keyPressed();
}