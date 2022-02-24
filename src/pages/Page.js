class Page {
	#texts;
	#buttons;
	
	constructor() {
		this.#texts = [];
		this.#buttons = [];
	}

	// Method Stubs
	startUp() {}
	update() {
		textAlign(CENTER, CENTER);
		fill(255);
		for (let i = 0; i < this.#texts.length; i++) {
			textSize(this.#texts[i].fontSize);
			text(this.#texts[i].text, this.#texts[i].position.x, this.#texts[i].position.y);
		}
	}
	takeDown() {}

	// Public Methods
	addText({text, position, fontSize}) {
		this.#texts.push({ text: text, position: position || createVector(0, 0), fontSize: fontSize || 32 });
	}
	addButton({text, callback, position, fontSize, size}) {
		let button = createButton(text);
		this.#buttons.push(button);
		button.mousePressed(callback);
		button.size(size.x, size.y);
		button.style("font-size", (fontSize + "px") || "32px");
		button.center();
		button.position(button.x + position.x, button.y + position.y);
	}
	clearTexts() {
		this.#texts = [];
	}
	clearButtons() {
		for (let i = 0; i < this.#buttons.length; i++) this.#buttons[i].remove();
		this.#buttons = [];
	}
}