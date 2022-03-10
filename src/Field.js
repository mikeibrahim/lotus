class Field {
//#region Data
	#size;
	#color;
	#parent;
	#targetsCallback;
	#interactionCallback;
//#endregion

//#region  Constructor
	constructor({size, color, parent, targetsCallback, interactionCallback}) {
		this.#size = size;
		this.#color = color;
		this.#parent = parent;
		this.#targetsCallback = targetsCallback;
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
		let targets = this.#targetsCallback();
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