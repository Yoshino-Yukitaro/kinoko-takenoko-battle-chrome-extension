import { useCallback, useEffect, useRef, useState } from "react";
import TakenokoBazooka from "./TakenokoBazooka";
import TakenokoRockets from "./TakenokoRockets";

interface TakenokoRocketProps {
	takenokoRocketId: number;
	yAxis: number;
	startTime: number;
	timestamp: number;
	exploded: boolean;
}

const useTalenokoBazooka = () => {
	const [cursorYAxis, setCursorYAxis] = useState(0);
	const [launchStanby, setLaunchStanby] = useState(false);
	const animationFrameIdRef = useRef<number | null>(null);
	const [rockets, setRockets] = useState<TakenokoRocketProps[]>([]);

	const explode = (takenokoRocketId: number) => {
		console.log("呼ばれた");
		console.log(`takenokoRocketId: ${takenokoRocketId}`);
		for (const rocket of rockets) {
			console.log(`rocket.takenokoRocketId: ${rocket.takenokoRocketId}`);
			if (rocket.takenokoRocketId === takenokoRocketId) {
				rocket.exploded = true;
				console.log("あった！！！！！");
			}
		}
		setRockets((rockets) => {
			return rockets.filter(
				(rocket) => rocket.takenokoRocketId !== takenokoRocketId,
			);
		});
	};

	const moveCursorYAxis = (direction: "up" | "down", speed: number) => {
		if (direction === "up") {
			setCursorYAxis((cursorYAxis) =>
				cursorYAxis - speed > 0 ? cursorYAxis - speed : 0,
			);
		}
		if (direction === "down") {
			setCursorYAxis((cursorYAxis) =>
				cursorYAxis + speed < window.innerHeight
					? cursorYAxis + speed
					: window.innerHeight,
			);
		}
	};

	const loop = useCallback(
		(timestamp: number) => {
			animationFrameIdRef.current = requestAnimationFrame(loop);

			if (launchStanby) {
				setLaunchStanby(false);
				const rocketId = Math.random();
				console.log(`rocketId: ${rocketId}`);
				console.log(`rockets num: ${rockets.length}`);
				setRockets([
					...rockets,
					{
						yAxis: cursorYAxis,
						startTime: timestamp,
						timestamp,
						takenokoRocketId: rocketId,
						exploded: false,
					},
				]);
			}
			setRockets((rockets) => {
				return rockets.map((rocket) => {
					return { ...rocket, timestamp };
				});
			});
		},
		[cursorYAxis, launchStanby, rockets],
	);

	useEffect(() => {
		animationFrameIdRef.current = requestAnimationFrame(loop);
		return () => cancelAnimationFrame(animationFrameIdRef.current as number);
	}, [loop]);

	const RenderTakenokoBazooka = () => {
		return <TakenokoBazooka yAxis={cursorYAxis} />;
	};

	const RenderTakenokoRockets = () => {
		return <TakenokoRockets takenokoRockets={rockets} explode={explode} />;
	};

	const launchTakenokoRockets = () => {
		setLaunchStanby(true);
	};

	return {
		RenderTakenokoBazooka,
		RenderTakenokoRockets,
		launchTakenokoRockets,
		moveCursorYAxis,
	};
};

export default useTalenokoBazooka;
