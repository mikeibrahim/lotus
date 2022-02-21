class Rounds {
	// Data
	#rounds;
	#currentRound;

	// Constructor
	constructor() {
		// Data
		this.#rounds = [
			{
				enemies: [
					{ type: 'r', count: 50 },
				]
			}
		];
		this.#currentRound = 0;
	}

	// Public Methods
	loadRound(index) {
		ENEMIES = [];
		this.#currentRound = index;
		let round = this.#rounds[index];
		let enemies = round.enemies;
		for (let i = 0; i < enemies.length; i++) {
			let enemy = enemies[i];
			for (let j = 0; j < enemy.count; j++) ENEMIES.push(Enemy.charToEnemy(enemy.type));
		}
	}
	nextRound() {

	}
}