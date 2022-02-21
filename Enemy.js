class Enemy {
	// Data
	#player;
	#position;
	#size;
	#speed;
	#velocity;
	#color;

	// Constructor
	constructor({player, position, size, speed, color}) {
		this.#player = player;
		this.#position = position || createVector(0, 0);
		this.#size = size || 100;
		this.#speed = speed || 500;
		this.#velocity = createVector(0, 0);
		this.#color = color || color(255, 0, 0);
	}

	// Public Methods
	update() {
		this.#move();
		this.#collision();
		this.#render();
	}

	// Private Methods
	#move() {
		// this.#position.add(this.#velocity.copy().mult(this.#speed * (deltaTime / 1000)));
	}
	#collision() {
		let playerPosition = this.#player.getPosition();
		let playerSize = this.#player.getSize();
		if (playerPosition.dist(this.#position) < (playerSize / 2) + (this.#size / 2)) {
			this.#player.collide(this);
		}
	}
	#render() {
		fill(this.#color);
		circle(this.#position.x, this.#position.y, this.#size);
	}
}