class Lotus extends Character {
	//#region Data
	#maxPickups;
	#lotusPickupSize;
	#lotusPickupHeal;
	//#endregion

	//#region Constructor
	constructor() {
		let characterType = Characters.LOTUS;
		let level = Characters.getCharacterLevel(characterType);
		let maxHealth = [1, 1, 2, 2][level];
		let speed = [500, 550, 600, 650][level];
		let size = [100, 100, 120, 120][level];
		super({ characterType: characterType, maxHealth: maxHealth, size: size, speed: speed });
		Player.inst = this;
		this.#maxPickups = [1, 1, 2, 2][level];
		this.#lotusPickupSize = [75, 120, 120, 200][level];
		this.#lotusPickupHeal = [1, 1, 1, 1][level];
		this.lotusPickups = [];
	}
	//#endregion

	//#region Callbacks
	update() {
		super.update();
		this.#updateLotusPickups();
	}
	nextRound() {
		super.nextRound();
		this.#destroyLotusPickups();
		this.#createLotusPickups();
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
				color: super.getColor(),
				heal: this.#lotusPickupHeal,
			}));
		}
	}
	//#endregion
}

class LotusPickup extends Interactable {
	//#region Data
	#heal;
	//#endregion

	//#region Constructor
	constructor({ size, color, heal }) {
		super({ targets: () => [Player.inst], size: size, speed: 0, color: color });
		this.#heal = heal;
	}
	//#endregion

	//#region Public Methods
	update() {
		super.update();
		super.pulsate({speed: 0.2, opacity: 0.8});
	}
	onCollision(target) {
		target.heal(this.#heal);
		this.#destroy();
	}
	//#endregion

	//#region Private Methods
	#destroy() {
		new ParticleSystem({
			count: 8,
			lifeTime: 3000,
			color: color(red(super.getColor()), green(super.getColor()), blue(super.getColor()), 200),
			speed: 400,
			size: super.getSize(),
			position: super.getPosition()
		});
		Player.inst.lotusPickups.splice(Player.inst.lotusPickups.indexOf(this), 1);
	}
	//#endregion
}