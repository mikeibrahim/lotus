class Dandelion extends Character {
//#region Data
	#characterType;
	#maxHealth;
	#speedMultiplier;
	#sizeMultiplier;
	#maxFadeTime;
	#fadeScaleFactor;
	#fadeSpeedFactor;
	#currentFadeTime;
	#faded;
//#endregion

//#region Constructor
	constructor() {
		super();
		Character.inst = this;
		this.#characterType = Characters.DANDELION;
		this.#maxHealth = [1, 2, 4, 5];
		this.#speedMultiplier = [1, 1.2, 1.3, 3.4];
		this.#sizeMultiplier = [1, 0.9, 0.8, 0.7];
		this.#maxFadeTime = [1500, 2000, 2500, 3000];
		this.#fadeScaleFactor = [2, 2.5, 3, 3.5];
		this.#fadeSpeedFactor = [1.25, 1.5, 1.75, 2];
		this.#currentFadeTime = 0;
		this.#faded = false;
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
		this.#maxFadeTime = this.#maxFadeTime[level];
		this.#fadeScaleFactor = this.#fadeScaleFactor[level];
		this.#fadeSpeedFactor = this.#fadeSpeedFactor[level];
	}
	update() {
		super.update();
		this.#fade();
	}
	keyPressed() {
		super.keyPressed();
	}
	nextRound() {
		super.nextRound();
		this.#fadeReset();
	}
	passiveAbility() {
		super.passiveAbility();
	}
	activeAbility() {
		super.activeAbility();
		this.#fadeStart();
	}
	takeDown() {
		super.takeDown();
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
			color: color(red(super.getPlayerColor()), green(super.getPlayerColor()), blue(super.getPlayerColor()), 100),
			speed: 100,
			size: super.getPlayerSize() * this.#fadeScaleFactor,
			position: Player.inst.getPosition(),
		});
	}
	#fade() {
		if (!this.#faded) return;

		this.#currentFadeTime -= deltaTime;
		if (this.#currentFadeTime <= 0) this.#currentFadeTime = 0;
		
		Player.inst.setSize(super.getPlayerSize() + super.getPlayerSize() * this.#fadeScaleFactor * (this.#currentFadeTime / this.#maxFadeTime));
		Player.inst.setSpeed(super.getPlayerSpeed() + super.getPlayerSpeed() * this.#fadeSpeedFactor * (this.#currentFadeTime / this.#maxFadeTime));
	}
	#fadeReset() {
		this.#faded = false;
		this.#currentFadeTime = 0;
		Player.inst.setSize(super.getPlayerSize());
		Player.inst.setSpeed(super.getPlayerSpeed());
	}
//#endregion
}