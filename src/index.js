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

// // Utility functions
// function star(x, y, radius1, radius2, npoints) {
// 	let angle = TWO_PI / npoints;
// 	let halfAngle = angle / 2.0;
// 	beginShape();
// 	for (let a = 0; a < TWO_PI; a += angle) {
// 		let sx = x + cos(a) * radius2;
// 		let sy = y + sin(a) * radius2;
// 		vertex(sx, sy);
// 		sx = x + cos(a + halfAngle) * radius1;
// 		sy = y + sin(a + halfAngle) * radius1;
// 		vertex(sx, sy);
// 	}
// 	endShape(CLOSE);
// }