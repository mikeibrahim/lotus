class Dandelion extends Character {
	// Data
	#faded;
	#fadeTime;
	#currentFadeTime;

	// Constructor
	constructor() {
		super();
		Character.inst = this;
		this.#faded = false;
		this.#fadeTime = 3;
		this.#currentFadeTime = 0;
	}

	// Callbacks
	startUp() {
		super.startUp("Dandelion");
	}
	update() {
		super.update();
	}
	keyPressed() {
		super.keyPressed();
	}
	nextRound() {
		super.nextRound();
	}
	passiveAbility() {
		super.passiveAbility();
	}
	activeAbility() {
		super.activeAbility();
	}
	takeDown() {
		super.takeDown();
	}
}