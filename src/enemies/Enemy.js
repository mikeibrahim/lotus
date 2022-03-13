class Enemy extends Interactable {
	//#region Data
	#damage;
	//#endregion

	//#region Constructor
	constructor({ damage, size, speed, color }) {
		super({ targets: () => [Player.inst], size: size, speed: Difficulty.inst.enemySpeedScale(speed), color: color });
		this.#damage = damage;
	}
	//#endregion

	//#region Callbacks
	update() {
		super.update();
		super.bounceOffWalls();
	}
	//#endregion

	//#region Overrides
	onCollision(target) {
		target.takeDamage(this.#damage);
	}
	//#endregion

	//#region Private Methods
	//#endregion
}