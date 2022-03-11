class Character {
//#region Data
	static inst;
	#playerMaxHealth;
	#playerSizeMultiplier;
	#playerSpeedMultiplier;
	#playerColor;
	#playerSize;
	#playerSpeed;
//#endregion

//#region Constructor
	constructor() {
		this.#playerMaxHealth = 1;
		this.#playerSizeMultiplier = 1;
		this.#playerSpeedMultiplier = 1;
		this.#playerSize = 1;
		this.#playerSpeed = 1;
		this.#playerColor = color(0, 0, 0);
	}
//#endregion

//#region Public Getters
	getMaxHealth() { return this.#playerMaxHealth; }
	getPlayerSizeMultiplier() { return this.#playerSizeMultiplier; }
	getPlayerSpeedMultiplier() { return this.#playerSpeedMultiplier; }
	getPlayerSize() { return this.#playerSize; }
	getPlayerSpeed() { return this.#playerSpeed; }
	getPlayerColor() { return this.#playerColor; }
//#endregion

//#region Public Methods
	startUp({characterType, maxHealth, sizeMultiplier, speedMultiplier}) {
		this.#playerMaxHealth = maxHealth;
		this.#playerSizeMultiplier = sizeMultiplier;
		this.#playerSpeedMultiplier = speedMultiplier;
		let stats = Characters.getCharacters()[characterType];
		this.#playerColor = stats.color;
		this.#setPlayerAttributes();
	} // Called once
	update() {
		this.passiveAbility();
	}
	keyPressed() {
		if (keyIsDown(' '.charCodeAt(0))) this.activeAbility();
	}
	nextRound() {}
	takeDown() {} // Called once
	passiveAbility() {} // Every frame
	activeAbility() {} // Every time user clicks space
//#endregion

//#region Private Methods
	#setPlayerAttributes() {
		Player.inst.setMaxHealth(this.#playerMaxHealth);
		Player.inst.setSpeedMultiplier(this.#playerSpeedMultiplier);
		Player.inst.setSizeMultiplier(this.#playerSizeMultiplier);
		Player.inst.setColor(this.#playerColor);
		this.#playerSize = Player.inst.getSize();
		this.#playerSpeed = Player.inst.getSpeed();
	}
//#endregion
}