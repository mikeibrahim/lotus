class Characters {
	//#region Data
	static LOTUS = 0;
	static DANDELION = 1;
	static TULIP = 2;
	static POPPY = 3;
	static ROSE = 4;
	//#endregion

	//#region Static Getters
	static getCharacterObject(characterType) {
		switch (characterType) {
			case Characters.LOTUS:
				return new Lotus();
			case Characters.DANDELION:
				return new Dandelion();
			case Characters.TULIP:
				return new Tulip();
			case Characters.POPPY:
				return new Poppy();
			case Characters.ROSE:
				return new Rose();
			default:
				console.error('Character type not found');
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
				characterType: Characters.LOTUS,
				name: 'Lotus',
				color: color('#c9deff'),
				description: '[Passive] When entering a new area, a lotus will appear. Collect it to gain a life. Upgrades increase size & number of lotuses that appear.',
				upgradeCosts: [10, 25, 50],
				roundUnlock: 0,
			},
			{
				characterType: Characters.DANDELION,
				name: 'Dandelion',
				color: color('#ffeb8a'),
				description: '[Ability] Temporarily become invincible with increased speed. Can only be used once per level. Upgrades increase duration & effectiveness.',
				upgradeCosts: [15, 35, 60],
				roundUnlock: 5,
			},
			{
				characterType: Characters.TULIP,
				name: 'Tulip',
				color: color('#ffc285'),
				description: '[Passive] Pushes enemies away within a radius. Upgrades increase radius & amount of push.',
				upgradeCosts: [25, 40, 75],
				roundUnlock: 10,
			},
			{
				characterType: Characters.POPPY,
				name: 'Poppy',
				color: color('#ff8ff2'),
				description: '[Passive] Shrinks & slows enemies within a radius. Upgrades increase radius & amount of slow.',
				upgradeCosts: [35, 50, 80],
				roundUnlock: 15,
			},
			{
				characterType: Characters.ROSE,
				name: 'Rose',
				color: color('#ff4545'),
				description: '[Ability] Launch a petal to collect orbs and teleport to enemies. Consumes one orb. Upgrades increase duration & effectiveness.',
				upgradeCosts: [50, 60, 90],
				roundUnlock: 20,
			},
		]
	};
	//#endregion
}