class App2 {
	#STATE;
	// Constructor
	constructor() {
		this.STATES = {
			MAIN_MENU: 0,
			GAME: 1,
			PAUSE: 2,
			GAME_OVER: 3
		};
		this.#STATE = this.STATES.MAIN_MENU;

		// Game Data
		this.PLAYER = null;
		this.PLAYER_CAMERA = null;
		this.ENVIRONMENT = null;
		this.ROUND_MANAGER = null;
		this.ENEMIES = [];
		this.ORBS = [];
		this.PARTICLE_SYSTEMS = [];
	}

	// Public Methods
	init() {
		// make button to start game
		switch (this.#STATE) {
			case this.STATES.MAIN_MENU:
				this.#initMainMenu();
				break;
			case this.STATES.GAME:
				this.#initGame();
				break;
			case this.STATES.PAUSE:
				this.#initPause();
				break;
			case this.STATES.GAME_OVER:
				this.#initGameOver();
				break;
		}
		// Game Data
		// Environment
		this.ENVIRONMENT = new Environment(2500);
		// Player
		this.PLAYER = new Player({
			position: createVector(200, 200),
			size: 100,
			speed: 500,
			color: color(200, 200, 255)
		});
		this.PLAYER_CAMERA = new PlayerCamera({ player: this.PLAYER });
		// Rounds
		this.ROUND_MANAGER = new RoundManager();
		this.ROUND_MANAGER.loadRound(0);
	}
	update() {
		background(20);
		switch (this.#STATE) {
			case this.STATES.MAIN_MENU:
				this.#updateMainMenu();
				break;
			case this.STATES.GAME:
				this.#updateGame();
				break;
			case this.STATES.PAUSE:
				this.#updatePause();
				break;
			case this.STATES.GAME_OVER:
				this.#updateGameOver();
				break;
		}
	}
	switchPage(page) {
		this.#STATE = page;
	}

	// Private Methods
	#initMainMenu() {
		// create  button in center of screen
		let button = createButton("Start Game");
		button.position(width / 2 - button.width / 2, height / 2 - button.height / 2);
		button.mousePressed(() => {
			console.log("Start Game");
		});
	}
	#updateMainMenu() {
		textSize(32);
		textAlign(CENTER, CENTER);
		fill(255);
		text("Press any key to start", 0, 0);
	}
	#initGame() {

	}
	#updateGame() {
		this.PLAYER_CAMERA.update();
		this.PLAYER.update();
		this.ROUND_MANAGER.update();
		this.ENEMIES.forEach(enemy => enemy.update());
		this.ORBS.forEach(orb => orb.update());
		this.PARTICLE_SYSTEMS.forEach(particleSystem => particleSystem.update());
		this.ENVIRONMENT.update();
	}
	#initPause() {
	}
	#updatePause() {
		textSize(32);
		textAlign(CENTER, CENTER);
		fill(255);
		text("PAUSE", 0, 0);
	}
	#initGameOver() {
		
	}
	#updateGameOver() {
		textSize(32);
		textAlign(CENTER, CENTER);
		fill(255);
		text("GAME OVER", 0, 0);
	}
}