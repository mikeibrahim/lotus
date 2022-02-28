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
		// Environment
		this.#environment = new Environment(2500);
		// Game UI
		this.#gameUI = new GameUI();
		// // Player
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
		// Character
		let character = getItem("character") || Characters.getCharacters()[0];
		console.log(character);
		this.#character = Characters.getCharacterType(character.name);
		console.log(this.#character);
		this.#character.startUp();
		// Rounds
		this.#roundManager = new RoundManager();
		this.#roundManager.loadRound(0);
	}
	update() {
		super.update();
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
	keyPressed() {
		super.keyPressed();
		this.#character.keyPressed();
	}
	takeDown() {
		super.takeDown();
	}
}