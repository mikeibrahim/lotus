class PlayerCamera {
	// Data
	#camera;
	#speed;
	#maxZoom;
	#zoomSpeed;
	// Updated Data
	#playerPosition;
	#position;
	#currentZoom;
	#shake;
	#shakeAmount;

	// Constructor
	constructor({ player, speed, maxZoom, zoomSpeed }) {
		// Data
		this.#camera = createCamera();
		this.#speed = speed || 2;
		this.#maxZoom = maxZoom || 2000;
		this.#zoomSpeed = zoomSpeed || 1;
		// Updated Data
		this.#playerPosition = player.getPosition();
		this.#position = createVector(0, 0);
		this.#currentZoom = this.#maxZoom;
		this.#shake = 0;
		this.#shakeAmount = 0;
	}

	// Public Methods
	update() {
		this.#moveToPlayer();
		this.#cameraShake();
	}
	shake(duration, magnitude) {
		this.#shake = duration;
		this.#shakeAmount = magnitude;
	}
	zoomIn() {
		this.#currentZoom = 100;
	}

	// Private Methods
	#moveToPlayer() {
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
	#cameraShake() {
		if (this.#shake > 0) {
			this.#shake -= deltaTime;
			this.#position.x += random(-this.#shakeAmount, this.#shakeAmount);
			this.#position.y += random(-this.#shakeAmount, this.#shakeAmount);
		}
	}
}