class Difficulty extends Page {
	//#region Constructor
	constructor() {
		super();
	}
	//#endregion

	//#region Static Methods
	static enemySpeedScale(speed) {
		let difficulty = getItem("difficulty");
		switch (difficulty) {
			case "easy":
				return speed;
			case "hard":
				return speed * 1.5;
			case "daredevil":
				return speed * 1.5;
		}
	}
	static getDifficulty() {
		return getItem("difficulty");
	}
	//#endregion

	//#region Overrides
	startUp() {
		super.startUp();
		this.addText({ text: "Select Difficulty", spacing: 100, fontSize: 48 });
		this.addText({ text: "[E] - Easy", spacing: 200, fontSize: 32 });
		this.addText({ text: "[H] - Hard", spacing: 100, fontSize: 32 });
		this.addText({ text: "[D] - Daredevil", spacing: 100, fontSize: 32 });
		this.addText({ text: "[B] - Back", spacing: 200, fontSize: 24 });
		this.addAction({ char: 'E', callback: () => { this.#easy(); this.#startGame(); } });
		this.addAction({ char: 'H', callback: () => { this.#hard(); this.#startGame(); } });
		this.addAction({ char: 'D', callback: () => { this.#dareDevil(); this.#startGame(); } });
		this.addAction({ char: 'B', callback: () => { this.#back(); } });
	}
	//#endregion

	//#region Private Methods
	#easy() {
		storeItem("difficulty", "easy");
	}
	#hard() {
		storeItem("difficulty", "hard");
	}
	#dareDevil() {
		storeItem("difficulty", "daredevil");
	}
	#startGame() {
		App.inst.switchPage("game");
	}
	#back() {
		App.inst.switchPage("mainMenu");
	}
	//#endregion
}