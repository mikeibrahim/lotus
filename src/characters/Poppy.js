class Poppy extends Character {
	//#region Data;
	#fieldSize;
	#speedMultiplier;
	#sizekMultiplier;
	#field;
	//#endregion

	//#region Constructor
	constructor() {
		let characterType = Characters.POPPY;
		let level = Characters.getCharacterLevel(characterType);
		let maxHealth = [1, 1, 2, 3][level];
		let size = [100, 100, 90, 90][level];
		let speed = [500, 500, 550, 600][level];
		super({ characterType: characterType, maxHealth: maxHealth, size: size, speed: speed });
		Player.inst = this;
		this.#fieldSize = [300, 350, 400, 450][level];
		this.#speedMultiplier = [0.7, 0.6, 0.5, 0.4][level];
		this.#sizekMultiplier = [0.8, 0.7, 0.6, 0.5][level];
		this.#field = new Field({
			size: this.#fieldSize,
			color: super.getColor(),
			parent: this,
			targets: () => Game.inst.getEnemies(),
			onCollisionEnter: this.#onCollisionEnter.bind(this),
			onCollisionExit: this.#onCollisionExit.bind(this),
		});
	}
	//#endregion

	//#region Callbacks
	update() {
		super.update();
		this.#field.update();
	}
	//#endregion

	//#region Private methods
	#onCollisionEnter(target) {
		target.setTargetSize(target.getTargetSize() * this.#sizekMultiplier);
		target.setCurrentSpeed(target.getCurrentSpeed() * this.#speedMultiplier);
	}
	#onCollisionExit(target) {
		target.setTargetSize(target.getTargetSize() / this.#sizekMultiplier);
		target.setCurrentSpeed(target.getCurrentSpeed() / this.#speedMultiplier);
	}
	//#endregion
}