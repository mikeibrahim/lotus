class RoundManager {
//#region Data
	static inst;
	#rounds;
	#currentRound;
//#endregion

//#region Constructor
	constructor() {
		RoundManager.inst = this;
		this.#rounds = 0;
		this.#currentRound = 0;
	}
//#endregion

//#region Callbacks
	startUp() {
		this.#rounds = Rounds.getRounds();
	}
	update() { }
	takeDown() { }
//#endregion

//#region Public Methods
	loadRound(index) {
		if (index >= this.#rounds.length) {
			App.inst.switchPage("confirmation");
			Confirmation.inst.setConfirmationText("You have completed all the (current) rounds!\nRestart?");
			Confirmation.inst.setYesCallback(() => {
				storeItem("currentRound", 0);
				App.inst.switchPage("game");
			});
			Confirmation.inst.setNoCallback(() => {
				App.inst.switchPage("mainMenu");
			});
			return;
		}
		
		this.#currentRound = index;
		storeItem("currentRound", index);
		
		Game.inst.clearObjects();
		let round = this.#rounds[index];
		round.enemies.forEach(enemy => {
			for (let j = 0; j < enemy.count; j++)
				Game.inst.addEnemy(Enemies.getEnemy(enemy.enemyType));
		});
		for (let i = 0; i < round.orbs; i++)
			Game.inst.addOrb(new Orb());
		for (let i = 0; i < round.hearts; i++)
			Game.inst.addHeart(new Heart());
		
		Player.inst.setPosition(createVector(0, 0));
		Player.inst.setInvincibility(2000);
		Character.inst.nextRound();
		PlayerCamera.inst.zoomIn();
		GameUI.inst.setCurrentRound(index);
		GameUI.inst.setMaxOrbs(round.orbs);
		GameUI.inst.setCurrentOrbs(0);
		App.inst.changeBackground(10, 0.5);
	}
	nextRound() {
		this.#saveOrbs();
		this.#saveHealth();
		this.#saveMaxRound();
		this.loadRound(this.#currentRound + 1);
	}
//#endregion

//#region Private Methods
	#saveOrbs() {
		let currentOrbs = getItem("currentOrbs") || 0;
		let collectedOrbs = Rounds.getRounds()[this.#currentRound].orbs;
		let totalOrbs = currentOrbs + collectedOrbs;
		storeItem("currentOrbs", totalOrbs);
	}
	#saveHealth() {
		let currentHealth = Player.inst.getCurrentHealth();
		storeItem("currentHealth", currentHealth);
	}
	#saveMaxRound() {
		let currentRound = getItem("currentRound") || 0;
		let maxRound = getItem("maxRound") || 0;
		if (currentRound > maxRound) storeItem("maxRound", currentRound);
	}
//#endregion
}