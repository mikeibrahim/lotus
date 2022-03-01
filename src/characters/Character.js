class Character {
	// Data
	static inst;
	#playerSizeMultiplier;
	#playerSpeedMultiplier;
	#playerColor;
	#playerSize;

	// Constructor
	constructor() {
		this.#playerSizeMultiplier = 1;
		this.#playerSpeedMultiplier = 1;
		this.#playerSize = 1;
		this.#playerColor = color(0, 0, 0);
	}

	// Public Getters
	getPlayerSize() { return this.#playerSizeMultiplier * this.#playerSize; }
	getPlayerSizeMultiplier() { return this.#playerSizeMultiplier; }
	getPlayerSpeedMultiplier() { return this.#playerSpeedMultiplier; }
	getPlayerColor() { return this.#playerColor; }

	// Public Methods
	startUp(name) {
		let stats = Characters.getCharacter(name);
		this.#playerSizeMultiplier = stats.size;
		this.#playerSpeedMultiplier = stats.speed;
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

	// Private Methods
	#setPlayerAttributes() {
		Player.inst.setSpeedMultiplier(this.#playerSpeedMultiplier);
		Player.inst.setSizeMultiplier(this.#playerSizeMultiplier);
		Player.inst.setColor(this.#playerColor);
		this.#playerSize = Player.inst.getSize();
	}
}