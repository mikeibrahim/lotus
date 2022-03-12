class Enemies {
	//#region Data
	static RED = 0;
	static GREEN = 1;
	static YELLOW = 2;
	static ORANGE = 3;
	static PINK = 4;
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
			case Enemies.PINK:
				return new PinkEnemy();
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
				description: 'A big yellow enemy that deals 2 damage.',
			},
			{
				enemyType: Enemies.ORANGE,
				name: 'Orange',
				color: '#ffa500',
				description: 'An orange enemy that slows you down. Deals 1 damage.',
			},
			{
				enemyType: Enemies.PINK,
				name: 'Pink',
				color: '#ff00ff',
				description: 'A pink enemy that makes you larger. Deals 2 damage.',
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
			speed: 500,
			color: color(0, 255, 0)
		});
	}
}

class YellowEnemy extends Enemy {
	constructor() {
		super({
			damage: 2,
			size: 500,
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
	#onCollisionEnter(target) { target.setSpeedMultiplier(8.5 / 10); }
	#onCollisionExit(target) { target.setSpeedMultiplier(10 / 8.5); }
}

class PinkEnemy extends Enemy {
	#field;
	constructor() {
		super({
			damage: 2,
			size: 50,
			speed: 350,
			color: color(255, 0, 255)
		});
		let fieldSize = 350 + super.getSize();
		this.#field = new Field({
			size: fieldSize,
			color: color(255, 0, 255),
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
	#onCollisionEnter(target) { target.setSizeMultiplier(10/ 7); }
	#onCollisionExit(target) { target.setSizeMultiplier(7 / 10); }
}