class Poppy extends Character {
	//#region Data
	#characterType;
	#maxHealth;
	#sizeMultiplier;
	#speedMultiplier;
	#fieldSize;
	#slowMultiplier;
	#shrinkMultiplier;
	#field;
	//#endregion

	//#region Constructor
	constructor() {
		super();
		Character.inst = this;
		this.#characterType = Characters.POPPY;
		this.#maxHealth = [1, 1, 2, 3];
		this.#sizeMultiplier = [1, 1, 0.9, 0.9];
		this.#speedMultiplier = [1, 1, 1.1, 1.2];
		this.#fieldSize = [300, 350, 400, 450];
		this.#shrinkMultiplier = [0.8, 0.7, 0.6, 0.5];
		this.#slowMultiplier = [0.7, 0.6, 0.5, 0.4];
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
		this.#shrinkMultiplier = this.#shrinkMultiplier[level];
		this.#slowMultiplier = this.#slowMultiplier[level];
		this.#field = new Field({
			size: this.#fieldSize + this.getPlayerSize(),
			color: super.getPlayerColor(),
			parent: Player.inst,
			targets: () => Game.inst.enemies,
			onCollisionEnter: (target) => this.#onCollisionEnter(target),
			onCollisionExit: (target) => this.#onCollisionExit(target),
		});
	}
	update() {
		super.update();
		this.#field.update();
	}
	//#endregion

	//#region Private methods
	#onCollisionEnter(target) {
		target.setSizeMultiplier(this.#shrinkMultiplier);
		target.setSpeedMultiplier(this.#slowMultiplier);
	}
	#onCollisionExit(target) {
		target.setSizeMultiplier(Math.pow(this.#shrinkMultiplier, -1));
		target.setSpeedMultiplier(Math.pow(this.#slowMultiplier, -1));
	}
	//#endregion
}