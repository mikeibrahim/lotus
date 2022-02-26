class Page {
	#texts;
	#buttons;

	constructor() {
		this.#texts = [];
	}

	// Method Stubs
	startUp() { }
	update() {
		textAlign(CENTER, CENTER);
		fill(255);
		let totalSpace = 0;
		for (let i = 0; i < this.#texts.length; i++) {
			textSize(this.#texts[i].fontSize);
			totalSpace += this.#texts[i].spacing;
			text(this.#texts[i].text, 0, -height / 2 + totalSpace);
		}
	}
	takeDown() { }

	// Public Methods
	addText({ text, spacing, fontSize }) {
		this.#texts.push({ text: text, spacing: spacing || 0, fontSize: fontSize || 32 });
		console.log(this.#texts);
	}
	clearTexts() {
		this.#texts = [];
	}
}