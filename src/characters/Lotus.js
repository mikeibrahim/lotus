class Lotus extends Character {
	// Data
	#size;
	#speed;
	#color;

	// Constructor
	constructor() {
		super();
		this.#size = 0;
		this.#speed = 0;
		this.#color = color(0, 0, 0);
	}

	// Callbacks
	startUp = () => {
		super.startUp();
		this.#size =  1;
		this.#speed = 2;
		this.#color = '#c9deff';
		this.#setPlayerAttributes();
	}
	update = () => {
		super.update();
	}
	keyPressed = () => {
		super.keyPressed();
	}
	passiveAbility = () => {
		super.passiveAbility();
	}
	activeAbility = () => {
		super.activeAbility();
	}
	takeDown = () => {
		super.takeDown();
	}

	// Private Methods
	#setPlayerAttributes = () => {
		Player.inst.setSpeedMultiplier(this.#speed);
		Player.inst.setSizeMultiplier(this.#size);
		Player.inst.setColor(this.#color);
	}
}