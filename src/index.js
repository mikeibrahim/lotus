// console.clear();

let app = new App();

let font = null;
function preload() {
	let path = "../misc/roboto.ttf"
	font = loadFont(path);
	console.log("Font loaded: ", font);
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