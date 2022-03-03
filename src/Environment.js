class Environment {
	// Data
	static inst;
	#size;
	#thickness;

	// Constructor
	constructor(size) {
		// Data
		Environment.inst = this;
		this.#size = size;
		this.#thickness = 50;
	}

	// Public Getters
	getSize() { return this.#size; }
	getRandomPosition(objectSize) {
		let min = (-this.#size / 2) + objectSize;
		let max = (this.#size / 2) - objectSize;
		let position = createVector(random(min, max), random(min, max));
		return position;
	}

	// Public Methods
	startUp() {
	
	}
	update() {
		this.#render();
	}
	takeDown() {
	}

	// Private Methods
	#render() {
		fill(0);
		rectMode(CORNER);
		rect(-this.#size / 2, -this.#size / 2 - this.#thickness, this.#size, this.#thickness); // top
		rect(-this.#size / 2, this.#size / 2, this.#size, this.#thickness); // bottom
		rect(-this.#size / 2 - this.#thickness, -this.#size / 2, this.#thickness, this.#size); // left
		rect(this.#size / 2, -this.#size / 2, this.#thickness, this.#size); // right
	}
}