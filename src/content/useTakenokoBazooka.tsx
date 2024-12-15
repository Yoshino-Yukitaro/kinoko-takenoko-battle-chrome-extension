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

const useTakenokoBazooka = () => {
	const [cursorYAxis, setCursorYAxis] = useState(0);
	const [launchStanby, setLaunchStanby] = useState(false);
	const animationFrameIdRef = useRef<number | null>(null);
	const [rockets, setRockets] = useState<TakenokoRocketProps[]>([]);

	const explode = (takenokoRocketId: number) => {
		for (const rocket of rockets) {
			if (rocket.takenokoRocketId === takenokoRocketId) {
				rocket.exploded = true;
			}
		}
		setRockets((rockets) => {
			return rockets.filter(
				(rocket) => rocket.takenokoRocketId !== takenokoRocketId,
			);
		});
	};

	const moveTakenokoCursorYAxis = (direction: "up" | "down", speed: number) => {
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
		moveTakenokoCursorYAxis,
	};
};

export default useTakenokoBazooka;