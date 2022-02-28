class Lotus extends Character {
	// Data
	#playerSize;
	#playerSpeed;
	#playerColor;
	#maxPickups;
	#lotusPickupSize;

	// Constructor
	constructor() {
		super();
		Character.inst = this;
		this.#playerSize = 0;
		this.#playerSpeed = 0;
		this.#playerColor = color(0, 0, 0);
		this.#maxPickups = 1;
		this.#lotusPickupSize = 75;
		this.lotusPickups = [];
	}

	// Callbacks
	startUp() {
		super.startUp();
		this.#playerSize = 1;
		this.#playerSpeed = 1;
		this.#playerColor = '#c9deff';
		this.#setPlayerAttributes();
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

	// Private Methods
	#setPlayerAttributes() {
		Player.inst.setSpeedMultiplier(this.#playerSpeed);
		Player.inst.setSizeMultiplier(this.#playerSize);
		Player.inst.setColor(this.#playerColor);
	}
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
				color: this.#playerColor
			}));
		}
	}
}

class LotusPickup extends Interactable {
	// Data
	#size;
	#position;
	#color;

	// Constructor
	constructor({ size, position, color }) {
		super({ size: size, position: position });
		this.#size = size;
		this.#position = position;
		this.#color = color;
	}

	// Public Methods
	update() {
		super.update();
		this.#render();
	}
	interact() {
		Player.inst.heal(1);
		this.#destroy();
	}

	// Private Methods
	#render() {
		fill(this.#color);
		stroke(0);
		strokeWeight(0);
		circle(this.#position.x, this.#position.y, this.#size);
	}
	#destroy() {
		new ParticleSystem({
			count: 3,
			lifeTime: 1000,
			color: color(red(this.#color), green(this.#color), blue(this.#color), 200),
			speed: 100,
			size: this.#size,
			position: this.#position
		});
		Character.inst.lotusPickups.splice(Character.inst.lotusPickups.indexOf(this), 1);
	}
}