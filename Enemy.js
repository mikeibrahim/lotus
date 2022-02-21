class Enemy {
	// Data
	#player;
	#damage;
	#position;
	#size;
	#speed;
	#velocity;
	#color;

	// Constructor
	constructor({player, damage, position, size, speed, color}) {
		this.#player = player;
		this.#damage = damage || 1;
		this.#position = position || createVector(0, 0);
		this.#size = size || 100;
		this.#speed = speed || 500;
		this.#velocity = createVector(0, 0);
		this.#color = color || color(255, 0, 0);
	}

	// Public Getters
	getDamage() { return this.#damage; }

	// Public Methods
	update() {
		this.#move();
		this.#detectPlayerCollision();
		this.#render();
	}

	// Private Methods
	#move() {
		// this.#position.add(this.#velocity.copy().mult(this.#speed * (deltaTime / 1000)));
	}
	#detectPlayerCollision() {
		let playerPosition = this.#player.getPosition();
		let playerSize = this.#player.getSize();
		if (playerPosition.dist(this.#position) < (playerSize / 2) + (this.#size / 2)) {
			this.#player.collideWith(this);
		}
	}
	#render() {
		fill(this.#color);
		circle(this.#position.x, this.#position.y, this.#size);
	}
}