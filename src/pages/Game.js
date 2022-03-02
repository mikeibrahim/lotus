class Game extends Page {
	// Data
	static inst;
	#environment;
	#character;
	#player;
	#playerCamera;
	#gameUI;
	#roundManager;
	static enemies;
	static orbs;
	static particleSystems;

	// Constructor
	constructor() {
		super();
		console.log("Game Page");
		Game.inst = this;
		this.#environment = null;
		this.#character = null;
		this.#player = null;
		this.#playerCamera = null;
		this.#gameUI = null;
		this.#roundManager = null;
		Game.inst.enemies = [];
		Game.inst.orbs = [];
		Game.inst.particleSystems = [];
	}

	// Overrides
	startUp() {
		super.startUp();
		this.addAction({ char: ESCAPE, callback: () => this.#exitGame() });
		this.#startGame();
	}
	update() {
		super.update();
		this.#updateGame();
	}
	keyPressed() {
		super.keyPressed();
		this.#character.keyPressed();
	}
	takeDown() {
		super.takeDown();
		this.#environment.takeDown();
		this.#gameUI.takeDown();
		this.#player.takeDown();
		this.#playerCamera.takeDown();
		this.#character.takeDown();
		this.#roundManager.takeDown();
	}

	// Private Methods
	#startGame() {
		this.#environment = new Environment(2500);
		this.#gameUI = new GameUI();
		this.#player = new Player({
			position: createVector(200, 200),
			size: 100,
			speed: 500,
			color: color(200, 200, 255)
		});
		this.#playerCamera = new PlayerCamera({
			speed: 4,
			maxZoom: 500,
			zoomSpeed: 1
		});
		let character = getItem("character") || Characters.getCharacters()[0];
		this.#character = Characters.getCharacterType(character.name);
		this.#roundManager = new RoundManager();

		// Start Ups
		this.#environment.startUp();
		this.#gameUI.startUp();
		this.#player.startUp();
		this.#playerCamera.startUp();
		this.#character.startUp();
		this.#roundManager.startUp();
		let currentRound = getItem("currentRound") || 0;
		this.#roundManager.loadRound(currentRound);
	}
	#updateGame() {
		this.#playerCamera.update();
		this.#player.update();
		this.#character.update();
		this.#roundManager.update();
		Game.inst.enemies.forEach(enemy => enemy.update());
		Game.inst.orbs.forEach(orb => orb.update());
		Game.inst.particleSystems.forEach(particleSystem => particleSystem.update());
		this.#environment.update();
		this.#gameUI.update();
	}
	#exitGame() {
		this.takeDown();
		App.inst.switchPage("mainMenu");
	}
}