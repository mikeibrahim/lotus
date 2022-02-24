class Rounds {
	static getRounds() {
		return [
			{
				orbs: 3,
				enemies: [
					{ type: 'r', count: 10 },
				]
			},
			{
				orbs: 3,
				enemies: [
					{ type: 'r', count: 20 },
					{ type: 'g', count: 20 },
				]
			},
			{
				orbs: 5,
				enemies: [
					{ type: 'r', count: 10 },
					{ type: 'g', count: 30 },
				]
			},
		];
	}
}