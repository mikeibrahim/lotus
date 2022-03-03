class Rounds {
	static getRounds() {
		return [
			{
				orbs: 1,
				enemies: [
					{ type: 'r', count: 10 },
					{ type: 'y', count: 10 },
				]
			},
			{
				orbs: 1,
				enemies: [
					{ type: 'r', count: 20 },
					{ type: 'g', count: 20 },
				]
			},
			{
				orbs: 1,
				enemies: [
					{ type: 'r', count: 10 },
					{ type: 'g', count: 30 },
				]
			},
			{
				orbs: 1,
				enemies: [
					{ type: 'g', count: 30 },
				]
			},
			{
				orbs: 1,
				enemies: [
					{ type: 'r', count: 50 },
				]
			},
		];
	}
}