class ParticleSystem {
	// Data
	#count;
	#lifeTime;
	#color;
	#speed;
	#size;
	#position;
	// Updated Data
	#particles;

	// Constructor
	constructor({ count, lifeTime, color, speed, size, position }) {
		// Data
		this.#count = count || 100;
		this.#lifeTime = lifeTime || 1000;
		this.#color = color || color(255, 0, 0);
		this.#speed = speed || 1500;
		this.#size = size || 500;
		this.#position = position || createVector(0, 0);
		// Updated Data
		this.#particles = [];
		this.#createParticles();
		Game.inst.particleSystems.push(this);
	}
	

	// Public Methods
	update() {
		this.#render();
	}
	removeParticle(particle) {
		this.#particles.splice(this.#particles.indexOf(particle), 1);
	}
	
	// Private Methods
	#getRandomVector() {
		let x = random(-1, 1);
		let y = random(-1, 1);
		return createVector(x, y);
	}
	#createParticles() {
		for (let i = 0; i < this.#count; i++) {
			this.#particles.push(
				new Particle({
					particleSystem: this,
					lifeTime: this.#lifeTime,
					color: this.#color,
					speed: this.#speed,
					size: this.#size,
					position: this.#position.copy(),
					velocity: this.#getRandomVector()
				})
			);
		}
	}
	#render() {
		if (this.#particles.length === 0) this.#destroy();
		this.#particles.forEach(particle => {
			particle.update();
		});
	}
	#destroy() {
		Game.inst.particleSystems.splice(Game.inst.particleSystems.indexOf(this), 1);
	}
}