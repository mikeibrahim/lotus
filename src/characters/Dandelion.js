class Dandelion extends Character {
	// Data
	#faded;
	#maxFadeTime;
	#currentFadeTime;
	#fadeScaleFactor;
	#fadeSpeedFactor;

	// Constructor
	constructor() {
		super();
		Character.inst = this;
		this.#faded = false;
		this.#maxFadeTime = 2000;
		this.#currentFadeTime = 0;
		this.#fadeScaleFactor = 2;
	}

	// Callbacks
	startUp() {
		super.startUp("Dandelion");
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

	// Private Methods
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
		Player.inst.setSpeed(super.getPlayerSpeed() + super.getPlayerSpeed() * this.#fadeScaleFactor * (this.#currentFadeTime / this.#maxFadeTime));
	}
	#fadeReset() {
		this.#faded = false;
		this.#currentFadeTime = 0;
		Player.inst.setSize(super.getPlayerSize());
	}
}