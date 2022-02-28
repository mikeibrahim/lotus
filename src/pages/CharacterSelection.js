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
		this.#currentCharacterIndex =0;
		this.#leftButton = null;
		this.#rightButton = null;
	}

	// Overrides
	startUp() {
		super.startUp();
		this.#characters = Characters.getCharacters();
		this.#currentCharacterIndex = getItem("currentCharacterIndex") || 0;
		console.log("1",this.#characters);
		console.log("2",this.#characters[this.#currentCharacterIndex]);
		console.log("3",this.#characters[this.#currentCharacterIndex].name);

		this.addText({ text: "Character Selection", spacing: 100, fontSize: 42 });
		this.addText({ id: "character", text: this.#characters[this.#currentCharacterIndex].name, spacing: 150, fontSize: 32 });
		this.addText({ text: "[S] - Save Character", spacing: 400, fontSize: 24 });
		this.addText({ text: "[B] - Back", spacing: 75, fontSize: 24 });
		this.addAction({ char: LEFT_ARROW, callback: () => { this.#updateCharacterIndex(-1); } });
		this.addAction({ char: RIGHT_ARROW, callback: () => { this.#updateCharacterIndex(1); } });
		this.addAction({ char: 'S', callback: () => { this.saveCharacter(); } });
		this.addAction({ char: 'B', callback: () => { this.back(); } });
		this.#createButtons();
		this.#updateCharacterIndex(0);
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
		this.#leftButton.remove();
		this.#rightButton.remove();
	}

	// Public Methods
	saveCharacter() {
		this.takeDown();
		console.log("Character about to be saved: ", this.#characters[this.#currentCharacterIndex]);
		storeItem("character", this.#characters[this.#currentCharacterIndex]);
		storeItem("currentCharacterIndex", this.#currentCharacterIndex);
		App.inst.switchPage("mainMenu");
	}
	back() {
		this.takeDown();
		App.inst.switchPage("mainMenu");
	}

	// Private Methods
	#createButtons() {
		this.#leftButton = createButton("<");
		this.#rightButton = createButton(">");
		this.#leftButton.size(50, 50);
		this.#rightButton.size(50, 50);
		this.#leftButton.style("font-size", "32px");
		this.#rightButton.style("font-size", "32px");
		this.#leftButton.style("border-radius", "50%");
		this.#rightButton.style("border-radius", "50%");
		this.#leftButton.position(width / 2 - 200 - this.#leftButton.width / 2, height / 2 - this.#leftButton.height / 2);
		this.#rightButton.position(width / 2 + 200 - this.#rightButton.width / 2, height / 2 - this.#rightButton.height / 2);
		this.#leftButton.mousePressed(() => { this.#updateCharacterIndex(-1); });
		this.#rightButton.mousePressed(() => { this.#updateCharacterIndex(1); });
	}
	#renderCharacters() {
		let character = this.#characters[this.#currentCharacterIndex];
		this.setText({ id: "character", text: character.name });
		fill(character.color);
		circle(0, 0, 150);
	}
	#updateCharacterIndex(amount) {
		this.#currentCharacterIndex += amount;
		if (this.#currentCharacterIndex <= 0) this.#leftButton.hide();
		else this.#leftButton.show();
		if (this.#currentCharacterIndex >= this.#characters.length - 1) this.#rightButton.hide();
		else this.#rightButton.show();
		this.#currentCharacterIndex = constrain(this.#currentCharacterIndex, 0, this.#characters.length - 1);
	}
}