class Enemies {
	//#region Data
	static RED = 0;
	static GREEN = 1;
	static YELLOW = 2;
	static ORANGE = 3;
	//#endregion

	//#region Static Getters
	static getEnemy(enemyType) {
		switch (enemyType) {
			case Enemies.RED:
				return new RedEnemy();
			case Enemies.GREEN:
				return new GreenEnemy();
			case Enemies.YELLOW:
				return new YellowEnemy();
			case Enemies.ORANGE:
				return new OrangeEnemy();
			default:
				console.error('Enemy type not found');
				return null;
		}
	}
	static getEnemies() {
		return [
			{
				enemyType: Enemies.RED,
				name: 'Red',
				color: '#ff0000',
				description: 'A red enemy that deals 1 damage.',
			},
			{
				enemyType: Enemies.GREEN,
				name: 'Green',
				color: '#00ff00',
				description: 'A fast green enemy that deals 1 damage.',
			},
			{
				enemyType: Enemies.YELLOW,
				name: 'Yellow',
				color: '#ffff00',
				description: 'A big yellow enemy that deals 1 damage.',
			},
			{
				enemyType: Enemies.ORANGE,
				name: 'Orange',
				color: '#ffa500',
				description: 'An enemy that slows you down.',
			},
		];
	}
	//#endregion
}

class RedEnemy extends Enemy {
	constructor() {
		super({
			damage: 1,
			size: 100,
			position: Environment.inst.getRandomPosition(100),
			speed: 300,
			color: color(255, 0, 0)
		});
	}
}

class GreenEnemy extends Enemy {
	constructor() {
		super({
			damage: 1,
			size: 75,
			position: Environment.inst.getRandomPosition(75),
			speed: 500,
			color: color(0, 255, 0)
		});
	}
}

class YellowEnemy extends Enemy {
	constructor() {
		super({
			damage: 1,
			size: 500,
			position: Environment.inst.getRandomPosition(50),
			speed: 200,
			color: color(255, 255, 0)
		});
	}
}

class OrangeEnemy extends Enemy {
	#field;
	constructor() {
		super({
			damage: 1,
			size: 100,
			position: Environment.inst.getRandomPosition(100),
			speed: 300,
			color: color(255, 165, 0)
		});
		let fieldSize = 500 + super.getSize();
		this.#field = new Field({
			size: fieldSize,
			color: color(255, 165, 0),
			parent: this,
			targets: () => [Player.inst],
			onCollisionEnter: (target) => { this.#onCollisionEnter(target); },
			onCollisionExit: (target) => { this.#onCollisionExit(target); },
		});
	}
	update() {
		super.update();
		this.#field.update();
	}
	#onCollisionEnter(target) { target.setSpeedMultiplier(7 / 10); }
	#onCollisionExit(target) { target.setSpeedMultiplier(10 / 7); }
}