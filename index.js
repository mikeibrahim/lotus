let PLAYER = null;
let PLAYER_CAMERA = null;
let ENVIRONMENT = null;
let ROUND_MANAGER = null;
let ENEMIES = [];
let ORBS = [];
let PARTICLE_SYSTEMS = [];

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
	ROUND_MANAGER = new RoundManager();
	ROUND_MANAGER.loadRound(0);
}
function draw() {
	background(20);
	PLAYER_CAMERA.update();
	PLAYER.update();
	ROUND_MANAGER.update();
	ENEMIES.forEach(enemy => enemy.update());
	ORBS.forEach(orb => orb.update());
	PARTICLE_SYSTEMS.forEach(particleSystem => particleSystem.update());
	ENVIRONMENT.update();
}