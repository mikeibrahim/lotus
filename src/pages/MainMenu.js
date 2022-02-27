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
		this.addAction({ char: 'S', callback: this.newGame.bind(this) });
		this.addAction({ char: 'L', callback: this.characterSelect.bind(this) });
		this.addAction({ char: 'O', callback: this.options.bind(this) });
	}
	update() {
		super.update();
	}
	takeDown() {
		super.takeDown();
	}

	// Public Methods
	newGame() {
		console.log("New Game");
		this.takeDown();
		App.inst.switchPage("game");
	}
	characterSelect() {
		console.log("Character Select");
		this.takeDown();
	}
	options() {
		console.log("Options");
		this.takeDown();
	}
}