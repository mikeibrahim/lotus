let STATES = {
	MAIN_MENU: 0,
	GAME: 1,
	PAUSE: 2,
	GAME_OVER: 3
};
let STATE = STATES.GAME;

let PLAYER = null;
let PLAYER_CAMERA = null;
let ENVIRONMENT = null;
let ROUND_MANAGER = null;
let ENEMIES = [];
let ORBS = [];
let PARTICLE_SYSTEMS = [];

function setup() {
	// load and set font
	createCanvas(800, 800, WEBGL);
	let font = loadFont("./roboto.ttf");
	textFont(font);
	// Environment
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
	if (STATE === STATES.MAIN_MENU) {
		drawMainMenu();
	} else if (STATE === STATES.GAME) {
		drawGame();
	} else if (STATE === STATES.PAUSE) {
		drawPause();
	} else if (STATE === STATES.GAME_OVER) {
		drawGameOver();
	}
}

function drawMainMenu() {
	textSize(32);
	textAlign(CENTER, CENTER);
	fill(255);
	text("Press any key to start", 0, 0);
}

function drawGame() {
	PLAYER_CAMERA.update();
	PLAYER.update();
	ROUND_MANAGER.update();
	ENEMIES.forEach(enemy => enemy.update());
	ORBS.forEach(orb => orb.update());
	PARTICLE_SYSTEMS.forEach(particleSystem => particleSystem.update());
	ENVIRONMENT.update();
}

function drawPause() {
	textSize(32);
	textAlign(CENTER, CENTER);
	fill(255);
	text("PAUSE", 0, 0);
}

function drawGameOver() {
	textSize(32);
	textAlign(CENTER, CENTER);
	fill(255);
	text("GAME OVER", 0, 0);
}