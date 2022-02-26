class Game extends Page {
	// Data
	static inst;
	#environment;
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
			speed: 2,
			maxZoom: 500,
			zoomSpeed: 1
		});
		// Rounds
		this.#roundManager = new RoundManager();
		this.#roundManager.loadRound(0);
	}
	update() {
		super.update();
		this.#playerCamera.update();
		this.#player.update();
		this.#roundManager.update();
		Game.inst.enemies.forEach(enemy => enemy.update());
		Game.inst.orbs.forEach(orb => orb.update());
		Game.inst.particleSystems.forEach(particleSystem => particleSystem.update());
		this.#environment.update();
		this.#gameUI.update();
	}
	takeDown() {
	}
}