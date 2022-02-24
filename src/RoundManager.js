class RoundManager {
	// Data
	static inst;
	#rounds;
	#currentRound;

	// Constructor
	constructor() {
		// Data
		RoundManager.inst = this;
		this.#rounds = Rounds.getRounds();
		this.#currentRound = 0;
	}

	// Public Methods
	update() {
		if (Game.inst.orbs.length == 0) this.nextRound();
	}
	loadRound(index) {
		if (index >= this.#rounds.length) {
			// TODO: Win game
			this.loadRound(0);
			return;
		}
		// Round
		Game.inst.enemies = [];
		Game.inst.orbs = [];
		this.#currentRound = index;
		let round = this.#rounds[index];
		// Enemies
		round.enemies.forEach(enemy => {
			for (let j = 0; j < enemy.count; j++) Game.inst.enemies.push(Enemy.charToEnemy(enemy.type));
		});
		// Orbs
		for (let i = 0; i < round.orbs; i++)
			Game.inst.orbs.push(new Orb());
		// Player
		Player.inst.resetPosition();
		Player.inst.setInvincibility(2000);
		PlayerCamera.inst.zoomIn();
	}
	nextRound() {
		this.loadRound(this.#currentRound + 1);
	}
}