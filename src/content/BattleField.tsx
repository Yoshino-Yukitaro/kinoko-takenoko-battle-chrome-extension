import { useState } from "react";
import type { KeyboardEvent } from "react";
import useTalenokoBazooka from "./useTakenokoBazooka";

const BattleField = () => {
	const [active, setActive] = useState(true);
	const [speed, setSpeed] = useState(10);
	const {
		RenderTakenokoBazooka,
		RenderTakenokoRockets,
		launchTakenokoRockets,
		moveCursorYAxis,
	} = useTalenokoBazooka();

	const keyDownHandler = (e: KeyboardEvent<HTMLDivElement>) => {
		if (!active) return;
		if (e.key === "Tab") {
			e.preventDefault();
		}
		if (e.key === "ArrowUp") {
			e.preventDefault();
			moveCursorYAxis("up", speed);
			setSpeed(speed + 1);
		}
		if (e.key === "ArrowDown") {
			e.preventDefault();
			moveCursorYAxis("down", speed);
			setSpeed(speed + 1);
		}
		if (e.key === "ArrowLeft") {
			launchTakenokoRockets();
		}
	};

	const keyUpHandler = (e: KeyboardEvent<HTMLDivElement>) => {
		if (e.key === "ArrowUp" || e.key === "ArrowDown") {
			setSpeed(10);
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
		</div>
	);
};

export default BattleField;
