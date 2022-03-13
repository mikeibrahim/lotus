class Dandelion extends Character {
//#region Data
	#maxFadeTime;
	#fadeSizeMultiplier;
	#fadeSpeedMultiplier;
	#currentFadeTime;
	#faded;
//#endregion

//#region Constructor
	constructor() {
		let characterType = Characters.DANDELION;
		let level = Characters.getCharacterLevel(characterType);
		let maxHealth = [1, 2, 4, 5][level];
		let speed = [500, 550, 600, 650][level];
		let size = [100, 90, 88, 70][level];
		super({ characterType: characterType, maxHealth: maxHealth, size: size, speed: speed });
		Player.inst = this;
		this.#maxFadeTime = [1500, 2000, 2500, 3000][level];
		this.#fadeSizeMultiplier = [2, 2.5, 3, 3.5][level];
		this.#fadeSpeedMultiplier = [1.25, 1.5, 1.75, 2][level];
		this.#currentFadeTime = 0;
		this.#faded = false;
	}
//#endregion

//#region Callbacks
	update() {
		super.update();
		this.#fade();
	}
	nextRound() {
		super.nextRound();
		this.#fadeReset();
	}
	activeAbility() {
		super.activeAbility();
		this.#fadeStart();
	}
//#endregion

//#region Private Methods
	#fadeStart() {
		if (this.#faded) return;
		this.#faded = true;
		this.#currentFadeTime = this.#maxFadeTime;
		Player.inst.setInvincibility(this.#currentFadeTime);

		new ParticleSystem({
			count: 10,
			lifeTime: this.#maxFadeTime,
			color: color(red(super.getColor()), green(super.getColor()), blue(super.getColor()), 100),
			speed: 100,
			size: super.getSize() * this.#fadeSizeMultiplier,
			position: Player.inst.getPosition(),
		});
	}
	#fade() {
		if (this.#currentFadeTime <= 0) return;
		this.#currentFadeTime -= deltaTime;
		if (this.#currentFadeTime <= 0) this.#currentFadeTime = 0;
		
		Player.inst.setTargetSize(super.getSize() + super.getSize() * this.#fadeSizeMultiplier * (this.#currentFadeTime / this.#maxFadeTime));
		Player.inst.setTargetSpeed(super.getSpeed() + super.getSpeed() * this.#fadeSpeedMultiplier * (this.#currentFadeTime / this.#maxFadeTime));
	}
	#fadeReset() {
		this.#faded = false;
		this.#currentFadeTime = 0;
	}
//#endregion
}