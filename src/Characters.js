class Characters {
	static getCharacterType(character) {
		console.log("Getting Character Type");
		switch (character) {
			case 'Lotus': return new Lotus();
			case 'Dandelion': return new Dandelion();
			case 'Tulip': return new Tulip();
			case 'Poppy': return new Poppy();
			case 'Rose': return new Rose();
			default: return null;
		}
	}
	static getCharacter(name) {
		let characters = this.getCharacters();
		for (let i = 0; i < characters.length; i++) {
			if (characters[i].name === name) return characters[i];
		}
	}
	static getCharacters() {
		console.log("Getting Characters");
		return [
			{
				name: 'Lotus',
				color: '#c9deff',
				size: 1,
				speed: 1,
				description: '[Passive] When entering a new area, a lotus will appear. Collect it to gain a life.',
				roundUnlock: 0,
			},
			{
				name: 'Dandelion',
				color: '#ffeb8a',
				size: 1,
				speed: 1,
				description: '[Ability] Click space to fade into the wind, and then back out. This ability can only be used once per level.',
				roundUnlock: 5,
			},
			{
				name: 'Tulip',
				color: '#ffc285',
				size: 1,
				speed: 1,
				description: '[Passive] Pushes enemies away within a radius',
				roundUnlock: 10,
			},
			{
				name: 'Poppy',
				color: '#ff8ff2',
				size: 1,
				speed: 1,
				description: '[Passive] Shrinks and slows enemies within a radius',
				roundUnlock: 15,
			},
			{
				name: 'Rose',
				color: '#ff4545',
				size: 1,
				speed: 1,
				description: '[Ability] Consume 3 orbs in exchange for one life. Can be used three times per level.',
				roundUnlock: 20,
			},
		]
	}
}