class Tulip extends Character {
	//#region Data
	#fieldSize;
	#pushAmount;
	#field;
	//#endregion

	//#region Constructor
	constructor() {
		let characterType = Characters.TULIP;
		let level = Characters.getCharacterLevel(characterType);
		let maxHealth = [1, 1, 2, 2][level];
		let speed = [500, 500, 600, 600][level];
		let size = [100, 100, 100, 100][level];
		super({ characterType: characterType, maxHealth: maxHealth, size: size, speed: speed });
		Player.inst = this;
		this.#fieldSize = [250, 300, 350, 400][level];
		this.#pushAmount = [150, 160, 170, 180][level];
		this.#field = new Field({
			size: this.#fieldSize,
			color: super.getColor(),
			parent: this,
			targets: () => Game.inst.getEnemies(),
			onCollision: this.#onCollision.bind(this),
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
	#onCollision(target) {
		let targetPosition = target.getPosition();
		let playerPosition = super.getPosition();
		let pushVector = p5.Vector.sub(targetPosition, playerPosition);
		pushVector.normalize();
		pushVector.mult(this.#pushAmount * deltaTime / 1000);
		target.setPosition(p5.Vector.add(targetPosition, pushVector));
	}
	//#endregion
}