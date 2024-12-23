import { useState } from "react";
import type { KeyboardEvent } from "react";
import useTakenokoBazooka from "./useTakenokoBazooka";
import useKinokoBazooka from "./useKinokoBazooka";
import useScoreBoard from "./useScoreBoard";

const BattleField = () => {
	const [active, setActive] = useState(true);
	const [takenokoBazookaSpeed, setTakenokoBazookaSpeed] = useState(10);
	const [kinokoBazookaSpeed, setKinokoBazookaSpeed] = useState(10);
	const [takenokoRocketsRocketVector, setTakenokoRocketsRocketVector] =
		useState<"up" | "down" | "unset">("unset");
	const [kinokoRocketsRocketVector, setKinokoRocketsRocketVector] = useState<
		"up" | "down" | "unset"
	>("unset");
	const {
		RenderTakenokoBazooka,
		RenderTakenokoRockets,
		launchTakenokoRockets,
		moveTakenokoCursorYAxis,
	} = useTakenokoBazooka();
	const {
		RenderKinokoBazooka,
		RenderKinokoRockets,
		launchKinokoRockets,
		moveKinokoCursorYAxis,
	} = useKinokoBazooka();
	const { takenokoGoal, kinokoGoal, RenderScoreBoard } = useScoreBoard();

	const keyDownHandler = (e: KeyboardEvent<HTMLDivElement>) => {
		// 動いている場合は動作続行
		if (takenokoRocketsRocketVector === "up") {
			setTakenokoBazookaSpeed(takenokoBazookaSpeed + 1);
			moveTakenokoCursorYAxis("up", takenokoBazookaSpeed);
		}
		if (takenokoRocketsRocketVector === "down") {
			setTakenokoBazookaSpeed(takenokoBazookaSpeed + 1);
			moveTakenokoCursorYAxis("down", takenokoBazookaSpeed);
		}
		if (kinokoRocketsRocketVector === "up") {
			setKinokoBazookaSpeed(kinokoBazookaSpeed + 1);
			moveKinokoCursorYAxis("up", kinokoBazookaSpeed);
		}
		if (kinokoRocketsRocketVector === "down") {
			setKinokoBazookaSpeed(kinokoBazookaSpeed + 1);
			moveKinokoCursorYAxis("down", kinokoBazookaSpeed);
		}

		if (!active) return;
		if (e.key === "Tab") {
			e.preventDefault();
		}

		// たけのこの操作
		if (e.key === "ArrowUp") {
			e.preventDefault();
			moveTakenokoCursorYAxis("up", takenokoBazookaSpeed);
			setTakenokoBazookaSpeed(takenokoBazookaSpeed + 1);
			setTakenokoRocketsRocketVector("up");
			return;
		}
		if (e.key === "ArrowDown") {
			e.preventDefault();
			moveTakenokoCursorYAxis("down", takenokoBazookaSpeed);
			setTakenokoBazookaSpeed(takenokoBazookaSpeed + 1);
			setTakenokoRocketsRocketVector("down");
			return;
		}
		if (e.key === "ArrowLeft") {
			e.preventDefault();
			launchTakenokoRockets();
			return;
		}

		// きのこの操作
		if (e.key === "w") {
			e.preventDefault();
			moveKinokoCursorYAxis("up", kinokoBazookaSpeed);
			setKinokoBazookaSpeed(kinokoBazookaSpeed + 1);
			setKinokoRocketsRocketVector("up");
			return;
		}
		if (e.key === "s") {
			e.preventDefault();
			moveKinokoCursorYAxis("down", kinokoBazookaSpeed);
			setKinokoBazookaSpeed(kinokoBazookaSpeed + 1);
			setKinokoRocketsRocketVector("down");
			return;
		}
		if (e.key === "d") {
			e.preventDefault();
			launchKinokoRockets();
			return;
		}
	};

	const keyUpHandler = (e: KeyboardEvent<HTMLDivElement>) => {
		if (e.key === "ArrowUp" || e.key === "ArrowDown") {
			setTakenokoBazookaSpeed(10);
			setTakenokoRocketsRocketVector("unset");
		}
		if (e.key === "w" || e.key === "s") {
			setKinokoBazookaSpeed(10);
			setKinokoRocketsRocketVector("unset");
		}
	};

	return (
		<div
			style={{
				position: "absolute",
				width: "100vw",
				height: "100vh",
				top: 0,
				left: 0,
				backgroundColor: "rgba(0, 0, 0, 0.3)",
			}}
			onKeyDown={keyDownHandler}
			onKeyUp={keyUpHandler}
			tabIndex={1}
		>
			<RenderScoreBoard />
			<RenderTakenokoBazooka />
			<RenderTakenokoRockets takenokoGoal={takenokoGoal} />
			<RenderKinokoBazooka />
			<RenderKinokoRockets kinokoGoal={kinokoGoal} />
		</div>
	);
};

export default BattleField;
