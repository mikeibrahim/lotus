class Field {
//#region Data
	#size;
	#color;
	#parent;
	#targets;
	#interactionCallback;
//#endregion

//#region  Constructor
	constructor({size, color, parent, targets, interactionCallback}) {
		this.#size = size;
		this.#color = color;
		this.#parent = parent;
		this.#targets = targets;
		this.#interactionCallback = interactionCallback;
	}
//#endregion

//#region Callbacks
	startUp() {}
	update() {
		this.#renderField();
		this.#checkFieldInteractions();
	}
	takeDown() {}
//#endregion

	#renderField() {
		noStroke();
		fill(red(this.#color), green(this.#color), blue(this.#color), 100);
		let position = this.#parent.getPosition();
		circle(position.x, position.y, this.#size);
	}
	#checkFieldInteractions() {
		let targets = this.#targets();
		for (let i = 0; i < targets.length; i++) {
			let target = targets[i];
			let targetPosition = target.getPosition();
			let parentPosition = this.#parent.getPosition();
			let distance = dist(targetPosition.x, targetPosition.y, parentPosition.x, parentPosition.y);
			if (distance < this.#size / 2 + target.getSize() / 2) {
				this.#interactionCallback(target);
			}
		}
	}
}