class MainMenu extends Page {
	// Constructor
	constructor() {
		super();
	}
	
	// Overrides
	startUp() {
		this.addText({ 	text: "Lotus", position: createVector(0, -height / 2 + 100), fontSize: 48 });
		this.addButton({ text: "New Game", callback: () => this.newGame(), position: createVector(-width/2 + 250, 0), fontSize: 32, size: createVector(200, 80) });
		this.addButton({ text: "Character Select", callback: () => this.characterSelect(), position: createVector(width/2 - 250, 0), fontSize: 32, size: createVector(200, 80) });
		this.addButton({ text: "Options", callback: () => this.options(), position: createVector(0, height/2 - 50), fontSize: 32, size: createVector(200, 50) });
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