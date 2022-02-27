class Page {
	#texts;
	#actions;

	constructor() {
		this.#texts = [];
		this.#actions = [];
	}

	// Method Stubs
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

	// Public Methods
	addText({ id, text, spacing, fontSize }) {
		this.#texts.push({ id: id || this.#texts.length, text: text, spacing: spacing || 0, fontSize: fontSize || 32 });
	}
	setText({ id, text }) {
		for (let i = 0; i < this.#texts.length; i++)
			if (this.#texts[i].id == id) { this.#texts[i].text = text; return; }
	}
	addAction({ char, callback }) {
		this.#actions.push({ char: char, callback: callback });
	}
	
	// Private Methods
	#renderText() {
		textAlign(CENTER, CENTER);
		fill(255);
		let totalSpace = 0;
		for (let i = 0; i < this.#texts.length; i++) {
			totalSpace += this.#texts[i].spacing;
			textSize(this.#texts[i].fontSize);
			text(this.#texts[i].text, 0, -height / 2 + totalSpace);
		}
	}
	#checkForActions() {
		for (let i = 0; i < this.#actions.length; i++) {
			// let key = this.#actions[i].char;
			let char = this.#actions[i].char;
			if (typeof char == "string") char = char.charCodeAt(0);
			if (keyIsDown(char)) this.#actions[i].callback();
		}
	}
	#clearData() {
		this.#texts = [];
		this.#actions = [];
	}
}