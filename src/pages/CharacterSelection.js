class CharacterSelection extends Page {
	// Data
	#characters;
	#characterIndex;
	#currentCharacterIndex;
	#currentCharacterUnlocked;
	#leftButton;
	#rightButton;

	// Constructor
	constructor() {
		super();
		this.#characters = [];
		this.#characterIndex = 0;
		this.#currentCharacterIndex = 0;
		this.#currentCharacterIndex = true;
		this.#leftButton = null;
		this.#rightButton = null;
	}

	// Overrides
	startUp() {
		super.startUp();
		this.#characters = Characters.getCharacters();
		this.#currentCharacterIndex = getItem("currentCharacterIndex") || 0;
		this.#characterIndex = this.#currentCharacterIndex;

		this.addText({ text: "Character Selection", spacing: 100, fontSize: 42 });
		this.addText({ id: "character", text: this.#characters[this.#currentCharacterIndex].name, spacing: 130, fontSize: 32 });
		this.addText({ id: "characterDescription", text: this.#characters[this.#currentCharacterIndex].description, spacing: 300, fontSize: 24 });
		this.addText({ id: "saveText", text: "[S] - Save Character", spacing: 150, fontSize: 24 });
		this.addText({ text: "[B] - Back", spacing: 75, fontSize: 24 });
		this.addAction({ char: LEFT_ARROW, callback: () => { this.#updateCharacterIndex(-1); } });
		this.addAction({ char: RIGHT_ARROW, callback: () => { this.#updateCharacterIndex(1); } });
		this.addAction({ id: "save", char: 'S', callback: () => { this.saveCharacter(); } });
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
		App.inst.switchPage("confirmation");
		Confirmation.inst.setConfirmationText("Are you sure you want to switch to " + this.#characters[this.#currentCharacterIndex].name + "?\n(this will reset your current game)");
		Confirmation.inst.setYesCallback(() => {
			storeItem("character", this.#characters[this.#currentCharacterIndex]);
			storeItem("currentCharacterIndex", this.#currentCharacterIndex);
			storeItem("currentRound", 0);
			App.inst.switchPage("mainMenu");
		});
		Confirmation.inst.setNoCallback(() => {
			App.inst.switchPage("characterSelection");
		});
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
		fill(red(character.color), green(character.color), blue(character.color), this.#currentCharacterUnlocked ? 255 : 100);
		circle(0, 0, 150);
	}
	#updateCharacterIndex(amount) {
		this.#currentCharacterIndex += amount;
		if (this.#currentCharacterIndex <= 0) this.#leftButton.hide();
		else this.#leftButton.show();
		if (this.#currentCharacterIndex >= this.#characters.length - 1) this.#rightButton.hide();
		else this.#rightButton.show();
		this.#currentCharacterIndex = constrain(this.#currentCharacterIndex, 0, this.#characters.length - 1);
		this.#updateTexts();
	}
	#updateTexts() {
		let active = this.#currentCharacterIndex == this.#characterIndex;
		this.#currentCharacterUnlocked = (getItem("maxRound") || 0) >= this.#characters[this.#currentCharacterIndex].roundUnlock;
		let characterEnabled = !active && this.#currentCharacterUnlocked;

		let characterText = this.#characters[this.#currentCharacterIndex].name + (active ? "\n[current character]" : "");
		let characterDescription = this.#currentCharacterUnlocked ?
			this.#characters[this.#currentCharacterIndex].description :
			"Unlock this character upon clearing round " + this.#characters[this.#currentCharacterIndex].roundUnlock + ".";
		let saveText = characterEnabled ? "[S] - Select Character" : "";
		this.setText({ id: "character", text: characterText });
		this.setText({ id: "characterDescription", text: characterDescription });
		this.setText({ id: "saveText", text: saveText });
		console.log("Active: " + active);
		console.log("unlocked: " + this.#currentCharacterUnlocked);
		console.log("Enabled: " + characterEnabled);
		this.setActionEnabled({ id: "save", enabled: characterEnabled });
	}
}