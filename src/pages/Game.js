class Game extends Page {
//#region Data
	static inst;
	#environment;
	#character;
	#player;
	#playerCamera;
	#gameUI;
	#roundManager;
	static enemies;
	static orbs;
	static hearts;
	static particleSystems;
//#endregion

//#region Constructor
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
		Game.inst.hearts = [];
		Game.inst.particleSystems = [];
	}
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
		this.#character.keyPressed();
	}
	mousePressed() {
		super.mousePressed();
		Player.inst.mousePressed();
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
	endGame() {
		App.inst.switchPage("confirmation");
		let roundReached = "Rounds Completed: " + (getItem("currentRound") || 0);
		Confirmation.inst.setConfirmationText("Game Over\n"+roundReached+"\nRestart?");
		Confirmation.inst.setYesCallback(() => {
			App.inst.switchPage("game");
		});
		Confirmation.inst.setNoCallback(() => {
			App.inst.switchPage("mainMenu");
		});
		storeItem("currentRound", 0);
	}
//#endregion

//#region Private Methods
	#startGame() {
		this.#environment = new Environment(2500);
		this.#gameUI = new GameUI();
		this.#player = new Player();
		this.#playerCamera = new PlayerCamera();
		let characterType = getItem("characterType") || Characters.getCharacters()[0].characterType;
		this.#character = Characters.getCharacterObject(characterType);
		this.#roundManager = new RoundManager();

		// Start Ups
		this.#environment.startUp();
		this.#gameUI.startUp();
		this.#character.startUp();
		let currentRound = getItem("currentRound") || 0;
		if (currentRound == 0) storeItem("currentHealth", this.#character.getMaxHealth());
		this.#player.startUp();
		this.#playerCamera.startUp();
		this.#roundManager.startUp();
		this.#roundManager.loadRound(currentRound);
	}
	#updateGame() {
		this.#environment.update();
		this.#player.update();
		this.#character.update();
		this.#playerCamera.update();
		this.#roundManager.update();
		Game.inst.enemies.forEach(enemy => enemy.update());
		Game.inst.orbs.forEach(orb => orb.update());
		Game.inst.hearts.forEach(heart => heart.update());
		Game.inst.particleSystems.forEach(particleSystem => particleSystem.update());
		this.#gameUI.update();
	}
	#exitGame() {
		App.inst.switchPage("mainMenu");
	}
//#endregion
}