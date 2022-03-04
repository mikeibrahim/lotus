class RoundManager {
//#region Data
	static inst;
	#rounds;
	#currentRound;
	#orbSize;
//#endregion

//#region Constructor
	constructor() {
		RoundManager.inst = this;
		this.#rounds = 0;
		this.#currentRound = 0;
		this.#orbSize = 50;
	}
//#endregion

//#region Callbacks
	startUp() {
		this.#rounds = Rounds.getRounds();
	}
	update() {
		if (Game.inst.orbs.length == 0) this.nextRound();
	}
	takeDown() {
	}
//#endregion

//#region Public Methods
	loadRound(index) {
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

		Game.inst.enemies = [];
		Game.inst.orbs = [];
		Game.inst.particleSystems = [];
		this.#currentRound = index;
		storeItem("currentRound", index);
		GameUI.inst.setCurrentRound(index);
		let round = this.#rounds[index];

		round.enemies.forEach(enemy => {
			for (let j = 0; j < enemy.count; j++) Game.inst.enemies.push(Enemy.charToEnemy(enemy.type));
		});

		for (let i = 0; i < round.orbs; i++)
			Game.inst.orbs.push(new Orb({ size: this.#orbSize, position: Environment.inst.getRandomPosition(this.#orbSize) }));
		GameUI.inst.setMaxOrbs(round.orbs);
		GameUI.inst.setCurrentOrbs(0);

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
//#endregion

//#region Private Methods
	#saveOrbs() {
		let currentOrbs = getItem("currentOrbs", 0);
		let collectedOrbs = Rounds.getRounds()[this.#currentRound].orbs;
		let totalOrbs = currentOrbs + collectedOrbs;
		storeItem("currentOrbs", totalOrbs);
	}
	#saveMaxRound() {
		let currentRound = getItem("currentRound") || 0;
		let maxRound = getItem("maxRound") || 0;
		if (currentRound > maxRound) storeItem("maxRound", currentRound);
	}
//#endregion
}