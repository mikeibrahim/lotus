class Character {
	// Data
	static inst;
	#playerSize;
	#playerSpeed;
	#playerColor;

	// Constructor
	constructor() {
		this.#playerSize = 1;
		this.#playerSpeed = 1;
		this.#playerColor = color(0, 0, 0);
	}

	// Public Getters
	getPlayerSize() { return this.#playerSize; }
	getPlayerSpeed() { return this.#playerSpeed; }
	getPlayerColor() { return this.#playerColor; }

	// Public Methods
	startUp(name) {
		let stats = Characters.getCharacter(name);
		this.#playerSize = stats.size;
		this.#playerSpeed = stats.speed;
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
		Player.inst.setSpeedMultiplier(this.#playerSpeed);
		Player.inst.setSizeMultiplier(this.#playerSize);
		Player.inst.setColor(this.#playerColor);
	}
}