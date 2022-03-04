class CharacterSelection extends Page {
//#region Data
	#characters;
	#characterIndex;
	#currentCharacterIndex;
	#currentCharacterUnlocked;
//#endregion

//#region Constructor
	constructor() {
		super();
		this.#characters = [];
		this.#characterIndex = 0;
		this.#currentCharacterIndex = 0;
		this.#currentCharacterIndex = true;
	}
//#endregion

//#region Overrides
	startUp() {
		super.startUp();
		this.#characters = Characters.getCharacters();
		this.#currentCharacterIndex = getItem("currentCharacterIndex") || 0;
		this.#characterIndex = this.#currentCharacterIndex;

		this.addText({ text: "Character Selection", spacing: 100, fontSize: 42 });
		this.addText({ id: "character", text: this.#characters[this.#currentCharacterIndex].name, spacing: 150, fontSize: 32 });
		this.addText({ id: "arrows", text: "<            >", spacing: 150, fontSize: 32 });
		this.addText({ id: "characterDescription", text: this.#characters[this.#currentCharacterIndex].description, spacing: 150, fontSize: 24 });
		this.addText({ id: "saveText", text: "[S] - Save Character", spacing: 150, fontSize: 24 });
		this.addText({ text: "[B] - Back", spacing: 50, fontSize: 24 });
		this.addAction({ char: LEFT_ARROW, callback: () => { this.#updateCharacterIndex(-1); } });
		this.addAction({ char: RIGHT_ARROW, callback: () => { this.#updateCharacterIndex(1); } });
		this.addAction({ id: "save", char: 'S', callback: () => { this.saveCharacter(); } });
		this.addAction({ char: 'B', callback: () => { this.back(); } });
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
	}
//#endregion

//#region Public Methods
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
//#endregion

//#region Private Methods
	#renderCharacters() {

		let character = this.#characters[this.#currentCharacterIndex];
		fill(red(character.color), green(character.color), blue(character.color), this.#currentCharacterUnlocked ? 255 : 100);
		ellipseMode(CENTER);
		ellipse(-5, 0, 150,150);
	}
	#updateCharacterIndex(amount) {
		this.#currentCharacterIndex += amount;
		this.#currentCharacterIndex = constrain(this.#currentCharacterIndex, 0, this.#characters.length - 1);
		if (this.#currentCharacterIndex == 0) this.setText({ id: "arrows", text: "             >" });
		else if (this.#currentCharacterIndex == this.#characters.length - 1) this.setText({ id: "arrows", text: "<             " });
		else this.setText({ id: "arrows", text: "<            >" });
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
		this.setActionEnabled({ id: "save", enabled: characterEnabled });
	}
//#endregion
}