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
				return new Tulip();
			case this.POPPY:
				return null;
			case this.ROSE:
				return null;
			default:
				return null;
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
				description: '[Passive] When entering a new area, a lotus will appear. Collect it to gain a life. Upgrades may increase the number of lotuses that appear.',
				upgradeCosts: [10, 25, 50],
				roundUnlock: 0,
			},
			{
				characterType: this.DANDELION,
				name: 'Dandelion',
				color: '#ffeb8a',
				description: '[Ability] Temporarily become invincible with increased speed. Can only be used once per level. Upgrades may increase the duration & effectiveness of the ability.',
				upgradeCosts: [15, 35, 60],
				roundUnlock: 0,
			},
			{
				characterType: this.TULIP,
				name: 'Tulip',
				color: '#ffc285',
				description: '[Passive] Pushes enemies away within a radius. Upgrades may increase the radius and the amount of push.',
				upgradeCosts: [25, 40, 75],
				roundUnlock: 10,
			},
			{
				characterType: null,
				name: 'Poppy',
				color: '#ff8ff2',
				description: '[Passive] Shrinks and slows enemies within a radius. Upgrades may increase the radius and the amount of slow.',
				upgradeCosts: [35, 50, 80],
				roundUnlock: 15,
			},
			{
				characterType: null,
				name: 'Rose',
				color: '#ff4545',
				description: '[Ability] Consume 1 orb in exchange for 1 life. Can be used three times per level. Upgrades may increase the amount of orbs consumed.',
				upgradeCosts: [50, 60, 90],
				roundUnlock: 20,
			},
		]
	};
	//#endregion
}