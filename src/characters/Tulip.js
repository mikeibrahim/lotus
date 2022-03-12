class Tulip extends Character {
//#region Data
	#characterType;
	#maxHealth;
	#sizeMultiplier;
	#speedMultiplier;
	#fieldSize;
	#pushAmount;
	#field;
//#endregion

//#region Constructor
	constructor() {
		super();
		Character.inst = this;
		this.#characterType = Characters.TULIP;
		this.#maxHealth = [1, 1, 1, 2];
		this.#sizeMultiplier = [1, 1, 1, 1];
		this.#speedMultiplier = [1, 1, 1.2, 1.2];
		this.#fieldSize = [250, 300, 350, 400];
		this.#pushAmount = [150, 160, 170, 180];
		this.Field = null;
	}
//#endregion

//#region Callbacks
	startUp() {
		let level = Characters.getCharacterLevel(this.#characterType);
		super.startUp({
			characterType: this.#characterType,
			maxHealth: this.#maxHealth[level],
			sizeMultiplier: this.#sizeMultiplier[level],
			speedMultiplier: this.#speedMultiplier[level],
		});
		this.#fieldSize = this.#fieldSize[level];
		this.#pushAmount = this.#pushAmount[level];
		this.#field = new Field({
			size: this.#fieldSize + this.getPlayerSize(),
			color: super.getPlayerColor(),
			parent: Player.inst,
			targets: () => Game.inst.enemies,
			onCollision: (target) => this.#onCollision(target),
		});
	}
	update() {
		super.update();
		this.#field.update();
	}
//#endregion

//#region Private methods
	#onCollision(target) {
		let targetPosition = target.getPosition();
		let playerPosition = Player.inst.getPosition();
		let pushVector = p5.Vector.sub(targetPosition, playerPosition);
		pushVector.normalize();
		pushVector.mult(this.#pushAmount * deltaTime / 1000);
		target.setPosition(p5.Vector.add(targetPosition, pushVector));
	}
//#endregion
}