class PlayerCamera {
	// Data
	#camera;
	#playerPosition;
	#speed;
	#position;
	#maxZoom;
	#currentZoom;
	#zoomSpeed;

	// Constructor
	constructor({ player }) {
		this.#camera = createCamera();
		this.#playerPosition = player.getPosition();
		this.#speed = 2;
		this.#position = createVector(0, 0);
		this.#maxZoom = 2000;
		this.#currentZoom = this.#maxZoom;
		this.#zoomSpeed = 1;
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
		this.#currentZoom += (this.#maxZoom - this.#currentZoom) * this.#zoomSpeed * (deltaTime / 1000);
		this.#camera.setPosition(this.#position.x, this.#position.y, this.#currentZoom);
	}
	zoomIn() {
		this.#currentZoom = 100;
	}
}