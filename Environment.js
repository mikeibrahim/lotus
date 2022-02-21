class Environment {
	// Data
	#size;

	// Constructor
	constructor(size) {
		// Data
		this.#size = size;
	}

	// Public Getters
	getSize() { return this.#size; }

	// Public Methods
	update() {
		this.#render();
	}

	// Private Methods
	#render() {
		noFill();
		stroke(0);
		strokeWeight(50);
		rect(-this.#size / 2, -this.#size / 2, this.#size, this.#size);
	}
}