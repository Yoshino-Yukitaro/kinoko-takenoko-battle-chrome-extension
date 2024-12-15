import { useCallback, useEffect, useRef, useState } from "react";
import KinokoBazooka from "./KinokoBazooka";
import KinokoRockets from "./KinokoRockets";

interface KinokoRocketProps {
	kinokoRocketId: number;
	yAxis: number;
	startTime: number;
	timestamp: number;
	exploded: boolean;
}

const useKinokoBazooka = () => {
	const [cursorYAxis, setCursorYAxis] = useState(0);
	const [launchStanby, setLaunchStanby] = useState(false);
	const animationFrameIdRef = useRef<number | null>(null);
	const [rockets, setRockets] = useState<KinokoRocketProps[]>([]);

	const explode = (kinokoRocketId: number) => {
		for (const rocket of rockets) {
			if (rocket.kinokoRocketId === kinokoRocketId) {
				rocket.exploded = true;
			}
		}
		setRockets((rockets) => {
			return rockets.filter(
				(rocket) => rocket.kinokoRocketId !== kinokoRocketId,
			);
		});
	};

	const moveKinokoCursorYAxis = (direction: "up" | "down", speed: number) => {
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
						kinokoRocketId: rocketId,
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

	const RenderKinokoBazooka = () => {
		return <KinokoBazooka yAxis={cursorYAxis} />;
	};

	const RenderKinokoRockets = () => {
		return <KinokoRockets kinokoRockets={rockets} explode={explode} />;
	};

	const launchKinokoRockets = () => {
		setLaunchStanby(true);
	};

	return {
		RenderKinokoBazooka,
		RenderKinokoRockets,
		launchKinokoRockets,
		moveKinokoCursorYAxis,
	};
};

export default useKinokoBazooka;
