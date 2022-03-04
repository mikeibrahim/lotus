class Interactable {
//#region Data
	#size;
	#position;
//#endregion

//#region Constructor
	constructor({size, position}) {
		this.#size = size;
		this.#position = position;
	}
//#endregion

//#region Public Setters
	setPosition(position) { this.#position = position; }
//#endregion

//#region Public Getters
	getSize() { return this.#size; }
	getPosition() { return this.#position; }
//#endregion

//#region Callbacks
	update() {
		this.#playerInteract();
	}
//#endregion

//#region Public Methods
	interact() { }
//#endregion

//#region Private Methods
	#playerInteract() {
		if (Player.inst.isTouching(this)) this.interact();
	}
//#endregion
}