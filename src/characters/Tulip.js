class Tulip extends Character {
//#region Data
	#pushSize;
	#pushAmount;
//#endregion

//#region Constructor
	constructor() {
		super();
		Character.inst = this;
		this.#pushSize = 300;
		this.#pushAmount = 150;
	}
//#endregion

//#region Callbacks
	startUp() {
		super.startUp(Characters.TULIP);
	}
	update() {
		super.update();
	}
	keyPressed() {
		super.keyPressed();
	}
	nextRound() {
		super.nextRound();
	}
	passiveAbility() {
		super.passiveAbility();
		this.#push();
	}
	activeAbility() {
		super.activeAbility();
	}
	takeDown() {
		super.takeDown();
	}
//#endregion

//#region Private methods
	#push() {
		this.#drawPushCircle();
		this.#pushEnemies();
	}
	#drawPushCircle() {
		noStroke();
		fill(red(super.getPlayerColor()), green(super.getPlayerColor()), blue(super.getPlayerColor()), 100);
		let position = Player.inst.getPosition();
		circle(position.x, position.y, this.#pushSize + super.getPlayerSize());
	}
	#pushEnemies() {
		Game.inst.enemies.forEach(enemy => {
			let enemyPosition = enemy.getPosition();
			let playerPosition = Player.inst.getPosition();
			let distance = dist(enemyPosition.x, enemyPosition.y, playerPosition.x, playerPosition.y);
			let enemySize = enemy.getSize();
			let characterSize = super.getPlayerSize() + this.#pushSize;
			if (distance < characterSize / 2 + enemySize / 2) { // Push enemy
				let pushVector = p5.Vector.sub(enemyPosition, playerPosition);
				pushVector.normalize();
				pushVector.mult(this.#pushAmount * deltaTime / 1000);
				enemy.setPosition(p5.Vector.add(enemyPosition, pushVector));
			}
		});
	}
//#endregion
}