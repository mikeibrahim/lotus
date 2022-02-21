class Player {
	// Data
	#maxHealth;
	#size;
	#speed;
	#maxInvincibilityTime;
	#color;
	// Updated Data
	#currentHealth;
	#currentInvincibilityTime;
	#position;
	#moveDirection;

	// Constructor
	constructor({ maxHealth, position, size, speed, maxInvincibilityTime, color }) {
		// Data
		this.#maxHealth = maxHealth || 3;
		this.#size = size || 100;
		this.#speed = speed || 500;
		this.#maxInvincibilityTime = maxInvincibilityTime || 1000;
		this.#color = color || color(255, 0, 0);
		// Updated Data
		this.#currentHealth = this.#maxHealth;
		this.#currentInvincibilityTime = 0;
		this.#position = position || createVector(0, 0);
		this.#moveDirection = createVector(0, 0);
	}
	// Public Getters
	getPosition() { return this.#position; }
	getSize() { return this.#size; }

	// Private Getters
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

	// Public Methods
	update() {
		this.#move();
		this.#invincibility();
		this.#render();
	}
	collideWith(collision) {
		if (collision instanceof Enemy) {
			this.#takeDamage(collision.getDamage());
		}
	}

	// Private Methods
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
		if (this.#currentInvincibilityTime > 0 && this.#currentInvincibilityTime % interval > interval / 2)
			fill(color(red(this.#color), green(this.#color), blue(this.#color), 100));
	}
	#render() {
		fill(this.#color);
		this.#invincibilityFill();
		circle(this.#position.x, this.#position.y, this.#size);
	}
	#invincibility() {
		if (this.#currentInvincibilityTime > 0) {
			this.#currentInvincibilityTime -= deltaTime;
		}
	}

	#takeDamage(damage) {
		if (this.#currentInvincibilityTime <= 0) { // If not invincible
			this.#currentHealth -= damage; // Take damage
			this.#currentInvincibilityTime = this.#maxInvincibilityTime; // Start invincibility
			console.log("Player took " + damage + " damage");
		}

		// Clamp
		this.#currentHealth = constrain(this.#currentHealth, 0, this.#maxHealth);
		this.#currentInvincibilityTime = constrain(this.#currentInvincibilityTime, 0, this.#maxInvincibilityTime);

		// Death
		if (this.#currentHealth <= 0) this.#die();
	}
	#die() {
		console.log("Player died");
	}
}