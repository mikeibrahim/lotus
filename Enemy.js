class Enemy {
	// Data
	#player;
	#damage;
	#size;
	#speed;
	#color;
	// Updated Data
	#velocity;
	#position;

	// Constructor
	constructor({ player, damage, size, speed, color }) {
		// Data
		this.#player = player;
		this.#damage = damage || 1;
		this.#size = size || 100;
		this.#speed = speed || 500;
		this.#color = color || color(255, 0, 0);
		// Updated Data
		this.#velocity = this.#randomVector();
		this.#position = this.#getRandomPosition();
	}

	// Public Getters
	static charToEnemy(char) {
		switch (char) {
			case 'r':
				return new Enemy({
					player: PLAYER,
					damage: 1,
					size: 100,
					speed: 200,
					color: color(255, 0, 0)
				});
			default:
				return null;
		}
	}
	getDamage() { return this.#damage; }

	// Private Getters 
	#getRandomPosition() {
		let size = ENVIRONMENT.getSize();
		let position = createVector(
			random((-size / 2) + (this.#size / 2), (size / 2) - (this.#size / 2)),
			random((-size / 2) + (this.#size / 2), (size / 2) - (this.#size / 2))
		);
		return position;
	}

	// Public Methods
	update() {
		this.#move();
		this.#detectPlayerCollision();
		this.#detectWallCollision();
		this.#render();
	}

	// Private Methods
	#randomVector() { return createVector(random(-1, 1), random(-1, 1)).normalize(); }
	#move() {
		this.#position.add(this.#velocity.copy().mult(this.#speed * (deltaTime / 1000)));
	}
	#detectPlayerCollision() {
		let playerPosition = this.#player.getPosition();
		let playerSize = this.#player.getSize();
		if (playerPosition.dist(this.#position) < (playerSize / 2) + (this.#size / 2)) {
			this.#player.collideWith(this);
		}
	}
	#detectWallCollision() {
		let size = ENVIRONMENT.getSize();
		// Reflect off walls
		if (this.#position.x - (this.#size / 2) < -size / 2) this.#velocity.x = abs(this.#velocity.x);
		else if (this.#position.x + (this.#size / 2) > size / 2) this.#velocity.x = -abs(this.#velocity.x);
		if (this.#position.y - (this.#size / 2) < -size / 2) this.#velocity.y = abs(this.#velocity.y);
		else if (this.#position.y + (this.#size / 2) > size / 2) this.#velocity.y = -abs(this.#velocity.y);
	}
	#render() {
		fill(this.#color);
		stroke(0);
		strokeWeight(5);
		circle(this.#position.x, this.#position.y, this.#size);
	}
}