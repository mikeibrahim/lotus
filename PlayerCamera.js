class PlayerCamera {
	// Data
	#camera;
	#playerPosition;
	#speed;
	#position;

	// Constructor
	constructor({ player }) {
		this.#camera = createCamera();
		this.#playerPosition = player.getPosition();
		this.#speed = 2;
		this.#position = createVector(0, 0);
	}

	// Public Methods
	update() {
		let targetDirection = this.#playerPosition.copy().sub(this.#position);
		targetDirection.normalize();
		this.#position.add( // Go to target direction
			targetDirection.copy().mult( // Multiply by distance
				this.#playerPosition.dist(this.#position) * this.#speed * (deltaTime / 1000) // Multiply by speed & deltaTime
			)
		);
		this.#camera.setPosition(this.#position.x, this.#position.y, 2000);
	}
}