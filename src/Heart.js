class Heart extends Interactable {
	//#region Data
		#color;
		#size;
		#position;
		#heal;
	//#endregion
	
	//#region Constructor
		constructor({ size, position }) {
			super({ size: size, position: position });
			this.#size = size;
			this.#position = position;
			this.#color = color(230, 50, 50);
			this.#heal = 1;
		}
	//#endregion
	
	//#region Public Methods
		update() {
			super.update();
			this.#render();
		}
		interact() {
			super.interact();
			this.destroy();
		}
		destroy() {
			new ParticleSystem({
				count: 15,
				lifeTime: 1000,
				color: color(red(this.#color), green(this.#color), blue(this.#color), 200),
				speed: 200,
				size: this.#size,
				position: this.#position
			});
			Game.inst.hearts.splice(Game.inst.hearts.indexOf(this), 1);
			Player.inst.heal(this.#heal);
		}
	//#endregion
	
	//#region Private Methods
		#render() {
			fill(this.#color);
			stroke(0);
			strokeWeight(0);
			circle(this.#position.x, this.#position.y, this.#size);
		}
	//#endregion
	}