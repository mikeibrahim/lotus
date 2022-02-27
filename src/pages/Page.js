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
		this.#checkForActions();
	}
	takeDown() {
		this.#clearData();
	}

	// Public Methods
	addText({ text, spacing, fontSize }) {
		this.#texts.push({ text: text, spacing: spacing || 0, fontSize: fontSize || 32 });
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
			let key = this.#actions[i].char.charCodeAt(0);
			if (keyIsDown(key)) {
				console.log("Action: " + this.#actions[i].char);
				this.#actions[i].callback();
			}
		}
	}
	#clearData() {
		this.#texts = [];
		this.#actions = [];
	}
}