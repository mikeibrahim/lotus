class PlayerCamera {
//#region Data
	static inst;
	#camera;
	#speed;
	#maxZoom;
	#zoomSpeed;
	#position;
	#currentZoom;
	#shake;
	#shakeAmount;
//#endregion

//#region Constructor
	constructor({ speed, maxZoom, zoomSpeed }) {
		PlayerCamera.inst = this;
		this.#camera = createCamera();
		this.#speed = speed || 2;
		this.#maxZoom = maxZoom || 2000;
		this.#zoomSpeed = zoomSpeed || 1;
		this.#position = createVector(0, 0);
		this.#currentZoom = this.#maxZoom;
		this.#shake = 0;
		this.#shakeAmount = 0;
	}
//#endregion

//#region Public Getters 
	getPosition() { return this.#position; }
	getCurrentZoom() { return this.#currentZoom; }
//#endregion

//#region Callbacks
	startUp() {
		
	}
	update() {
		this.#moveToPlayer();
		this.#cameraShake();
	}
	takeDown() {
		this.#camera.ortho(-width / 2, width / 2, -height / 2, height / 2, 0, 1000);
	}
//#endregion

//#region Public Methods
	shake(duration, magnitude) {
		this.#shake = duration;
		this.#shakeAmount = magnitude;
	}
	zoomIn() {
		this.#currentZoom = -100;
	}
//#endregion

//#region Private Methods
	#moveToPlayer() {
		let playerPosition = Player.inst.getPosition();
		if (Options.inst.getKeyboardControls()) {
			let targetDirection = playerPosition.copy().sub(this.#position);
			targetDirection.normalize();
			this.#position.add(p5.Vector.mult(targetDirection, playerPosition.dist(this.#position) * this.#speed * (deltaTime / 1000)));
		} else {
			this.#position = playerPosition.copy();
		}
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
//#endregion
}