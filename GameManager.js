let PLAYER = null;
let PLAYER_CAMERA = null;
let ENVIRONMENT = null;
let ROUNDS = null;
let ENEMIES = [];

function setup() {
	// Environment
	createCanvas(800, 800, WEBGL);
	ENVIRONMENT = new Environment(2500);
	// Player
	PLAYER = new Player({
		position: createVector(200, 200),
		size: 100,
		speed: 500,
		color: color(200, 200, 255)
	});
	PLAYER_CAMERA = new PlayerCamera({player: PLAYER});
	// Rounds
	ROUNDS = new Rounds();
	ROUNDS.loadRound(0);
}
function draw() {
	background(20);
	PLAYER_CAMERA.update();
	PLAYER.update();
	ENEMIES.forEach(enemy => enemy.update());
	ENVIRONMENT.update();
}