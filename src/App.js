class App {
//#region Data
	static inst;
//#endregion

//#region Constructor
	constructor() {
		App.inst = this;
		this.currentPage = null;
		this.pages = {
			"mainMenu": new MainMenu(),
			"characterSelection": new CharacterSelection(),
			"game": new Game(),
			"confirmation": new Confirmation(),
		};
	}
//#endregion

//#region Callbacks
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
	//#endregion
	
//#region Public Methods
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
//#endregion
}