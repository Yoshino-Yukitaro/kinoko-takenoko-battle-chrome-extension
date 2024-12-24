import { useState } from "react";
import ScoreBoard from "./ScoreBoard";

const useScoreBoard = () => {
	const [kinokoScore, setKinokoScore] = useState(0);
	const [goalKinokoIds, setGoalKinokoIds] = useState<number[]>([]);
	const [takenokoScore, setTakenokoScore] = useState(0);
	const [goalTakenokoIds, setGoalTakenokoIds] = useState<number[]>([]);

	const takenokoGoal = (takenokoRocketId: number) => {
		if (goalTakenokoIds.includes(takenokoRocketId)) return;

		setTakenokoScore(takenokoScore + 1);
		setGoalTakenokoIds([...goalTakenokoIds, takenokoRocketId]);
	};

	const kinokoGoal = (kinokoRocketId: number) => {
		if (goalKinokoIds.includes(kinokoRocketId)) return;

		setKinokoScore(kinokoScore + 1);
		setGoalKinokoIds([...goalKinokoIds, kinokoRocketId]);
	};

	const resetScore = () => {
		setKinokoScore(0);
		setTakenokoScore(0);
		setGoalKinokoIds([]);
		setGoalTakenokoIds([]);
	};

	const RenderScoreBoard = () => {
		return (
			<ScoreBoard takenokoScore={takenokoScore} kinokoScore={kinokoScore} />
		);
	};

	return {
		takenokoGoal,
		kinokoGoal,
		RenderScoreBoard,
		kinokoScore,
		takenokoScore,
		resetScore,
	};
};

export default useScoreBoard;
