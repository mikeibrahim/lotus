class Enemy extends Interactable {
	//#region Data
	#damage;
	#size;
	#speed;
	#color;
	#velocity;
	#position;
	#currentSize;
	//#endregion

	//#region Constructor
	constructor({ damage, size, speed, color }) {
		super({ size: size });
		this.#damage = damage || 1;
		this.#size = size || 100;
		this.#speed = speed || 500;
		this.#speed = Difficulty.enemySpeedScale(this.#speed);
		this.#color = color || color(255, 0, 0);
		this.#velocity = this.#randomVector();
		this.#position = super.getPosition();
		this.#currentSize = this.#size;
	}
	//#endregion

	//#region Public Setters
	setPosition(position) { this.#position = position; }
	setSpeedMultiplier(multiplier) { this.#speed *= multiplier; }
	setSizeMultiplier(multiplier) { this.#size *= multiplier; }
	//#endregion

	//#region Public Getters
	getPosition() { return this.#position; }
	getSize() { return this.#currentSize; }
	getSpeed() { return this.#speed; }
	//#endregion	

	//#region Callbacks
	update() {
		super.update();
		this.#move();
		this.#updateSize();
		this.#detectWallCollision();
		this.#render();
	}
	//#endregion

	//#region Overrides
	interact() {
		super.interact();
		Player.inst.takeDamage(this.#damage);
	}
	//#endregion

	//#region Private Methods
	#randomVector() { return createVector(random(-1, 1), random(-1, 1)).normalize(); }
	#move() {
		this.#position.add(this.#velocity.copy().mult(this.#speed * (deltaTime / 1000)));
		this.#constrainPosition();
		super.setPosition(this.#position);
	}
	#constrainPosition() {
		let size = Environment.inst.getSize();
		this.#position.x = constrain(this.#position.x, -size / 2, size / 2);
		this.#position.y = constrain(this.#position.y, -size / 2, size / 2);
	}
	#detectWallCollision() {
		let size = Environment.inst.getSize();
		// Reflect off walls
		if (this.#position.x - (this.#currentSize / 2) < -size / 2) this.#velocity.x = abs(this.#velocity.x);
		else if (this.#position.x + (this.#currentSize / 2) > size / 2) this.#velocity.x = -abs(this.#velocity.x);
		if (this.#position.y - (this.#currentSize / 2) < -size / 2) this.#velocity.y = abs(this.#velocity.y);
		else if (this.#position.y + (this.#currentSize / 2) > size / 2) this.#velocity.y = -abs(this.#velocity.y);
	}
	#updateSize() {
		this.#currentSize = lerp(this.#currentSize, this.#size, 5 * (deltaTime / 1000));
	}
	#render() {
		stroke(0);
		strokeWeight(5);
		fill(this.#color);
		circle(this.#position.x, this.#position.y, this.#currentSize);
	}
	//#endregion
}