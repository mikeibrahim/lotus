class Rounds {
	static getRounds() {
		return [
			// 0
			{
				orbs: 3,
				hearts: 0,
				enemies: [
					{ type: 'r', count: 10 },
				]
			},
			{
				orbs: 4,
				hearts: 0,
				enemies: [
					{ type: 'r', count: 20 },
				]
			},
			{
				orbs: 3,
				hearts: 0,
				enemies: [
					{ type: 'r', count: 5 },
					{ type: 'g', count: 10 },
				]
			},
			{
				orbs: 5,
				hearts: 0,
				enemies: [
					{ type: 'r', count: 15 },
					{ type: 'g', count: 15 },
				]
			},
			{
				orbs: 2,
				hearts: 1,
				enemies: [
					{ type: 'g', count: 30 },
				]
			},
			// 5
			{
				orbs: 10,
				hearts: 2,
				enemies: [
					{ type: 'r', count: 30 },
					{ type: 'g', count: 20 },
				]
			},
			{
				orbs: 3,
				hearts: 0,
				enemies: [
					{ type: 'r', count: 20 },
					{ type: 'y', count: 7 },
				]
			},
			{
				orbs: 5,
				hearts: 0,
				enemies: [
					{ type: 'g', count: 20 },
					{ type: 'y', count: 5 },
				]
			},
			{
				orbs: 2,
				hearts: 0,
				enemies: [
					{ type: 'y', count: 20 },
				]
			},
			{
				orbs: 5,
				hearts: 1,
				enemies: [
					{ type: 'r', count: 20 },
					{ type: 'g', count: 10 },
					{ type: 'y', count: 10 },
				]
			},
			// 10
			{
				orbs: 10,
				hearts: 2,
				enemies: [
					{ type: 'r', count: 25 },
					{ type: 'g', count: 10 },
					{ type: 'y', count: 20 },
				]
			},
		];
	}
}