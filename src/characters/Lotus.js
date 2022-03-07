class Lotus extends Character {
//#region Data
	#maxPickups;
	#lotusPickupSize;
//#endregion

//#region Constructor
	constructor() {
		super();
		Character.inst = this;
		this.#maxPickups = 1;
		this.#lotusPickupSize = 75;
		this.lotusPickups = [];
	}
//#endregion

//#region Callbacks
	startUp() {
		super.startUp(Characters.LOTUS);
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
	#position;
	#color;
//#endregion

//#region Constructor
	constructor({ size, position, color }) {
		super({ size: size, position: position });
		this.#size = size;
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
		Player.inst.heal(1);
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