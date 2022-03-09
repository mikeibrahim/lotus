class Characters {
	static LOTUS = 0;
	static DANDELION = 1;
	static TULIP = 2;
	static POPPY = 3;
	static ROSE = 4;

	//#region Static Getters
	static getCharacterObject(characterType) {
		switch (characterType) {
			case this.LOTUS:
				return new Lotus();
			case this.DANDELION:
				return new Dandelion();
			case this.TULIP:
				return new null;
			case this.POPPY:
				return new null;
			case this.ROSE:
				return new null;
			default:
				return new null;
		}
	}
	static getCharacterLevel(characterType) {
		let characterLevels = getItem('characterLevels') || {};
		return characterLevels[characterType] || 0;
	}
	static setCharacterLevel(characterType, level) {
		let characterLevels = getItem('characterLevels') || {};
		characterLevels[characterType] = level;
		storeItem('characterLevels', characterLevels);
	}
	static getCharacters() {
		return [
			{
				characterType: this.LOTUS,
				name: 'Lotus',
				color: '#c9deff',
				size: 1,
				speed: 1,
				description: '[Passive] When entering a new area, a lotus will appear. Collect it to gain a life.',
				upgradeCosts: [10, 20, 50],
				roundUnlock: 0,
			},
			{
				characterType: this.DANDELION,
				name: 'Dandelion',
				color: '#ffeb8a',
				size: 0.9,
				speed: 1,
				description: '[Ability] Click space to fade into the wind, and then back out. This ability can only be used once per level.',
				upgradeCosts: [20, 30, 60],
				roundUnlock: 0,
			},
			{
				characterType: this.TULIP,
				name: 'Tulip',
				color: '#ffc285',
				size: 1,
				speed: 1,
				description: '[Passive] Pushes enemies away within a radius',
				upgradeCosts: [30, 40, 70],
				roundUnlock: 10,
			},
			{
				characterType: null,
				name: 'Poppy',
				color: '#ff8ff2',
				size: 1,
				speed: 1,
				description: '[Passive] Shrinks and slows enemies within a radius',
				upgradeCosts: [40, 50, 80],
				roundUnlock: 15,
			},
			{
				characterType: null,
				name: 'Rose',
				color: '#ff4545',
				size: 1,
				speed: 1,
				description: '[Ability] Consume 1 orb in exchange for 1 life. Can be used three times per level.',
				upgradeCosts: [50, 60, 90],
				roundUnlock: 20,
			},
		]
	};
	//#endregion
}