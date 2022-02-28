class Characters {
	static getCharacterType(character) {
		switch (character) {
			case 'Lotus':
				return new Lotus();
			case 'Dandelion':
				return new Dandelion();
			case 'Tulip':
				return new Tulip();
			case 'Poppy':
				return new Poppy();
			case 'Rose':
				return new Rose();
			default:
				return null;
		}
	}
	static getCharacters() {
		return [
			{
				name: 'Lotus',
				color: '#c9deff',
				description: '[Passive] When entering a new area, a lotus will appear. Collect it to gain a life.',
			},
			{
				name: 'Dandelion',
				color: '#ffeb8a',
				description: '[Ability] Click space to fade into the wind, and then back out. This ability can only be used once per level.',
			},
			{
				name: 'Tulip',
				color: '#ffc285',
				description: '[Passive] Pushes enemies away within a radius',
			},
			{
				name: 'Poppy',
				color: '#ff8ff2',
				description: '[Passive] Shrinks and slows enemies within a radius',
			},
			{
				name: 'Rose',
				color: '#ff4545',
				description: '[Ability] Consume 3 orbs in exchange for one life.',
			},
		]
	}
}