class RoundManager {
	// Data
	#rounds;
	#currentRound;

	// Constructor
	constructor() {
		// Data
		this.#rounds = [
			{
				enemies: [
					{ type: 'r', count: 10 },
				],
				orbs: 1
			},
			{
				enemies: [
					{ type: 'r', count: 20 },
				],
				orbs: 1
			},
			{
				enemies: [
					{ type: 'r', count: 30 },
				],
				orbs: 1
			},
		];
		this.#currentRound = 0;
	}

	// Public Methods
	update() {
		if (ORBS.length == 0) this.nextRound();
	}
	loadRound(index) {
		if (index >= this.#rounds.length) {
			// TODO: Win game
			this.loadRound(0);
			return;
		}
		// Round
		ENEMIES = [];
		ORBS = [];
		this.#currentRound = index;
		let round = this.#rounds[index];
		// Enemies
		round.enemies.forEach(enemy => {
			for (let j = 0; j < enemy.count; j++) ENEMIES.push(Enemy.charToEnemy(enemy.type));
		});
		// Orbs
		for (let i = 0; i < round.orbs; i++)
			ORBS.push(new Orb());
		// Player
		PLAYER.resetPosition();
		PLAYER.setInvincibility(2000);
		PLAYER_CAMERA.zoomIn();
	}
	nextRound() {
		this.loadRound(this.#currentRound + 1);
	}
}