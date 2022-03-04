class GameUI {
//#region Data
	static inst;
	#currentRound;
	#currentHealth;
	#maxHealth;
	#currentOrbs;
	#maxOrbs;
//#endregion

//#region Constructor
	constructor() {
		GameUI.inst = this;
		this.#currentRound = 0;
		this.#currentHealth = 0;
		this.#maxHealth = 0;
		this.#currentOrbs = 0;
		this.#maxOrbs = 0;
	}
//#endregion

//#region Public Setters
	setCurrentRound(round) { this.#currentRound = round; }
	setCurrentHealth(health) { this.#currentHealth = health; }
	setMaxHealth(health) { this.#maxHealth = health; }
	setCurrentOrbs(orbs) { this.#currentOrbs = orbs; }
	addCurrentOrbs(orbs) { this.#currentOrbs += orbs; }
	setMaxOrbs(orbs) { this.#maxOrbs = orbs; }
//#endregion

//#region Public Methods
	startUp() {
		
	}
	update() {
		this.#render();
	}
	takeDown() {
	}
//#endregion

//#region Private Methods
	#render() {
		let buffer = 100;
		let pos = PlayerCamera.inst.getPosition();
		let zoom = PlayerCamera.inst.getCurrentZoom();
		fill(255);
		textSize(zoom / 15 + 30);
		textAlign(LEFT);
		text(
			`Health: ${this.#currentHealth}/${this.#maxHealth}`,
			-width / 2 - zoom + pos.x + buffer,
			-height / 2 - zoom + pos.y + buffer
		);
		textAlign(RIGHT);
		text(
			`Orbs: ${this.#currentOrbs}/${this.#maxOrbs}`,
			width / 2 + zoom + pos.x - buffer,
			-height / 2 - zoom + pos.y + buffer
		);
		textSize(zoom / 15 + 40);
		textAlign(CENTER);
		text(
			`Round: ${this.#currentRound}`,
			pos.x,
			-height / 2 - zoom + pos.y + buffer
		);
	}
//#endregion
}