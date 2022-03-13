class GameUI {
	//#region Data
	static inst;
	#currentRound;
	#maxHealth;
	#currentHealth;
	#maxOrbs;
	#currentOrbs;
	//#endregion

	//#region Constructor
	constructor() {
		GameUI.inst = this;
		this.#currentRound = 0;
		this.#maxHealth = 0;
		this.#currentHealth = 0;
		this.#maxOrbs = 0;
		this.#currentOrbs = 0;
	}
	//#endregion

	//#region Public Setters
	setCurrentRound(round) { this.#currentRound = round; }
	setMaxHealth(health) { this.#maxHealth = health; }
	setCurrentHealth(health) { this.#currentHealth = health; }
	setMaxOrbs(orbs) { this.#maxOrbs = orbs; }
	setCurrentOrbs(orbs) { this.#currentOrbs = orbs; }
	addCurrentOrbs(orbs) { this.#currentOrbs += orbs; }
	//#endregion

	//#region Public Getters
	getCurrentOrbs() { return this.#currentOrbs; }
	//#endregion

	//#region Public Methods
	startUp() {

	}
	update() {
		this.#renderTexts();
		this.#renderOrbIndicators();
	}
	takeDown() {
	}
	//#endregion

	//#region Private Methods
	#renderTexts() {
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
	#renderOrbIndicators() {
		let radius = 300;
		let pos = PlayerCamera.inst.getPosition();
		Game.inst.getOrbs().forEach(orb => {
			let orbPos = orb.getPosition();
			let dir = p5.Vector.sub(orbPos, pos);
			let dist = dir.mag();
			let angle = dir.heading();
			let x = min(radius, dist) * cos(angle);
			let y = min(radius, dist) * sin(angle);
			let color = orb.getColor();
			let size = orb.getSize();
			fill(red(color), green(color), blue(color), max(((width / 3) / dist) * 255), 150);
			stroke(0);
			strokeWeight(0);
			circle(x + pos.x, y + pos.y, size);
		});
	}
	//#endregion
}