class App {
	// Data
	static inst;

	// Constructor
	constructor() {
		App.inst = this;
		this.currentPage = null;
		this.pages = {
			"mainMenu": new MainMenu(),
			"game": new Game()
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