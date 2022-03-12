class Rounds {
//#region Static Getters
	static getRounds() {
		return [
			// 0
			{
				orbs: 3,
				hearts: 0,
				enemies: [
					{ enemyType: Enemies.RED, count: 10 },
				]
			},
			{
				orbs: 4,
				hearts: 0,
				enemies: [
					{ enemyType: Enemies.RED, count: 20 },
				]
			},
			{
				orbs: 3,
				hearts: 0,
				enemies: [
					{ enemyType: Enemies.RED, count: 5 },
					{ enemyType: Enemies.GREEN, count: 10 },
				]
			},
			{
				orbs: 5,
				hearts: 0,
				enemies: [
					{ enemyType: Enemies.RED, count: 15 },
					{ enemyType: Enemies.GREEN, count: 15 },
				]
			},
			{
				orbs: 2,
				hearts: 1,
				enemies: [
					{ enemyType: Enemies.GREEN, count: 30 },
				]
			},
			// 5
			{
				orbs: 10,
				hearts: 2,
				enemies: [
					{ enemyType: Enemies.RED, count: 30 },
					{ enemyType: Enemies.GREEN, count: 20 },
				]
			},
			{
				orbs: 3,
				hearts: 0,
				enemies: [
					{ enemyType: Enemies.RED, count: 20 },
					{ enemyType: Enemies.YELLOW, count: 7 },
				]
			},
			{
				orbs: 5,
				hearts: 0,
				enemies: [
					{ enemyType: Enemies.GREEN, count: 20 },
					{ enemyType: Enemies.YELLOW, count: 5 },
				]
			},
			{
				orbs: 2,
				hearts: 0,
				enemies: [
					{ enemyType: Enemies.YELLOW, count: 20 },
				]
			},
			{
				orbs: 5,
				hearts: 1,
				enemies: [
					{ enemyType: Enemies.RED, count: 20 },
					{ enemyType: Enemies.GREEN, count: 10 },
					{ enemyType: Enemies.YELLOW, count: 10 },
				]
			},
			// 10
			{
				orbs: 10,
				hearts: 2,
				enemies: [
					{ enemyType: Enemies.RED, count: 25 },
					{ enemyType: Enemies.GREEN, count: 10 },
					{ enemyType: Enemies.YELLOW, count: 20 },
				]
			},
			{
				orbs: 5,
				hearts: 0,
				enemies: [
					{ enemyType: Enemies.RED, count: 20 },
					{ enemyType: Enemies.GREEN, count: 20 },
					{ enemyType: Enemies.ORANGE, count: 10 },
				]
			},
			{
				orbs: 6,
				hearts: 0,
				enemies: [
					{ enemyType: Enemies.GREEN, count: 5 },
					{ enemyType: Enemies.YELLOW, count: 15 },
					{ enemyType: Enemies.ORANGE, count: 25 },
				]
			},
			{
				orbs: 3,
				hearts: 0,
				enemies: [
					{ enemyType: Enemies.ORANGE, count: 45 },
				]
			},
			{
				orbs: 7,
				hearts: 1,
				enemies: [
					{ enemyType: Enemies.RED, count: 40 },
					{ enemyType: Enemies.GREEN, count: 20 },
					{ enemyType: Enemies.ORANGE, count: 10 },
				]
			},
			// 15
			{
				orbs: 10,
				hearts: 2,
				enemies: [
					{ enemyType: Enemies.RED, count: 30 },
					{ enemyType: Enemies.YELLOW, count: 15 },
					{ enemyType: Enemies.ORANGE, count: 35 },
				]
			},
			{
				orbs: 4,
				hearts: 0,
				enemies: [
					{ enemyType: Enemies.YELLOW, count: 10 },
					{ enemyType: Enemies.PINK, count: 15 },
				]
			},
			{
				orbs: 2,
				hearts: 0,
				enemies: [
					{ enemyType: Enemies.PINK, count: 35 },
				]
			},
			{
				orbs: 6,
				hearts: 0,
				enemies: [
					{ enemyType: Enemies.RED, count: 35 },
					{ enemyType: Enemies.GREEN, count: 35 },
					{ enemyType: Enemies.PINK, count: 10 },
				]
			},
			{
				orbs: 5,
				hearts: 1,
				enemies: [
					{ enemyType: Enemies.RED, count: 35 },
					{ enemyType: Enemies.ORANGE, count: 35 },
					{ enemyType: Enemies.PINK, count: 10 },
				]
			},
			// 20
			{
				orbs: 10,
				hearts: 2,
				enemies: [
					{ enemyType: Enemies.YELLOW, count: 15 },
					{ enemyType: Enemies.ORANGE, count: 20 },
					{ enemyType: Enemies.PINK, count: 20 },
				]
			},
		];
	}
//#endregion
}