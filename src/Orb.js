class Orb extends Interactable {
	// Data
	#color;
	#size;
	#position;

	// Constructor
	constructor({ size, position }) {
		super({ size: size, position: position });
		this.#size = size;
		this.#position = position;
		this.#color = color(0, 0, 255);
	}

	// Public Getters
	getPosition() { return this.#position; }

	// Public Methods
	update() {
		super.update();
		this.#render();
	}
	interact() {
		this.destroy();
	}
	destroy() {
		new ParticleSystem({
			count: 15,
			lifeTime: 500,
			color: color(red(this.#color), green(this.#color), blue(this.#color), 200),
			speed: 300,
			size: 30,
			position: this.#position
		});
		Game.inst.orbs.splice(Game.inst.orbs.indexOf(this), 1);
		GameUI.inst.addCurrentOrbs(1);
	}

	// Private Methods
	#render() {
		fill(this.#color);
		stroke(0);
		strokeWeight(0);
		circle(this.#position.x, this.#position.y, this.#size);
	}
}