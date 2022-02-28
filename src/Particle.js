class Particle {
	// Data
	#particleSystem;
	#lifeTime;
	#color;
	#speed;
	#size;
	#position;
	#velocity;
	// Updated Data
	#currentLifeTime;

	// Constructor
	constructor({ particleSystem, lifeTime, color, speed, size, position, velocity }) {
		// Data
		this.#particleSystem = particleSystem;
		this.#lifeTime = lifeTime || 1000;
		this.#color = color || color(255, 0, 0);
		this.#speed = speed || 500;
		this.#size = size || 50;
		this.#position = position || createVector(0, 0);
		this.#velocity = velocity || createVector(0, 0);
		// Updated Data
		this.#currentLifeTime = this.#lifeTime;
	}

	// Public Methods
	update() {
		this.#move();
		this.#render();
		this.#deathCheck();
	}

	// Private Methods
	#move() {
		this.#position.add(this.#velocity.copy().mult(this.#speed * (deltaTime / 1000)));
		this.#currentLifeTime -= deltaTime;
	}
	#render() {
		noStroke();
		fill(red(this.#color), green(this.#color), blue(this.#color), this.#currentLifeTime / this.#lifeTime * 255);
		circle(this.#position.x, this.#position.y, this.#size * (this.#currentLifeTime / this.#lifeTime));
	}
	#deathCheck() {
		if (this.#currentLifeTime <= 0) this.#destroy();
	}
	#destroy() {
		this.#particleSystem.removeParticle(this);
	}
}