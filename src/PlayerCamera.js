class PlayerCamera {
	// Data
	static inst;
	#camera;
	#speed;
	#maxZoom;
	#zoomSpeed;
	// Updated Data
	// #playerPosition;
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
		// this.#playerPosition = Player.inst.getPosition();
		this.#position = createVector(0, 0);
		this.#currentZoom = this.#maxZoom;
		this.#shake = 0;
		this.#shakeAmount = 0;
	}

	// Public Getters 
	getPosition() { return this.#position; }
	getCurrentZoom() { return this.#currentZoom; }

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
		// translate(this.#position.x, this.#position.y, 100);
		// this.#camera.setPosition(this.#position.x, this.#position.y, this.#currentZoom);
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