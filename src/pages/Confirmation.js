class Confirmation extends Page{
//#region Data
	static inst;
	#confirmationText;
	#yesCallback;
	#noCallback;
//#endregion

//#region Constructor
	constructor() {
		super();
		Confirmation.inst = this;
		this.#confirmationText = "";
		this.#yesCallback = () => {};
		this.#noCallback = () => {};
	}
//#endregion

//#region Public Setters
	setConfirmationText(text) {
		this.#confirmationText = text;
		this.setText({ id:"confirmationText", text: this.#confirmationText });
	}
	setYesCallback(callback) { this.#yesCallback = callback; }
	setNoCallback(callback) { this.#noCallback = callback; }
//#endregion

//#region Overrides
	startUp() {
		super.startUp();
		this.addText({ id:"confirmationText", text: "Are you sure?", spacing: 100, fontSize: 48 });
		this.addText({ text: "[Y] - Yes", spacing: 300, fontSize: 32 });
		this.addText({ text: "[N] - No", spacing: 100, fontSize: 32 });
		this.addAction({ char: 'Y', callback: () => {
			this.takeDown();
			this.#yesCallback();
		} });
		this.addAction({ char: 'N', callback: () => {
			this.takeDown();
			this.#noCallback();
		} });
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
}