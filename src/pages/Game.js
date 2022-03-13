class Game extends Page {
//#region Data
	static inst;
	static enemies;
	static orbs;
	static hearts;
	static particleSystems;
//#endregion

//#region Constructor
	constructor() {
		super();
		Game.inst = this;
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
		Game.inst.enemies.forEach(enemy => enemy.update());
		Player.inst.update();
		RoundManager.inst.update();
		PlayerCamera.inst.update();
		Game.inst.orbs.forEach(orb => orb.update());
		Game.inst.hearts.forEach(heart => heart.update());
		Game.inst.particleSystems.forEach(particleSystem => particleSystem.update());
		GameUI.inst.update();
	}
	#exitGame() {
		App.inst.switchPage("mainMenu");
	}
//#endregion
}