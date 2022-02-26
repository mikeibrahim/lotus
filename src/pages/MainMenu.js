class MainMenu extends Page {
	// Constructor
	constructor() {
		super();
	}

	// Overrides
	startUp() {
		this.addText({ text: "Lotus", spacing: 100, fontSize: 48 });
		this.addText({ text: "[S] - Start", spacing: 250, fontSize: 32 });
		this.addText({ text: "[L] - Load", spacing: 100, fontSize: 32 });
		this.addText({ text: "[O] - Options", spacing: 250, fontSize: 24 });
	}
	update() {
		super.update();
	}
	takeDown() {
		this.clearTexts();
		this.clearButtons();
	}

	// Public Methods
	newGame() {
		this.takeDown();
		App.inst.switchPage("game");
	}
	characterSelect() {
		this.takeDown();
	}
	options() {
		this.takeDown();
	}
}