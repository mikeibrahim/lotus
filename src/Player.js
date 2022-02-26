class Player {
	// Data
	static inst;
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
		Player.inst = this;
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
		// Game UI
		GameUI.inst.setPlayerMaxHealth(this.#maxHealth);
		GameUI.inst.setPlayerCurrentHealth(this.#currentHealth);
	}
	
	// Public Setters
	setInvincibility(time) {
		this.#currentInvincibilityTime = time;
	}

	// Public Getters
	getPosition() { return this.#position; }
	getSize() { return this.#size; }
	getCurrentHealth() { return this.#currentHealth; }
	getMaxHealth() { return this.#maxHealth; }

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
		this.#invincibility();
		this.#move();
		this.#detectEnvironmentCollision();
		this.#render();
	}
	resetPosition() {
		this.#position.mult(0);
	}
	#isTouching(object) {
		let position = object.getPosition();
		let size = object.getSize();
		return this.#position.dist(position) < (this.#size / 2) + (size / 2);
	}
	tryCollide(collision) {
		if (!this.#isTouching(collision)) return;

		switch (collision.constructor.name) {
			case 'Enemy':
				this.#takeDamage(collision.getDamage());
				break;
			case 'Orb':
				collision.destroy();
				break;
			default:
				break;
		}
	}

	// Private Methods
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
	#render() {
		fill(this.#color);
		stroke(0);
		strokeWeight(5);
		this.#invincibilityFill();
		circle(this.#position.x, this.#position.y, this.#size);
	}
	#takeDamage(damage) {
		if (this.#currentInvincibilityTime > 0) return; // Player is invincible
		this.#currentHealth -= damage; // Take damage
		this.#currentHealth = constrain(this.#currentHealth, 0, this.#maxHealth);
		this.#currentInvincibilityTime = constrain(this.#currentInvincibilityTime, 0, this.#maxInvincibilityTime);
		if (this.#currentHealth <= 0) this.#die();
		else this.#currentInvincibilityTime = this.#maxInvincibilityTime; // Start invincibility

		GameUI.inst.setPlayerCurrentHealth(this.#currentHealth);
		new ParticleSystem({
			count: 10,
			lifeTime: 500,
			color: color(red(this.#color), green(this.#color), blue(this.#color), 100),
			speed: 300,
			size: this.#size,
			position: this.#position
		});
		PlayerCamera.inst.shake(200, 50);
	}
	#die() {
		// TODO: death screen
		RoundManager.inst.loadRound(0);
	}
}