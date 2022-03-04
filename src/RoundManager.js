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

	// Callbacks
	startUp() {
		this.#rounds = Rounds.getRounds();
	}
	update() {
		if (Game.inst.orbs.length == 0) this.nextRound();
	}
	takeDown() {
	}

	// Public Methods
	loadRound(index) {
		// TODO: Win game
		if (index >= this.#rounds.length) {
			App.inst.switchPage("confirmation");
			Confirmation.inst.setConfirmationText("You have completed all the (current) rounds!\nWould you like to play again?");
			Confirmation.inst.setYesCallback(() => {
				storeItem("currentRound", 0);
				App.inst.switchPage("game");
			});
			Confirmation.inst.setNoCallback(() => {
				App.inst.switchPage("mainMenu");
			});
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
		this.#saveOrbs();
		this.#saveMaxRound();
		this.loadRound(this.#currentRound + 1);
	}

	// Private Methods
	#saveOrbs() {
		let currentOrbs = getItem("currentOrbs", 0);
		let collectedOrbs = Rounds.getRounds()[this.#currentRound].orbs;
		let totalOrbs = currentOrbs + collectedOrbs;
		console.log(`Collected ${collectedOrbs} orbs. Total: ${totalOrbs}`);
		storeItem("currentOrbs", totalOrbs);
	}
	#saveMaxRound() {
		let currentRound = getItem("currentRound") || 0;
		let maxRound = getItem("maxRound") || 0;
		if (currentRound > maxRound) storeItem("maxRound", currentRound);
		console.log(`currentRound: ${currentRound}`);
		console.log(`Max Round: ${getItem("maxRound")}`);
	}
}