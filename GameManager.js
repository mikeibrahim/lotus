let PLAYER = null;
let PLAYER_CAMERA = null;
let ENEMIES = [];

function setup() {
	createCanvas(800, 800, WEBGL);
	PLAYER = new Player({
		position: createVector(200, 200),
		size: 100,
		speed: 500,
		color: color(200, 200, 255)
	});
	PLAYER_CAMERA = new PlayerCamera({player: PLAYER});
	ENEMIES.push(new Enemy({
		player: PLAYER,
		position: createVector(0, 0),
		size: 100,
		speed: 500,
		color: color(255, 0, 0)
	}));
}
function draw() {
	background(20);
	PLAYER_CAMERA.update();
	PLAYER.update();
	ENEMIES.forEach(enemy => enemy.update());
}