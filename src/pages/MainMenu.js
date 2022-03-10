class MainMenu extends Page {
//#region Constructor
	constructor() {
		super();
	}
//#endregion

//#region Overrides
	startUp() {
		super.startUp();
		this.addText({ text: "Lotus", spacing: 100, fontSize: 48 });
		this.addText({ id: "loadGame", text: "[L] - Load Game", spacing: 200, fontSize: 32 });
		this.addText({ text: "[N] - New Game", spacing: 100, fontSize: 32 });
		this.addText({ text: "[C] - Character Selection", spacing: 100, fontSize: 32 });
		this.addText({ text: "[O] - Options", spacing: 200, fontSize: 24 });
		this.addAction({ char: 'N', callback: () => this.newGame() });
		this.addAction({ id:"loadGame",char: 'L', callback: () => this.loadGame() });
		this.addAction({ char: 'C', callback: () => this.characterSelection() });
		this.addAction({ char: 'O', callback: () => this.options() });
		this.#checkLoadedGame();
	}
	update() {
		super.update();
	}
	keyPressed() {
		super.keyPressed();
	}
	takeDown() {
		super.takeDown();
	}
//#endregion

//#region Public Methods
	newGame() {
		let currentRound = getItem("currentRound") || 0;
		if (currentRound > 0) {
			App.inst.switchPage("confirmation");
			Confirmation.inst.setConfirmationText("Are you sure you want to start a new game?\n(your current round is " + currentRound + ")");
			Confirmation.inst.setYesCallback(() => {
				storeItem("currentRound", 0);
				App.inst.switchPage("game");
			});
			Confirmation.inst.setNoCallback(() => {
				App.inst.switchPage("mainMenu");
			});
		} else {
			App.inst.switchPage("game");
		}
	}
	loadGame() {
		App.inst.switchPage("game");
	}
	characterSelection() {
		App.inst.switchPage("characterSelection");
	}
	options() {
		App.inst.switchPage("options");
	}
//#endregion

//#region Private Methods
	#checkLoadedGame() {
		let currentRound = getItem("currentRound") || 0;
		if (currentRound <= 0) {
			this.setTextEnabled({ id: "loadGame", enabled: false });
			this.setActionEnabled({ id: "loadGame", enabled: false });
		}
	}
//#endregion
}