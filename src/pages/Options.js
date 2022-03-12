class Options extends Page {
	//#region Data
	static inst;
	//#endregion

	//#region Constructor
	constructor() {
		super();
		Options.inst = this;
	}
	//#endregion

	//#region Overrides
	startUp() {
		super.startUp();
		this.addText({ text: "Options", spacing: 100, fontSize: 48 });
		this.addText({ text: "[R] - Reset Data", spacing: 300, fontSize: 32 });
		this.addText({ id: "controls", text: "[T] - Toggle Controls [WASD]", spacing: 100, fontSize: 32 });
		this.addText({ text: "[B] - Back", spacing: 200, fontSize: 24 });
		this.addAction({ char: 'R', callback: () => this.#resetData() });
		this.addAction({ char: 'T', callback: () => this.#toggleMovement() });
		this.addAction({ char: 'B', callback: () => this.#back() });
		if (!App.inst.getKeyboardControls()) { this.setText({ id: "controls", text: "[T] - Toggle Controls [Mouse]", spacing: 100, fontSize: 32 }); }
	}
	//#endregion

//#region Private Methods
	#resetData() {
		App.inst.switchPage("confirmation");
		Confirmation.inst.setConfirmationText("Are you sure you want to reset your data?\n(this will delete all your progress)");
		Confirmation.inst.setYesCallback(() => {
			Confirmation.inst.setConfirmationText("Are you SURE???");
			Confirmation.inst.setYesCallback(() => {
				clearStorage();
				App.inst.switchPage("mainMenu");
			});
		});
		Confirmation.inst.setNoCallback(() => {
			App.inst.switchPage("options");
		});
	}
	#toggleMovement() {
		if (App.inst.getKeyboardControls()) {
			App.inst.setKeyboardControls(false);
			storeItem("keyboardControls", false);
			this.setText({ id: "controls", text: "[T] - Toggle Controls [Mouse]" });
		} else {
			App.inst.setKeyboardControls(true);
			storeItem("keyboardControls", true);
			this.setText({ id: "controls", text: "[T] - Toggle Controls [WASD]" });
		}
	}
	#back() {
		App.inst.switchPage("mainMenu")
	}
//#endregion
}