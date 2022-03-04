class Orb extends Interactable {
//#region Data
	#color;
	#size;
	#position;
//#endregion

//#region Constructor
	constructor({ size, position }) {
		super({ size: size, position: position });
		this.#size = size;
		this.#position = position;
		this.#color = color(0, 0, 255);
	}
//#endregion

//#region Public Getters
	getPosition() { return this.#position; }
//#endregion

//#region Public Methods
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
//#endregion

//#region Private Methods
	#render() {
		fill(this.#color);
		stroke(0);
		strokeWeight(0);
		circle(this.#position.x, this.#position.y, this.#size);
	}
//#endregion
}