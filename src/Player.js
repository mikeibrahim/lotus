class Player {
//#region Data
	static inst;
	#maxHealth;
	#size;
	#speed;
	#maxInvincibilityTime;
	#color;
	#currentHealth;
	#currentInvincibilityTime;
	#position;
	#moveDirection;
//#endregion

//#region Constructor
	constructor({ position, size, speed, maxInvincibilityTime, color }) {
		Player.inst = this;
		// this.#maxHealth = maxHealth || 3;
		this.#size = size || 100;
		this.#speed = speed || 500;
		this.#maxInvincibilityTime = maxInvincibilityTime || 1000;
		this.#color = color || color(255, 0, 0);
		this.#maxHealth = 0;
		this.#currentHealth = 0;
		this.#currentInvincibilityTime = 0;
		this.#position = position || createVector(0, 0);
		this.#moveDirection = createVector(0, 0);
	}
//#endregion
	
//#region Public Setters
	setInvincibility(time) { this.#currentInvincibilityTime = time; }
	setSizeMultiplier(multiplier) { this.#size *= multiplier; }
	setSpeedMultiplier(multiplier) { this.#speed *= multiplier; }
	setMaxHealth(maxHealth) { this.#maxHealth = maxHealth; }
	setSize(size) { this.#size = size; }
	setSpeed(speed) { this.#speed = speed; }
	setColor(color) { this.#color = color; }
//#endregion

//#region Public Getters
	getPosition() { return this.#position; }
	getSize() { return this.#size; }
	getSpeed() { return this.#speed; }
	getCurrentHealth() { return this.#currentHealth; }
	getMaxHealth() { return this.#maxHealth; }
//#endregion

//#region Private Getters
	#getInput() {
		let input = createVector(0, 0);
		const keys = { w: 87, a: 65, s: 83, d: 68, }
		if (keyIsDown(keys.w)) input.y--;
		if (keyIsDown(keys.a)) input.x--;
		if (keyIsDown(keys.s)) input.y++;
		if (keyIsDown(keys.d)) input.x++;
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
		this.#invincibility();
		this.#move();
		this.#detectEnvironmentCollision();
		this.#renderPlayer();
	}
	takeDown() {
	}
//#endregion

//#region Public Methods
	resetPosition() {
		this.#position.mult(0);
	}
	isTouching(interactable) {
		let position = interactable.getPosition();
		let size = interactable.getSize();
		return this.#position.dist(position) < (this.#size / 2) + (size / 2);
	}
	heal(amount) {
		this.#currentHealth += amount;
		GameUI.inst.setCurrentHealth(this.#currentHealth);
		App.inst.changeBackground(45, 1);
	}
	takeDamage(damage) {
		if (this.#currentInvincibilityTime > 0) return; // Player is invincible

		this.#currentHealth -= damage; // Take damage
		this.#currentInvincibilityTime = constrain(this.#currentInvincibilityTime, 0, this.#maxInvincibilityTime);
		
		if (this.#currentHealth <= 0) this.#die();
		else this.#currentInvincibilityTime = this.#maxInvincibilityTime; // Start invincibility
		

		GameUI.inst.setCurrentHealth(this.#currentHealth);
		new ParticleSystem({
			count: 10,
			lifeTime: 500,
			color: color(red(this.#color), green(this.#color), blue(this.#color), 100),
			speed: 300,
			size: this.#size,
			position: this.#position
		});
		PlayerCamera.inst.shake(200, 50);
		App.inst.changeBackground(20, 0.5);
	}
//#endregion
	
//#region Private Methods
	#invincibility() {
		if (this.#currentInvincibilityTime > 0) {
			this.#currentInvincibilityTime -= deltaTime;
		}
	}
	#detectEnvironmentCollision() {
		let size = Environment.inst.getSize();
		let min = (-size / 2) + (this.#size / 2);
		let max = (size / 2) - (this.#size / 2);
		this.#position.x = constrain(this.#position.x, min, max);
		this.#position.y = constrain(this.#position.y, min, max);
	}
	#updateMoveDirection() {
		let input = this.#getInput();
		this.#moveDirection = input;
		this.#moveDirection.normalize();
	}
	#move() {
		this.#updateMoveDirection();
		this.#position.add(
			this.#moveDirection.copy().mult(
				this.#speed * this.#getShiftMultiplier() * (deltaTime / 1000)
			)
		);
	}
	#invincibilityFill() {
		let interval = 250;
		if (this.#currentInvincibilityTime > 0 && this.#currentInvincibilityTime % interval > interval / 3)
			fill(color(red(this.#color), green(this.#color), blue(this.#color), 100));
	}
	#renderPlayer() {
		stroke(0);
		strokeWeight(5);
		fill(this.#color);
		this.#invincibilityFill();
		circle(this.#position.x, this.#position.y, this.#size);
	}
	#die() {
		Game.inst.endGame();
	}
//#endregion
}