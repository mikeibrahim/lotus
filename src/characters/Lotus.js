class Lotus extends Character {
//#region Data
	#characterType;
	#maxHealth;
	#speedMultiplier;
	#sizeMultiplier;
	#maxPickups;
	#lotusPickupSize;
	#lotusPickupHeal;
//#endregion

//#region Constructor
	constructor() {
		super();
		Character.inst = this;
		this.#characterType = Characters.LOTUS;
		this.#maxHealth = [1, 1, 2, 3];
		this.#speedMultiplier = [1, 1.2, 1.3, 1.4];
		this.#sizeMultiplier = [1, 1, 1, 1];
		this.#maxPickups = [1, 1, 2, 2];
		this.#lotusPickupSize = [75, 120, 120, 200];
		this.#lotusPickupHeal = [1, 1, 1, 1];
		this.lotusPickups = [];
	}
//#endregion

//#region Callbacks
	startUp() {
		let level = Characters.getCharacterLevel(this.#characterType);
		super.startUp({
			characterType: this.#characterType,
			maxHealth: this.#maxHealth[level],
			sizeMultiplier: this.#sizeMultiplier[level],
			speedMultiplier: this.#speedMultiplier[level],
		});
		this.#maxPickups = this.#maxPickups[level];
		this.#lotusPickupSize = this.#lotusPickupSize[level];
		this.#lotusPickupHeal = this.#lotusPickupHeal[level];
	}
	update() {
		super.update();
		this.#updateLotusPickups();
	}
	keyPressed() {
		super.keyPressed();
	}
	nextRound() {
		super.nextRound();
		this.#destroyLotusPickups();
		this.#createLotusPickups();
	}
	passiveAbility() {
		super.passiveAbility();
	}
	activeAbility() {
		super.activeAbility();
	}
	takeDown() {
		super.takeDown();
	}
//#endregion

//#region Private Methods
	#updateLotusPickups() {
		this.lotusPickups.forEach(lotusPickup => { lotusPickup.update(); });
	}
	#destroyLotusPickups() {
		this.lotusPickups = [];
	}
	#createLotusPickups() {
		for (let i = 0; i < this.#maxPickups; i++) {
			this.lotusPickups.push(new LotusPickup({
				size: this.#lotusPickupSize,
				heal: this.#lotusPickupHeal,
				position: Environment.inst.getRandomPosition(this.#lotusPickupSize),
				color: super.getPlayerColor(),
			}));
		}
	}
//#endregion
}

class LotusPickup extends Interactable {
//#region Data
	#size;
	#heal;
	#position;
	#color;
//#endregion

//#region Constructor
	constructor({ size, heal, position, color }) {
		super({ size: size, position: position });
		this.#size = size;
		this.#heal = heal;
		this.#position = position;
		this.#color = color;
	}
//#endregion

//#region Public Methods
	update() {
		super.update();
		this.#render();
	}
	interact() {
		Player.inst.heal(this.#heal);
		this.#destroy();
	}
//#endregion

//#region Private Methods
	#render() {
		fill(this.#color);
		stroke(0);
		strokeWeight(0);
		circle(this.#position.x, this.#position.y, this.#size);
	}
	#destroy() {
		new ParticleSystem({
			count: 8,
			lifeTime: 3000,
			color: color(red(this.#color), green(this.#color), blue(this.#color), 200),
			speed: 400,
			size: this.#size,
			position: this.#position
		});
		Character.inst.lotusPickups.splice(Character.inst.lotusPickups.indexOf(this), 1);
	}
//#endregion
}