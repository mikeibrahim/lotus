class Character extends Player {
	//#region Constructor
	constructor({ characterType, maxHealth, size, speed }) {
		let color = Characters.getCharacters()[characterType].color;
		super({ maxHealth: maxHealth, size: size, speed: speed, color: color });
	}
	//#endregion

	//#region Public Methods
	update() {
		super.update();
		this.passiveAbility();
	}
	keyPressed() {
		if (keyIsDown(' '.charCodeAt(0))) this.activeAbility();
	}
	nextRound() {
		super.setTargetSize(super.getSize());
		super.setCurrentSpeed(super.getSpeed());
	}
	takeDown() { } // Called once
	passiveAbility() { } // Every frame
	activeAbility() { } // Every time user clicks space
	//#endregion
}