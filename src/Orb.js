class Orb extends Interactable {
	//#region Constructor
	constructor() {
		super({ targets: () => [Player.inst], size: 50, speed: 0, color: color(50, 50, 230) });
	}
	//#endregion

	//#region Public Methods
	update() {
		super.update();
		super.pulsate({ speed: 0.2, opacity: 0.8 });
	}
	onCollision(target) {
		this.destroy();
	}
	destroy() {
		new ParticleSystem({
			count: 15,
			lifeTime: 500,
			color: color(red(super.getColor()), green(super.getColor()), blue(super.getColor()), 200),
			speed: 300,
			size: super.getSize(),
			position: super.getPosition()
		});
		Game.inst.removeOrb(this);
		GameUI.inst.addCurrentOrbs(1);
	}
	//#endregion
}