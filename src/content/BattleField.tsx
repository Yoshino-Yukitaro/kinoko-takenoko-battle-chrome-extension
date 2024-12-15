import { useState } from "react";
import type { KeyboardEvent } from "react";
import useTakenokoBazooka from "./useTakenokoBazooka";
import useKinokoBazooka from "./useKinokoBazooka";

const BattleField = () => {
	const [active, setActive] = useState(true);
	const [takenokoBazookaSpeed, setTakenokoBazookaSpeed] = useState(10);
	const [kinokoBazookaSpeed, setKinokoBazookaSpeed] = useState(10);
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

	const keyDownHandler = (e: KeyboardEvent<HTMLDivElement>) => {
		if (!active) return;
		if (e.key === "Tab") {
			e.preventDefault();
		}

		// たけのこの操作
		if (e.key === "ArrowUp") {
			e.preventDefault();
			moveTakenokoCursorYAxis("up", takenokoBazookaSpeed);
			setTakenokoBazookaSpeed(takenokoBazookaSpeed + 1);
		}
		if (e.key === "ArrowDown") {
			e.preventDefault();
			moveTakenokoCursorYAxis("down", takenokoBazookaSpeed);
			setTakenokoBazookaSpeed(takenokoBazookaSpeed + 1);
		}
		if (e.key === "ArrowLeft") {
			e.preventDefault();
			launchTakenokoRockets();
		}

		// きのこの操作
		if (e.key === "w") {
			e.preventDefault();
			moveKinokoCursorYAxis("up", kinokoBazookaSpeed);
			setKinokoBazookaSpeed(kinokoBazookaSpeed + 1);
		}
		if (e.key === "s") {
			e.preventDefault();
			moveKinokoCursorYAxis("down", kinokoBazookaSpeed);
			setKinokoBazookaSpeed(kinokoBazookaSpeed + 1);
		}
		if (e.key === "d") {
			e.preventDefault();
			launchKinokoRockets();
		}
	};

	const keyUpHandler = (e: KeyboardEvent<HTMLDivElement>) => {
		if (e.key === "ArrowUp" || e.key === "ArrowDown") {
			setTakenokoBazookaSpeed(10);
		}
		if (e.key === "w" || e.key === "s") {
			setKinokoBazookaSpeed(10);
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
				backgroundColor: "rgba(0, 0, 0, 0.5)",
			}}
			onKeyDown={keyDownHandler}
			onKeyUp={keyUpHandler}
			tabIndex={1}
		>
			<RenderTakenokoBazooka />
			<RenderTakenokoRockets />
			<RenderKinokoBazooka />
			<RenderKinokoRockets />
		</div>
	);
};

export default BattleField;
