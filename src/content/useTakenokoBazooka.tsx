import { useCallback, useEffect, useRef, useState } from "react";
import TakenokoBazooka from "./TakenokoBazooka";
import TakenokoRockets from "./TakenokoRockets";

interface TakenokoRocketProps {
	yAxis: number;
	startTime: number;
	timestamp: number;
}

const useTalenokoBazooka = () => {
	const [active, setActive] = useState(true);
	const [cursorYAxis, setCursorYAxis] = useState(0);
	const [launchStanby, setLaunchStanby] = useState(false);
	const animationFrameIdRef = useRef<number | null>(null);
	const [rockets, setRockets] = useState<TakenokoRocketProps[]>([]);

	const loop = useCallback(
		(timestamp: number) => {
			animationFrameIdRef.current = requestAnimationFrame(loop);
			if (launchStanby) {
				setLaunchStanby(false);
				setRockets([
					...rockets,
					{ yAxis: cursorYAxis, startTime: timestamp, timestamp },
				]);
			}
			setRockets((rockets) => {
				return rockets.map((rocket) => {
					return { ...rocket, timestamp };
				});
			});
			console.log(rockets);
			console.log(
				rockets.map((rocket) => (rocket.timestamp - rocket.startTime) * 0.01),
			);
		},
		[cursorYAxis, launchStanby, rockets],
	);

	useEffect(() => {
		animationFrameIdRef.current = requestAnimationFrame(loop);
		return () => cancelAnimationFrame(animationFrameIdRef.current as number);
	}, [loop]);

	const activate = () => setActive(true);
	const deactivate = () => setActive(false);
	const updateCursorYAxis = (y: number) => {
		if (active) {
			setCursorYAxis(y);
		}
	};
	const RenderTakenokoBazooka = () => {
		return <TakenokoBazooka yAxis={cursorYAxis} />;
	};

	const RenderTakenokoRockets = () => {
		return <TakenokoRockets takenokoRockets={rockets} />;
	};

	const launchTakenokoRockets = () => {
		setLaunchStanby(true);
	};

	return {
		activate,
		deactivate,
		updateCursorYAxis,
		RenderTakenokoBazooka,
		RenderTakenokoRockets,
		launchTakenokoRockets,
	};
};

export default useTalenokoBazooka;
