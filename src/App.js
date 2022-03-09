class App {
//#region Data
	static inst;
	#backgroundColor;
	#targetBackgroundColor;
	#currentBackgroundColor;
	#backgroundColorTime;
	#currentBackgroundColorTime;

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
		this.#backgroundColor = 30;
		this.#targetBackgroundColor = this.#backgroundColor;
		this.#currentBackgroundColor = this.#backgroundColor;
		this.#backgroundColorTime = 1;
		this.#currentBackgroundColorTime = 0;
		this.changeBackground(40, 0.5);
	}
	update() {
		this.#updateBackground();
		this.currentPage.update();
	}
	keyPressed() {
		if (this.currentPage) this.currentPage.keyPressed();
	}
//#endregion
	
//#region Public Methods
	switchPage(page) {
		this.changeBackground(35, 0.5);
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
	changeBackground(color, duration) {
		this.#targetBackgroundColor = color;
		this.#currentBackgroundColor = color;
		this.#backgroundColorTime = duration;
		this.#currentBackgroundColorTime = duration;
	}
//#endregion

//#region Private Methods
	#updateBackground() {
		if (this.#currentBackgroundColorTime > 0) {
			this.#currentBackgroundColorTime -= deltaTime / 1000;
			this.#currentBackgroundColor = lerp(this.#backgroundColor, this.#targetBackgroundColor, this.#currentBackgroundColorTime / this.#backgroundColorTime);
		}
		background(this.#currentBackgroundColor);
	}
//#endregion
}