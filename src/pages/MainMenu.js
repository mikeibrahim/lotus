class MainMenu extends Page {
	// Constructor
	constructor() {
		super();
	}

	// Overrides
	startUp() {
		super.startUp();
		this.addText({ text: "Lotus", spacing: 100, fontSize: 48 });
		this.addText({ text: "[S] - Start", spacing: 200, fontSize: 32 });
		this.addText({ text: "[L] - Load", spacing: 100, fontSize: 32 });
		this.addText({ text: "[C] - Character Selection", spacing: 100, fontSize: 32 });
		this.addText({ text: "[O] - Options", spacing: 200, fontSize: 24 });
		this.addAction({ char: 'S', callback: () => { this.newGame(this) } });
		this.addAction({ char: 'L', callback: () => { this.loadGame(this) } });
		this.addAction({ char: 'C', callback: () => { this.characterSelection(this) } });
		this.addAction({ char: 'O', callback: () => { this.options(this) } });
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

	// Public Methods
	newGame() {
		this.takeDown();
		App.inst.switchPage("game");
	}
	loadGame() {
		this.takeDown();
	}
	characterSelection() {
		this.takeDown();
		App.inst.switchPage("characterSelection");
	}
	options() {
		this.takeDown();
	}
}