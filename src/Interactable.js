class Interactable {
	//#region Data
	#targets;
	#size;
	#speed;
	#color;
	#currentSize;
	#targetSize;
	#currentSpeed;
	#currentColor;
	#position;
	#velocity;
	//#endregion

	//#region Constructor
	constructor({ targets, size, speed, color }) {
		this.#targets = targets;
		this.#size = size;
		this.#currentSize = size;
		this.#targetSize = size;
		this.#speed = speed;
		this.#currentSpeed = speed;
		this.#color = color;
		this.#currentColor = color;
		this.#position = Environment.inst.getRandomPosition(this.#size);
		this.#velocity = this.#randomVector();
	}
	//#endregion

	//#region Public Setters
	setSize(size) { this.#size = size; }
	setCurrentSize(size) { this.#currentSize = size; }
	setTargetSize(size) { this.#targetSize = size; }
	setSpeed(speed) { this.#speed = speed; }
	setCurrentSpeed(speed) { this.#currentSpeed = speed; }
	setColor(color) { this.#color = color; }
	setCurrentColor(color) { this.#currentColor = color; }
	setPosition(position) { this.#position = position; }
	setVelocity(velocity) { this.#velocity = velocity; }
	//#endregion

	//#region Public Getters
	getTarget() { return this.#targets; }
	getSize() { return this.#size; }
	getCurrentSize() { return this.#currentSize; }
	getSpeed() { return this.#speed; }
	getCurrentSpeed() { return this.#currentSpeed; }
	getColor() { return this.#color; }
	getPosition() { return this.#position; }
	getVelocity() { return this.#velocity; }
	//#endregion

	//#region Callbacks
	update() {
		this.#checkCollision();
		this.#updateSize();
		this.#move();
		this.#render();
	}
	pulsate({ speed, opacity }) {
		this.#currentColor = lerpColor(this.#color, color(red(this.#color), green(this.#color), blue(this.#color), opacity * 255), Math.sin(frameCount * speed) * 0.5 + 0.5);
	}
	bounceOffWalls() {
		let environmentSize = Environment.inst.getSize();
		// Reflect off walls
		if (this.#position.x - (this.#size / 2) < -environmentSize / 2) this.#velocity.x = abs(this.#velocity.x);
		else if (this.#position.x + (this.#size / 2) > environmentSize / 2) this.#velocity.x = -abs(this.#velocity.x);
		if (this.#position.y - (this.#size / 2) < -environmentSize / 2) this.#velocity.y = abs(this.#velocity.y);
		else if (this.#position.y + (this.#size / 2) > environmentSize / 2) this.#velocity.y = -abs(this.#velocity.y);
	}
	//#endregion

	//#region Public Methods
	onCollision(target) { } // Override Method
	isTouching(other) {
		return this.getPosition().dist(other.getPosition()) < this.getCurrentSize() / 2 + other.getCurrentSize() / 2;
	}
	//#endregion

	//#region Private Methods
	#randomVector() { return createVector(random(-1, 1), random(-1, 1)).normalize(); }
	#checkCollision() {
		this.#targets().forEach(target => {
			if (this.isTouching(target)) this.onCollision(target);
		});
	}
	#updateSize() {
		this.#currentSize = lerp(this.#currentSize, this.#targetSize, 5 * deltaTime / 1000);
	}
	#move() {
		if (this.#currentSpeed <= 0) return;
		this.#position.add(p5.Vector.mult(this.#velocity, this.#currentSpeed * (deltaTime / 1000)));
		this.#constrainPosition();
	}
	#constrainPosition() {
		let size = Environment.inst.getSize();
		this.#position = createVector(constrain(this.#position.x, -size / 2, size / 2), constrain(this.#position.y, -size / 2, size / 2));
	}
	#render() {
		fill(this.#currentColor);
		stroke(0);
		strokeWeight(5);
		circle(this.#position.x, this.#position.y, this.#currentSize);
	}
	//#endregion
}