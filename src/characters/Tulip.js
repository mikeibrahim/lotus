class Tulip extends Character {
//#region Data
	#characterType;
	#maxHealth;
	#sizeMultiplier;
	#speedMultiplier;
	#pushSize;
	#pushAmount;
//#endregion

//#region Constructor
	constructor() {
		super();
		Character.inst = this;
		this.#characterType = Characters.TULIP;
		this.#maxHealth = [1, 1, 2, 3];
		this.#sizeMultiplier = [1, 1, 1, 1];
		this.#speedMultiplier = [1, 1, 1.2, 1.2];
		this.#pushSize = [250, 300, 350, 400];
		this.#pushAmount = [150, 160, 170, 180];
	}
//#endregion

//#region Callbacks
	startUp() {
		let level = Characters.getCharacterLevel(this.#characterType);
		super.startUp({
			characterType: this.#characterType,
			maxHealth: this.#maxHealth[level],
			sizeMultiplier: this.#sizeMultiplier[level],
			speedMultiplier: this.#speedMultiplier[level],
		});
		this.#pushSize = this.#pushSize[level];
		this.#pushAmount = this.#pushAmount[level];
		console.log(this.#pushAmount);
		this.field = new Field({
			size: this.#pushSize + this.getPlayerSize(),
			color: super.getPlayerColor(),
			parentPositionCallback: () => Player.inst.getPosition(),
			targetsCallback: () => Game.inst.enemies,
			interactionCallback: (target) => this.#interaction(target),
		});
	}
	update() {
		super.update();
		this.field.update();
	}
	keyPressed() {
		super.keyPressed();
	}
	nextRound() {
		super.nextRound();
	}
	passiveAbility() {
		super.passiveAbility();
		// this.#push();
	}
	activeAbility() {
		super.activeAbility();
	}
	takeDown() {
		super.takeDown();
	}
//#endregion

//#region Private methods
	#interaction(target) {
		let targetPosition = target.getPosition();
		let playerPosition = Player.inst.getPosition();
		let pushVector = p5.Vector.sub(targetPosition, playerPosition);
		pushVector.normalize();
		pushVector.mult(this.#pushAmount * deltaTime / 1000);
		target.setPosition(p5.Vector.add(targetPosition, pushVector));
	}
	// #push() {
	// 	this.#drawPushCircle();
	// 	this.#pushEnemies();
	// }
	// #drawPushCircle() {
	// 	noStroke();
	// 	fill(red(super.getPlayerColor()), green(super.getPlayerColor()), blue(super.getPlayerColor()), 100);
	// 	let position = Player.inst.getPosition();
	// 	circle(position.x, position.y, this.#pushSize + super.getPlayerSize());
	// }
	// #pushEnemies() {
	// 	Game.inst.enemies.forEach(enemy => {
	// 		let enemyPosition = enemy.getPosition();
	// 		let playerPosition = Player.inst.getPosition();
	// 		let distance = dist(enemyPosition.x, enemyPosition.y, playerPosition.x, playerPosition.y);
	// 		let enemySize = enemy.getSize();
	// 		let characterSize = super.getPlayerSize() + this.#pushSize;
	// 		if (distance < characterSize / 2 + enemySize / 2) { // Push enemy
	// 			let pushVector = p5.Vector.sub(enemyPosition, playerPosition);
	// 			pushVector.normalize();
	// 			pushVector.mult(this.#pushAmount * deltaTime / 1000);
	// 			enemy.setPosition(p5.Vector.add(enemyPosition, pushVector));
	// 		}
	// 	});
	// }
//#endregion
}