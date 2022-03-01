class App {
	// Data
	static inst;

	// Constructor
	constructor() {
		App.inst = this;
		this.currentPage = null;
		this.pages = {
			"mainMenu": new MainMenu(),
			"confirmation": new Confirmation(),
			"game": new Game(),
			"characterSelection": new CharacterSelection(),
		};
	}

	// Callbacks
	init() {
		this.switchPage("mainMenu");
	}
	update() {
		background(30);
		this.currentPage.update();
	}
	keyPressed() {
		if (this.currentPage) this.currentPage.keyPressed();
	}
	
	// Public Methods
	switchPage(page) {
		this.takeDownCurrentPage();
		this.currentPage = this.pages[page];
		this.startUpCurrentPage();
	}
	takeDownCurrentPage() {
		if (this.currentPage) this.currentPage.takeDown();
	}
	startUpCurrentPage() {
		if (this.currentPage) this.currentPage.startUp();
	}
}