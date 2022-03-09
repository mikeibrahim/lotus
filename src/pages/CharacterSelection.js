class CharacterSelection extends Page {
//#region Data
	#characters;
	#maxRound;
	#characterIndex;
	#currentCharacterIndex;
	#currentCharacterUnlocked;
	#currentCharacterLevel;
	#currentOrbs;
//#endregion

//#region Constructor
	constructor() {
		super();
		this.#characters = [];
		this.#maxRound = 0;
		this.#characterIndex = 0;
		this.#currentCharacterIndex = 0;
		this.#currentCharacterUnlocked = true;
		this.#currentCharacterLevel = 0;
		this.#currentOrbs = 0;
	}
//#endregion

//#region Overrides
	startUp() {
		super.startUp();
		this.#characters = Characters.getCharacters();
		this.#maxRound = getItem("maxRound") || 0;
		this.#currentCharacterIndex = getItem("currentCharacterIndex") || 0;
		this.#characterIndex = this.#currentCharacterIndex;
		this.#currentCharacterLevel = Characters.getCharacterLevel(this.#characters[this.#currentCharacterIndex].characterType);
		this.#currentOrbs = getItem("currentOrbs") || 0;
		// Texts
		this.addText({ text: "Character Selection", spacing: 100, fontSize: 42 });
		this.addText({ id: "character", text: this.#characters[this.#currentCharacterIndex].name, spacing: 125, fontSize: 32 });
		this.addText({ id: "arrows", text: "<            >", spacing: 175, fontSize: 32 });
		this.addText({ id: "characterDescription", text: this.#characters[this.#currentCharacterIndex].description, spacing: 125, fontSize: 24 });
		this.addText({ id: "saveText", text: "[S] - Save Character", spacing: 120, fontSize: 24 });
		this.addText({ id: "upgradeText", text: "[U] - Upgrade Character", spacing: 50, fontSize: 24 });
		this.addText({ text: "[B] - Back", spacing: 50, fontSize: 24 });
		// Actions
		this.addAction({ char: LEFT_ARROW, callback: () => { this.#focusCharacter(-1); } });
		this.addAction({ char: RIGHT_ARROW, callback: () => { this.#focusCharacter(1); } });
		this.addAction({ id: "upgrade", char: 'U', callback: () => { this.#upgradeCharacter(); } });
		this.addAction({ id: "save", char: 'S', callback: () => { this.#saveCharacter(); } });
		this.addAction({ char: 'B', callback: () => { this.#back(); } });
		this.#focusCharacter(0);
	}
	update() {
		super.update();
		this.#renderOrbs();
		this.#renderCharacterUpgradeCost();
		this.#renderCharacterLevels();
		this.#renderCharacters();
	}
	keyPressed() {
		super.keyPressed();
	}
	takeDown() {
		super.takeDown();
	}
//#endregion

//#region Private Methods
	#saveCharacter() {
		this.takeDown();
		App.inst.switchPage("confirmation");
		Confirmation.inst.setConfirmationText("Are you sure you want to switch to " + this.#characters[this.#currentCharacterIndex].name + "?\n(this will reset your current game)");
		Confirmation.inst.setYesCallback(() => {
			storeItem("characterType", this.#characters[this.#currentCharacterIndex].characterType);
			storeItem("currentCharacterIndex", this.#currentCharacterIndex);
			storeItem("currentRound", 0);
			App.inst.switchPage("mainMenu");
		});
		Confirmation.inst.setNoCallback(() => {
			App.inst.switchPage("characterSelection");
		});
	}
	#back() {
		this.takeDown();
		App.inst.switchPage("mainMenu");
	}
	#renderCharacters() {
		let character = this.#characters[this.#currentCharacterIndex];
		fill(red(character.color), green(character.color), blue(character.color), this.#currentCharacterUnlocked ? 255 : 100);
		ellipseMode(CENTER);
		ellipse(-5, 0, 150,150);
	}
	#renderOrbs() {
		text("Orbs: " + this.#currentOrbs, -width/2 + 100, 0);
	}
	#upgradeCharacter() {
		this.#currentOrbs -= this.#characters[this.#currentCharacterIndex].upgradeCosts[this.#currentCharacterLevel];
		storeItem("currentOrbs", this.#currentOrbs);
		Characters.setCharacterLevel(this.#characters[this.#currentCharacterIndex].characterType, this.#currentCharacterLevel + 1);
		this.#currentCharacterLevel = Characters.getCharacterLevel(this.#characters[this.#currentCharacterIndex].characterType);
		this.#updateCharacterAttributes();
	}
	#focusCharacter(direction) {
		this.#currentCharacterIndex = constrain(this.#currentCharacterIndex + direction, 0, this.#characters.length - 1);
		this.#updateArrows();
		this.#updateCharacterAttributes();
	}
	#updateArrows() {
		if (this.#currentCharacterIndex == 0) this.setText({ id: "arrows", text: "             >" });
		else if (this.#currentCharacterIndex == this.#characters.length - 1) this.setText({ id: "arrows", text: "<             " });
		else this.setText({ id: "arrows", text: "<            >" });
	}
	#updateCharacterAttributes() {
		let active = this.#currentCharacterIndex == this.#characterIndex;
		this.#currentCharacterUnlocked = this.#maxRound >= this.#characters[this.#currentCharacterIndex].roundUnlock;
		this.#currentCharacterLevel = Characters.getCharacterLevel(this.#characters[this.#currentCharacterIndex].characterType);
		let canAffordUpgrade = this.#currentOrbs >= this.#characters[this.#currentCharacterIndex].upgradeCosts[this.#currentCharacterLevel];

		let characterText = this.#characters[this.#currentCharacterIndex].name + (active ? "\n[current character]" : "");
		let characterDescription = this.#currentCharacterUnlocked ?
			this.#characters[this.#currentCharacterIndex].description :
			"Unlock this character upon clearing round " + this.#characters[this.#currentCharacterIndex].roundUnlock + ".";
		
		this.setText({ id: "character", text: characterText });
		this.setText({ id: "characterDescription", text: characterDescription });
		this.setTextEnabled({ id: "saveText", enabled: !active && this.#currentCharacterUnlocked });
		this.setActionEnabled({ id: "save", enabled: !active && this.#currentCharacterUnlocked });
		this.setTextEnabled({ id: "upgradeText", enabled: this.#currentCharacterUnlocked && canAffordUpgrade });
		this.setActionEnabled({ id: "upgrade", enabled: this.#currentCharacterUnlocked && canAffordUpgrade });
	}
	#renderCharacterUpgradeCost() {
		if (!this.#currentCharacterUnlocked) return;
		let cost = this.#characters[this.#currentCharacterIndex].upgradeCosts[this.#currentCharacterLevel];
		let maxLevel = this.#currentCharacterLevel >= this.#characters[this.#currentCharacterIndex].upgradeCosts.length ;
		let upgradeText = maxLevel ? "Max Level" : "Upgrade cost: " + cost;
		text(upgradeText, 250, -50);
	}
	#renderCharacterLevels() {
		if (!this.#currentCharacterUnlocked) return;
		let character = this.#characters[this.#currentCharacterIndex];
		for (let i = 0; i < character.upgradeCosts.length; i++) {
			let color = i < this.#currentCharacterLevel ? "#FFFF00" : "#000000";
			fill(red(color), green(color), blue(color));
			circle(200 + i * 50, 0, 20);
		}
	}
//#endregion
}