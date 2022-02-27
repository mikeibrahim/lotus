class CharacterSelection extends Page {
	// Data
	#characters;
	#currentCharacterIndex;
	#leftButton;
	#rightButton;

	// Constructor
	constructor() {
		super();
		this.#characters = [];
		this.#currentCharacterIndex = 0;
		this.#leftButton = null;
		this.#rightButton = null;
	}

	// Overrides
	startUp() {
		super.startUp();
		this.#characters = Characters.getCharacters();

		this.addText({ text: "Character Selection", spacing: 100, fontSize: 32 });
		this.addText({ id: "character",text: this.#characters[this.#currentCharacterIndex].name, spacing: 200, fontSize: 32 });
		this.addAction({ char: LEFT_ARROW, callback: () => { this.#currentCharacterIndex--; } });
		this.addAction({ char: RIGHT_ARROW, callback: () => { this.#currentCharacterIndex++; } });
		this.#createButtons();
	}
	update() {
		super.update();
		this.#renderCharacters();
	}
	keyPressed() {
		super.keyPressed();
	}
	takeDown() {
		super.takeDown();
	}

	// Private
	#createButtons() {
		this.#leftButton = createButton("<");
		this.#rightButton = createButton(">");
		this.#leftButton.position(width / 2 - 100, height / 2 + 100);
		this.#rightButton.position(width / 2 + 100, height / 2 + 100);
		this.#leftButton.mousePressed(() => { this.#currentCharacterIndex--; });
		this.#rightButton.mousePressed(() => { this.#currentCharacterIndex++; });
	}
	#renderCharacters() {
		if (this.#currentCharacterIndex <= 0) this.#leftButton.hide();
		else this.#leftButton.show();
		if (this.#currentCharacterIndex >= this.#characters.length - 1) this.#rightButton.hide();
		else this.#rightButton.show();
		this.#currentCharacterIndex = constrain(this.#currentCharacterIndex, 0, this.#characters.length - 1);

		let character = this.#characters[this.#currentCharacterIndex];
		this.setText({ id: "character", text: character.name });
	}
}