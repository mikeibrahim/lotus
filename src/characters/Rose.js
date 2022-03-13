class Rose extends Character {
	//#region Data
	#pedalSize;
	#pedalSpeed;
	#pedalLifeTime;
	#invincibilityTime;
	#pedals;
	//#endregion

	//#region Constructor
	constructor() {
		let characterType = Characters.ROSE;
		let level = Characters.getCharacterLevel(characterType);
		let maxHealth = [1, 2, 3, 3][level];
		let size = [100, 90, 80, 70][level];
		let speed = [600, 700, 750, 800][level];
		super({ characterType: characterType, maxHealth: maxHealth, size: size, speed: speed });
		Player.inst = this;
		this.#pedalSize = [100, 160, 220, 280][level];
		this.#pedalSpeed = [800, 900, 1000, 1100][level];
		this.#pedalLifeTime = [2000, 3000, 3000, 4000][level];
		this.#invincibilityTime = [1500, 1750, 2000, 2250][level];
		this.#pedals = [];
	}
	//#endregion

	//#region Public Getters
	removePedal(petal) { this.#pedals.splice(this.#pedals.indexOf(petal), 1); }
	//#endregion

	//#region Callbacks
	update() {
		super.update();
		this.#pedals.forEach(petal => { petal.update(); });
	}
	nextRound() {
		super.nextRound();
		this.#destroyPedals();
	}
	activeAbility() {
		this.#createPedal();
	}
	//#endregion

	//#region Private Methods
	#createPedal() {
		if (GameUI.inst.getCurrentOrbs() == 0) return;
		this.#pedals.push(new Petal({
			size: this.#pedalSize,
			speed: this.#pedalSpeed,
			color: super.getColor(),
			lifeTime: this.#pedalLifeTime,
			invincibilityTime: this.#invincibilityTime,
		}));
		Game.inst.addOrb(new Orb());
	}
	#destroyPedals() {
		this.#pedals = [];
	}
	//#endregion
}

class Petal extends Interactable {
	//#region Data
	#lifeTime;
	#currentLifeTime;
	#invincibilityTime;
	#teleported;
	//#endregion

	//#region Constructor
	constructor({ size, speed, color, lifeTime, invincibilityTime }) {
		super({ targets: () => Game.inst.getEnemies().concat(Game.inst.getOrbs()), size: size, speed: speed, color: color });
		super.setPosition(Player.inst.getPosition());
		super.setVelocity(Player.inst.getVelocity().copy().normalize());
		this.#lifeTime = lifeTime;
		this.#currentLifeTime = lifeTime;
		this.#invincibilityTime = invincibilityTime;
		this.#teleported = false;
	}
	//#endregion

	//#region Callbacks
	update() {
		super.update();
		super.bounceOffWalls();
		this.#reduceLifeTime();
		if (this.#teleported) super.pulsate({ speed: 0.2, opacity: 0.8 });
	}
	onCollision(target) {
		if (target instanceof Enemy && !this.#teleported) {
			this.#setInvincibility();
			this.#teleportPlayer(target);
		} else if (target instanceof Orb) {
			target.destroy();
		}
	}
	//#endregion

	//#region Private Methods
	#reduceLifeTime() {
		this.#currentLifeTime -= deltaTime;
		if (this.#currentLifeTime <= 0) this.#destroy();
		super.setTargetSize(super.getSize() * (this.#currentLifeTime / this.#lifeTime) + 50);
	}
	#setInvincibility() {
		Player.inst.setInvincibility(this.#invincibilityTime);
	}
	#teleportPlayer(target) {
		this.#teleported = true;
		let position = target.getPosition();
		Player.inst.setPosition(position);
	}
	#destroy() {
		new ParticleSystem({
			count: 15,
			lifeTime: 500,
			color: color(red(super.getColor()), green(super.getColor()), blue(super.getColor()), 200),
			speed: 500,
			size: super.getSize(),
			position: super.getPosition()
		});
		Player.inst.removePedal(this);
	}
	//#endregion
}