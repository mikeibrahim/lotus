class Orb {
	// Data
	#color;
	#size;
	#position;

	// Constructor
	constructor() {
		this.#size = 50;
		this.#position = Environment.inst.getRandomPosition(this.#size);
		this.#color = color(0, 0, 255);
	}

	// Public Getters
	getPosition() { return this.#position; }
	getSize() { return this.#size; }

	// Public Methods
	update() {
		this.#detectPlayerCollision();
		this.#render();
	}
	destroy() {
		new ParticleSystem({
			count: 15,
			lifeTime: 500,
			color: color(red(this.#color), green(this.#color), blue(this.#color), 200),
			speed: 200,
			size: 30,
			position: this.#position
		});
		Game.inst.orbs.splice(Game.inst.orbs.indexOf(this), 1);
	}

	// Private Methods
	#detectPlayerCollision() {
		Player.inst.tryCollide(this);
	}
	#render() {
		fill(this.#color);
		stroke(0);
		strokeWeight(0);
		circle(this.#position.x, this.#position.y, this.#size);
	}
}