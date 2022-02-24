class Environment {
	// Data
	static inst;
	#size;

	// Constructor
	constructor(size) {
		// Data
		Environment.inst = this;
		this.#size = size;
	}

	// Public Getters
	getSize() { return this.#size; }
	getRandomPosition(objectSize) {
		let min = (-this.#size / 2) + (objectSize / 2);
		let max = (this.#size / 2) - (objectSize / 2);
		let position = createVector(random(min, max), random(min, max));
		return position;
	}

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