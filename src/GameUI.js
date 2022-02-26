class GameUI {
	// Data
	static inst;
	#playerCurrentHealth;
	#playerMaxHealth;

	// Constructor
	constructor() {
		GameUI.inst = this;
		this.#playerMaxHealth = 0;
		this.#playerCurrentHealth = 0;
	}

	// Public Setters
	setPlayerMaxHealth(health) { this.#playerMaxHealth = health; }
	setPlayerCurrentHealth(health) { this.#playerCurrentHealth = health; }


	// Public Methods
	update() {
		this.#render();
	}

	// Private Methods
	#render() {
		// Health count
		fill(255);
		textSize(100);
		textAlign(LEFT);
		let pos = PlayerCamera.inst.getPosition();
		let zoom = PlayerCamera.inst.getCurrentZoom();
		text(`Health: ${this.#playerCurrentHealth}/${this.#playerMaxHealth}`, -width / 2 - zoom + pos.x + 50, -height / 2 - zoom + pos.y + 100);
	}
}