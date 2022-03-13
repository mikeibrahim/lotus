class Heart extends Interactable {
	//#region Data
	#heal;
	//#endregion

	//#region Constructor
	constructor() {
		super({ targets: () => [Player.inst], size: 50, speed: 0, color: color(230, 50, 50) });
		this.#heal = 1;
	}
	//#endregion

	//#region Public Methods
	update() {
		super.update();
		super.pulsate({ speed: 0.2, opacity: 0.8 });
	}
	onCollision(target) {
		target.heal(this.#heal);
		this.destroy();
	}
	destroy() {
		new ParticleSystem({
			count: 15,
			lifeTime: 1000,
			color: color(red(super.getColor()), green(super.getColor()), blue(super.getColor()), 200),
			speed: 200,
			size: super.getSize(),
			position: super.getPosition()
		});
		Game.inst.removeHeart(this);
	}
	//#endregion

	//#region Private Methods
	// #render() {
	// 	super.render();
	// 	// fill(super.getColor());
	// 	// stroke(0);
	// 	// strokeWeight(0);
	// 	// circle(this.#position.x, this.#position.y, this.#size);
	// }
	//#endregion
}