class Interactable {
	// Data
	#size;
	#position;

	// Constructor
	constructor({size, position}) {
		this.#size = size;
		this.#position = position;
	}

	// Public Setters
	setPosition(position) { this.#position = position; }

	// Public Getters
	getSize() { return this.#size; }
	getPosition() { return this.#position; }

	// Callbacks
	update() {
		this.#playerInteract();
	}

	// Public Methods
	interact() { }

	// Private Methods
	#playerInteract() {
		if (Player.inst.isTouching(this)) this.interact();
	}
}