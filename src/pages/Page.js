class Page {
//#region Data
	#texts;
	#actions;
//#endregion

//#endregion Constructor
	constructor() {
		this.#texts = [];
		this.#actions = [];
	}
//#endregion

//#region Method Stubs
	startUp() { }
	update() {
		this.#renderText();
	}
	keyPressed() {
		this.#checkForActions();
	}
	takeDown() {
		this.#clearData();
	}
//#endregion

//#region Public Methods
	addText({ id, text, spacing, fontSize, enabled }) {
		this.#texts.push({
			id: id || this.#texts.length,
			text: text,
			spacing: spacing || 0,
			fontSize: fontSize || 32,
			enabled: enabled || true
		});
	}
	setText({ id, text }) {
		for (let i = 0; i < this.#texts.length; i++)
			if (this.#texts[i].id == id) { this.#texts[i].text = text; return; }
	}
	setTextEnabled({ id, enabled }) {
		for (let i = 0; i < this.#texts.length; i++)
			if (this.#texts[i].id == id) { this.#texts[i].enabled = enabled; return; }
	}
	addAction({ id, char, callback, enabled }) {
		this.#actions.push({
			id: id || this.#actions.length,
			char: char,
			callback: callback,
			enabled: enabled || true
		});
	}
	setActionEnabled({ id, enabled }) {
		for (let i = 0; i < this.#actions.length; i++)
			if (this.#actions[i].id == id) { this.#actions[i].enabled = enabled; return; }
	}
//#endregion

//#region Private Methods
	#renderText() {
		textAlign(CENTER, CENTER);
		rectMode(CENTER);
		textWrap(WORD);
		let totalSpace = 0;
		for (let i = 0; i < this.#texts.length; i++) {
			let textObj = this.#texts[i];
			totalSpace += textObj.spacing;
			fill(textObj.enabled ? 255 : 100);
			textSize(textObj.fontSize);
			text(textObj.text, 0, -height / 2 + totalSpace, width);
		}
	}
	#checkForActions() {
		for (let i = 0; i < this.#actions.length; i++) {
			let char = this.#actions[i].char;
			if (typeof char == "string") char = char.charCodeAt(0);
			if (keyIsDown(char) && this.#actions[i].enabled) this.#actions[i].callback();
		}
	}
	#clearData() {
		this.#texts = [];
		this.#actions = [];
	}
//#endregion
}