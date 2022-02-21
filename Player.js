class Player {
	// Data
	#position;
	#size;
	#speed;
	#moveDirection;
	#color;

	// Constructor
	constructor({ position, size, speed, color }) {
		this.#position = position || createVector(0, 0);
		this.#size = size || 100;
		this.#speed = speed || 500;
		this.#moveDirection = createVector(0, 0);
		this.#color = color || color(255, 0, 0);
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
		this.#render();
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
	#render() {
		fill(this.#color);
		circle(this.#position.x, this.#position.y, this.#size);
	}
}