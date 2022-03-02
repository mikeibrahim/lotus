class Tulip extends Character {
	// Data
	#pushRadius;
	#pushAmount;

	// Constructor
	constructor() {
		super();
		Character.inst = this;
		this.#pushRadius = 100;
		this.#pushAmount = 10;
	}

	// Callbacks
	startUp() {
		super.startUp("Tulip");
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