class Enemy extends Interactable {
	// Data
	#damage;
	#size;
	#speed;
	#color;
	// Updated Data
	#velocity;
	#position;

	// Constructor
	constructor({ damage, size, position, speed, color }) {
		super({size: size, position: position});
		// Data
		this.#damage = damage || 1;
		this.#size = size || 100;
		this.#speed = speed || 500;
		this.#color = color || color(255, 0, 0);
		// Updated Data
		this.#velocity = this.#randomVector();
		this.#position = position || createVector(0, 0);
	}

	// Public Getters
	static charToEnemy(char) {
		switch (char) {
			case 'r':
				return new Enemy({
					damage: 1,
					size: 100,
					position: Environment.inst.getRandomPosition(100),
					speed: 300,
					color: color(255, 0, 0)
				});
			case 'g':
				return new Enemy({
					damage: 1,
					size: 75,
					position: Environment.inst.getRandomPosition(75),
					speed: 500,
					color: color(0, 255, 0)
				});
			default:
				return null;
		}
	}
	// getPosition() { return this.#position; }
	// getSize() { return this.#size; }
	// getDamage() { return this.#damage; }

	// Callbacks
	update() {
		super.update();
		this.#move();
		// this.#detectPlayerCollision();
		this.#detectWallCollision();
		this.#render();
	}

	// Overrides
	interact() {
		Player.inst.takeDamage(this.#damage);
	}

	// Private Methods
	#randomVector() { return createVector(random(-1, 1), random(-1, 1)).normalize(); }
	#move() {
		this.#position.add(this.#velocity.copy().mult(this.#speed * (deltaTime / 1000)));
		super.setPosition(this.#position);
	}
	// #detectPlayerCollision() {
	// 	Player.inst.tryCollide(this);
	// }
	#detectWallCollision() {
		let size = Environment.inst.getSize();
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