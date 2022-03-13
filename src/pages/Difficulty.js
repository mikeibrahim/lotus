class Difficulty extends Page {
	//#region Data
	static inst;
	#difficulty;
	//#endregion

	//#region Constructor
	constructor() {
		super();
		Difficulty.inst = this;
	}
	//#endregion

	//#region Public Setters
	applyDifficulty() { this.#difficulty = getItem("difficulty") || "easy"; }
	//#endregion

	//#region Public Methods
	enemySpeedScale(speed) {
		switch (this.#difficulty) {
			case "easy":
				return speed;
			case "hard":
				return speed * 1.5;
			case "daredevil":
				return speed * 1.5;
		}
	}
	getDifficulty() { return this.#difficulty; }
	//#endregion

	//#region Overrides
	startUp() {
		super.startUp();
		console.log(this.#difficulty);
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
		this.#difficulty = "easy";
		storeItem("difficulty", this.#difficulty);
	}
	#hard() {
		this.#difficulty = "hard";
		storeItem("difficulty", this.#difficulty);
	}
	#dareDevil() {
		this.#difficulty = "daredevil";
		storeItem("difficulty", this.#difficulty);
	}
	#startGame() {
		App.inst.switchPage("game");
	}
	#back() {
		App.inst.switchPage("mainMenu");
	}
	//#endregion
}