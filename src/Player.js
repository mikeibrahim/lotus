class Player extends Interactable {
	//#region Data
	static inst;
	#maxHealth;
	#currentHealth;
	#maxInvincibilityTime;
	#currentInvincibilityTime;
	#mouseToggle;
	//#endregion

	//#region Constructor
	constructor({maxHealth, size, speed, color}) {
		super({ targets: () => [], size: size, speed: speed, color: color})
		this.#maxHealth = maxHealth;
		this.#currentHealth = maxHealth;
		super.setPosition(createVector(0, 0));
		this.#maxInvincibilityTime = 1000;
		this.#currentInvincibilityTime = 0;
		this.#mouseToggle = false;
	}
	//#endregion

	//#region Public Setters
	setMaxHealth(maxHealth) { this.#maxHealth = maxHealth; }
	setInvincibility(time) { this.#currentInvincibilityTime = time; }
	//#endregion

	//#region Public Getters
	getMaxHealth() { return this.#maxHealth; }
	getCurrentHealth() { return this.#currentHealth; }
	isInvincible() { return this.#currentInvincibilityTime > 0; }
	//#endregion

	//#region Private Getters
	#getInput() {
		let input = createVector(0, 0);
		if (App.inst.getKeyboardControls()) {
			const keys = { w: 87, a: 65, s: 83, d: 68, }
			if (keyIsDown(keys.w)) input.y--;
			if (keyIsDown(keys.a)) input.x--;
			if (keyIsDown(keys.s)) input.y++;
			if (keyIsDown(keys.d)) input.x++;
			input.normalize()
		} else {
			if (this.#mouseToggle) {
				let mouse = createVector(mouseX, mouseY);
				let centerScreen = createVector(width / 2, height / 2);
				input = p5.Vector.sub(mouse, centerScreen);
				let magnitude = Math.min(centerScreen.dist(mouse) / 150, 1);
				input.normalize().mult(magnitude);
			}
		}
		return input;
	}
	#getShiftMultiplier() {
		let shiftKey = 16;
		return keyIsDown(shiftKey) ? 0.5 : 1;
	}
	//#endregion

	//#region Callbacks
	startUp() {
		this.#currentHealth = getItem("currentHealth") || this.#maxHealth;
		GameUI.inst.setMaxHealth(this.#maxHealth);
		GameUI.inst.setCurrentHealth(this.#currentHealth);
	}
	update() {
		super.update()
		this.#invincibility();
		this.#invincibilityFill();
		this.#updateVelocity();
		this.#detectEnvironmentCollision();
	}
	mousePressed() {
		this.#mouseToggle = !this.#mouseToggle;
	}
	takeDown() {
	}
	//#endregion

	//#region Public Methods
	heal(amount) {
		this.#currentHealth += amount;
		if (Difficulty.inst.getDifficulty() == "daredevil") this.#currentHealth = constrain(this.#currentHealth, 0, this.#maxHealth);
		GameUI.inst.setCurrentHealth(this.#currentHealth);
		App.inst.changeBackground(45, 1);
	}
	takeDamage(damage) {
		if (this.#currentInvincibilityTime > 0) return; // Player is invincible

		this.#currentHealth -= damage; // Take damage
		this.#currentInvincibilityTime = constrain(this.#currentInvincibilityTime, 0, this.#maxInvincibilityTime);
		if (this.#currentHealth <= 0) { this.#die(); return; }
		else this.#currentInvincibilityTime = this.#maxInvincibilityTime; // Start invincibility

		GameUI.inst.setCurrentHealth(this.#currentHealth);
		new ParticleSystem({
			count: 10,
			lifeTime: 500,
			color: color(red(super.getColor()), green(super.getColor()), blue(super.getColor()), 100),
			speed: 300,
			size: super.getSize(),
			position: super.getPosition()
		});
		PlayerCamera.inst.shake(200, 50);
		App.inst.changeBackground(20, 0.5);
	}
	//#endregion

	//#region Private Methods
	#invincibility() {
		if (this.#currentInvincibilityTime > 0) this.#currentInvincibilityTime -= deltaTime;
	}
	#detectEnvironmentCollision() {
		let size = Environment.inst.getSize();
		let min = (-size / 2) + (super.getSize() / 2);
		let max = (size / 2) - (super.getSize() / 2);
		super.setPosition(createVector(constrain(super.getPosition().x, min, max), constrain(super.getPosition().y, min, max)));
	}
	// #updateSize() {
	// 	super.setSize(lerp(super.getSize(), this.#size, 10 * (deltaTime / 1000)));
	// }
	#updateVelocity() {
		super.setVelocity(this.#getInput().mult(this.#getShiftMultiplier()));
	}
	#invincibilityFill() {
		if (this.#currentInvincibilityTime > 0) super.pulsate({ speed: 0.7, opacity: 0.5 });
		else super.setCurrentColor(super.getColor());
	}
	#die() {
		Game.inst.endGame();
	}
	//#endregion
}