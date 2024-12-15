class GameManager {
	private static instance: GameManager;
	private takenokoPoints: number;
	private kinokoPoints: number;
	private goalTakenokoIds: number[];
	private goalKinokoIds: number[];
	private constructor() {
		this.takenokoPoints = 0;
		this.kinokoPoints = 0;
		this.goalTakenokoIds = [];
		this.goalKinokoIds = [];
	}

	public static getInstance(): GameManager {
		if (!GameManager.instance) {
			GameManager.instance = new GameManager();
		}
		return GameManager.instance;
	}

	get takenokoPoint(): number {
		return this.takenokoPoints;
	}
	get kinokoPoint(): number {
		return this.kinokoPoints;
	}

	public takenokoGoal(takenokoRocketId: number): void {
		if (this.goalTakenokoIds.includes(takenokoRocketId)) {
			return;
		}
		this.goalTakenokoIds.push(takenokoRocketId);
		this.takenokoPoints++;
	}
	public kinokoGoal(kinokoRocketId: number): void {
		if (this.goalKinokoIds.includes(kinokoRocketId)) {
			return;
		}
		this.goalKinokoIds.push(kinokoRocketId);
		this.kinokoPoints++;
	}

	public gameJudge(): "takenoko" | "kinoko" | "draw" {
		if (this.takenokoPoints > this.kinokoPoints) {
			return "takenoko";
		}
		if (this.takenokoPoints < this.kinokoPoints) {
			return "kinoko";
		}
		return "draw";
	}
}

export default GameManager;
