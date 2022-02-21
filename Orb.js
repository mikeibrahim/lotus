class Orb {
	// Data
	#color;
	#size;
	#position;

	// Constructor
	constructor() {
		this.#size = 50;
		this.#position = ENVIRONMENT.getRandomPosition(this.#size);
		this.#color = color(0, 0, 255);
	}

	// Public Getters
	getPosition() { return this.#position; }
	getSize() { return this.#size; }

	// Public Methods
	update() {
		this.#detectPlayerCollision();
		this.#render();
	}
	destroy() {
		ORBS.splice(ORBS.indexOf(this), 1);
	}

	// Private Methods
	#detectPlayerCollision() {
		PLAYER.tryCollide(this);
	}
	#render() {
		fill(this.#color);
		stroke(0);
		strokeWeight(0);
		circle(this.#position.x, this.#position.y, this.#size);
	}
}