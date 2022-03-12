class Field {
//#region Data
	#size;
	#color;
	#parent;
	#targets;
	#onCollision;
	#onCollisionEnter;
	#onCollisionExit;
	#targetsInside;
//#endregion

//#region  Constructor
	constructor({size, color, parent, targets, onCollision, onCollisionEnter, onCollisionExit}) {
		this.#size = size;
		this.#color = color;
		this.#parent = parent;
		this.#targets = targets;
		this.#onCollision = onCollision || function() {};
		this.#onCollisionEnter = onCollisionEnter || function() {};
		this.#onCollisionExit = onCollisionExit || function() {};
		this.#targetsInside = [];
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
			let isInside = distance < this.#size / 2 + target.getSize() / 2;
			if (target instanceof Player && target.isInvincible()) isInside = false; // Don't affect the player if they're invincible
			if (isInside) {
				if (!this.#targetsInside.includes(target)) {
					this.#onCollisionEnter(target);
					this.#targetsInside.push(target);
				}
				this.#onCollision(target);
			} else {
				if (this.#targetsInside.includes(target)) {
					this.#onCollisionExit(target);
					this.#targetsInside.splice(this.#targetsInside.indexOf(target), 1);
				}
			}
		}
	}
}