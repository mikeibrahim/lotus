class Game extends Page {
	//#region Data
	static inst;
	#enemies;
	#orbs;
	#hearts;
	#particleSystems;
	//#endregion

	//#region Constructor
	constructor() {
		super();
		Game.inst = this;
		this.#enemies = [];
		this.#orbs = [];
		this.#hearts = [];
		this.#particleSystems = [];
	}
	//#endregion

	//#region Public Setters
	addEnemy(enemy) { this.#enemies.push(enemy); }
	removeEnemy(enemy) { this.#enemies.splice(this.#enemies.indexOf(enemy), 1); }
	addOrb(orb) { this.#orbs.push(orb); GameUI.inst.addCurrentOrbs(-1); }
	removeOrb(orb) {
		this.#orbs.splice(this.#orbs.indexOf(orb), 1);
		GameUI.inst.addCurrentOrbs(1);
		if (this.#orbs.length == 0) RoundManager.inst.nextRound();
	}
	addParticleSystem(particleSystem) { this.#particleSystems.push(particleSystem); }
	removeParticleSystem(particleSystem) { this.#particleSystems.splice(this.#particleSystems.indexOf(particleSystem), 1); }
	addHeart(heart) { this.#hearts.push(heart); }
	removeHeart(heart) { this.#hearts.splice(this.#hearts.indexOf(heart), 1); }
	//#endregion

	//#region Public Getters
	getEnemies() { return this.#enemies; }
	getOrbs() { return this.#orbs; }
	//#endregion

	//#region Overrides
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
		Player.inst.keyPressed();
	}
	mousePressed() {
		super.mousePressed();
		Player.inst.mousePressed();
	}
	takeDown() {
		super.takeDown();
		Environment.inst.takeDown();
		GameUI.inst.takeDown();
		PlayerCamera.inst.takeDown();
		Player.inst.takeDown();
		RoundManager.inst.takeDown();
	}
	endGame() {
		App.inst.switchPage("confirmation");
		let roundReached = "Rounds Completed: " + (getItem("currentRound") || 0);
		Confirmation.inst.setConfirmationText("Game Over\n" + roundReached + "\nRestart?");
		Confirmation.inst.setYesCallback(() => {
			App.inst.switchPage("game");
		});
		Confirmation.inst.setNoCallback(() => {
			App.inst.switchPage("mainMenu");
		});
		storeItem("currentRound", 0);
	}
	//#endregion

	//#region Public Methods
	clearObjects() {
		this.#enemies = [];
		this.#orbs = [];
		this.#hearts = [];
		this.#particleSystems = [];
		GameUI.inst.setCurrentOrbs(0);
	}
	//#endregion

	//#region Private Methods
	#startGame() {
		Difficulty.inst.applyDifficulty();
		new Environment(2500);
		// Player.inst = new Player();
		new GameUI();
		new PlayerCamera();
		let characterType = getItem("characterType") || Characters.LOTUS;
		Characters.getCharacterObject(characterType);
		new RoundManager();

		// Start Ups
		Environment.inst.startUp();
		GameUI.inst.startUp();
		let currentRound = getItem("currentRound") || 0;
		if (currentRound == 0) storeItem("currentHealth", Player.inst.getMaxHealth());
		Player.inst.startUp();
		PlayerCamera.inst.startUp();
		RoundManager.inst.startUp();
		RoundManager.inst.loadRound(currentRound);
	}
	#updateGame() {
		Environment.inst.update();
		this.#enemies.forEach(enemy => enemy.update());
		Player.inst.update();
		RoundManager.inst.update();
		PlayerCamera.inst.update();
		this.#orbs.forEach(orb => orb.update());
		this.#hearts.forEach(heart => heart.update());
		this.#particleSystems.forEach(particleSystem => particleSystem.update());
		GameUI.inst.update();
	}
	#exitGame() {
		App.inst.switchPage("mainMenu");
	}
	//#endregion
}