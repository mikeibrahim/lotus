class PlayerCamera {
	// Data
	static inst;
	#camera;
	#speed;
	#maxZoom;
	#zoomSpeed;
	// Updated Data
	#position;
	#currentZoom;
	#shake;
	#shakeAmount;

	// Constructor
	constructor({ speed, maxZoom, zoomSpeed }) {
		// Data
		PlayerCamera.inst = this;
		this.#camera = createCamera();
		this.#speed = speed || 2;
		this.#maxZoom = maxZoom || 2000;
		this.#zoomSpeed = zoomSpeed || 1;
		// Updated Data
		this.#position = createVector(0, 0);
		this.#currentZoom = this.#maxZoom;
		this.#shake = 0;
		this.#shakeAmount = 0;
	}

	// Public Getters 
	getPosition() { return this.#position; }
	getCurrentZoom() { return this.#currentZoom; }

	// Callbacks
	startUp() {
		
	}
	update() {
		this.#moveToPlayer();
		this.#cameraShake();
	}
	takeDown() {
		PlayerCamera.inst = null;
		this.#camera.ortho(-width / 2, width / 2, -height / 2, height / 2, 0, 1000);
	}

	// Public Methods
	shake(duration, magnitude) {
		this.#shake = duration;
		this.#shakeAmount = magnitude;
	}
	zoomIn() {
		this.#currentZoom = -100;
	}

	// Private Methods
	#moveToPlayer() {
		let playerPosition = Player.inst.getPosition();
		let targetDirection = playerPosition.copy().sub(this.#position);
		targetDirection.normalize();
		this.#position.add( // Go to target direction
			targetDirection.copy().mult( // Multiply by distance
				playerPosition.dist(this.#position) * this.#speed * (deltaTime / 1000) // Multiply by speed & deltaTime
			)
		);
		this.#currentZoom += (this.#maxZoom - this.#currentZoom) * this.#zoomSpeed * (deltaTime / 1000);
		this.#camera.ortho(
			-width / 2 - this.#currentZoom + this.#position.x,
			width / 2 + this.#currentZoom + this.#position.x,
			-height / 2 - this.#currentZoom - this.#position.y,
			height / 2 + this.#currentZoom - this.#position.y,
			0,
			1000
		);
	}
	#cameraShake() {
		if (this.#shake > 0) {
			this.#shake -= deltaTime;
			this.#position.x += random(-this.#shakeAmount, this.#shakeAmount);
			this.#position.y += random(-this.#shakeAmount, this.#shakeAmount);
		}
	}
}