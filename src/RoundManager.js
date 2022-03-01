class RoundManager {
	// Data
	static inst;
	#rounds;
	#currentRound;
	#orbSize;

	// Constructor
	constructor() {
		// Data
		RoundManager.inst = this;
		this.#rounds = 0;
		this.#currentRound = 0;
		this.#orbSize = 50;
	}

	// Public Methods
	startUp() {
		this.#rounds = Rounds.getRounds();
	}
	update() {
		if (Game.inst.orbs.length == 0) this.nextRound();
	}
	loadRound(index) {
		// TODO: Win game
		if (index >= this.#rounds.length) {
			this.loadRound(0);
			return;
		}
		// Round
		Game.inst.enemies = [];
		Game.inst.orbs = [];
		Game.inst.particleSystems = [];
		this.#currentRound = index;
		storeItem("currentRound", index);
		GameUI.inst.setCurrentRound(index);
		let round = this.#rounds[index];
		// Enemies
		round.enemies.forEach(enemy => {
			for (let j = 0; j < enemy.count; j++) Game.inst.enemies.push(Enemy.charToEnemy(enemy.type));
		});
		// Orbs
		for (let i = 0; i < round.orbs; i++)
			Game.inst.orbs.push(new Orb({ size: this.#orbSize, position: Environment.inst.getRandomPosition(this.#orbSize) }));
		GameUI.inst.setMaxOrbs(round.orbs);
		GameUI.inst.setCurrentOrbs(0);
		// Player
		Player.inst.resetPosition();
		Player.inst.setInvincibility(2000);
		Character.inst.nextRound();
		PlayerCamera.inst.zoomIn();
	}
	nextRound() {
		this.loadRound(this.#currentRound + 1);
	}
}