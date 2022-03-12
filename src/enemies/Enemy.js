class Enemy extends Interactable {
	//#region Data
	#damage;
	#size;
	#speed;
	#color;
	#velocity;
	#position;
	//#endregion

	//#region Constructor
	constructor({ damage, size, position, speed, color }) {
		super({ size: size, position: position });
		this.#damage = damage || 1;
		this.#size = size || 100;
		this.#speed = speed || 500;
		this.#speed = Difficulty.enemySpeedScale(this.#speed);
		this.#color = color || color(255, 0, 0);
		this.#velocity = this.#randomVector();
		this.#position = position || createVector(0, 0);
	}
	//#endregion

	//#region Static Getters
	// static charToEnemy(char) {
	// 	switch (char) {
	// 		case 'r':
	// 			return new Enemy({
	// 				damage: 1,
	// 				size: 100,
	// 				position: Environment.inst.getRandomPosition(100),
	// 				speed: 300,
	// 				color: color(255, 0, 0)
	// 			});
	// 		case 'g':
	// 			return new Enemy({
	// 				damage: 1,
	// 				size: 75,
	// 				position: Environment.inst.getRandomPosition(75),
	// 				speed: 500,
	// 				color: color(0, 255, 0)
	// 			});
	// 		case 'y':
	// 			return new Enemy({
	// 				damage: 1,
	// 				size: 500,
	// 				position: Environment.inst.getRandomPosition(50),
	// 				speed: 200,
	// 				color: color(255, 255, 0)
	// 			});
	// 		default:
	// 			return null;
	// 	}
	// }
	//#endregion

	//#region Public Setters
	setPosition(position) { this.#position = position; }
	setSpeedMultiplier(multiplier) { this.#speed *= multiplier; }
	//#endregion

	//#region Public Getters
	getPosition() { return this.#position; }
	getSize() { return this.#size; }
	//#endregion	

	//#region Callbacks
	update() {
		super.update();
		this.#move();
		this.#detectWallCollision();
		this.#render();
	}
	//#endregion

	//#region Overrides
	interact() {
		super.interact();
		Player.inst.takeDamage(this.#damage);
	}
	//#endregion

	//#region Private Methods
	#randomVector() { return createVector(random(-1, 1), random(-1, 1)).normalize(); }
	#move() {
		this.#position.add(this.#velocity.copy().mult(this.#speed * (deltaTime / 1000)));
		this.#constrainPosition();
		super.setPosition(this.#position);
	}
	#constrainPosition() {
		let size = Environment.inst.getSize();
		this.#position.x = constrain(this.#position.x, -size / 2, size / 2);
		this.#position.y = constrain(this.#position.y, -size / 2, size / 2);
	}
	#detectWallCollision() {
		let size = Environment.inst.getSize();
		// Reflect off walls
		if (this.#position.x - (this.#size / 2) < -size / 2) this.#velocity.x = abs(this.#velocity.x);
		else if (this.#position.x + (this.#size / 2) > size / 2) this.#velocity.x = -abs(this.#velocity.x);
		if (this.#position.y - (this.#size / 2) < -size / 2) this.#velocity.y = abs(this.#velocity.y);
		else if (this.#position.y + (this.#size / 2) > size / 2) this.#velocity.y = -abs(this.#velocity.y);
	}
	#render() {
		stroke(0);
		strokeWeight(5);
		fill(this.#color);
		circle(this.#position.x, this.#position.y, this.#size);
	}
	//#endregion
}