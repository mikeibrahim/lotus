class App {
	//#region Data
	static inst;
	#backgroundColor;
	#targetBackgroundColor;
	#currentBackgroundColor;
	#backgroundColorTime;
	#currentBackgroundColorTime;
	#keyboardControls;
	//#endregion

	//#region Constructor
	constructor() {
		App.inst = this;
		this.currentPage = null;
		this.pages = {
			"mainMenu": new MainMenu(),
			"game": new Game(),
			"difficulty": new Difficulty(),
			"characterSelection": new CharacterSelection(),
			"options": new Options(),
			"confirmation": new Confirmation(),
		};
	}
	//#endregion

	//#region Public Setters
	setKeyboardControls(value) { this.#keyboardControls = value; }
	//#endregion

	//#region Public Getters
	getKeyboardControls() { return this.#keyboardControls; }
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
		this.#keyboardControls = getItem("keyboardControls");
	}
	update() {
		this.#updateBackground();
		this.currentPage.update();
	}
	keyPressed() {
		if (this.currentPage) this.currentPage.keyPressed();
	}
	mousePressed() {
		if (this.currentPage) this.currentPage.mousePressed();
	}
	//#endregion

	//#region Public Methods
	switchPage(page) {
		this.changeBackground(40, 0.5);
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