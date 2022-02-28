class Character {
	constructor() {
		this.size = 1;
		this.speed = 1;
		this.color = color(0, 0, 0);
	}

	// Public Methods
	startUp() {} // Called once
	update() {
		this.passiveAbility();
	}
	keyPressed() {
		if (keyIsDown(' '.charCodeAt(0))) this.activeAbility();
	}
	takeDown() {} // Called once
	passiveAbility() {} // Every frame
	activeAbility() {} // Every time user clicks space

}