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
	const [cursorYAxis, setCursorYAxis] = useState(window.innerHeight / 2);
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
			setCursorYAxis(
				(cursorYAxis) =>
					cursorYAxis - speed > 100 ? cursorYAxis - speed : 100, // ウインドウに到達するとフリーズするので、100px以上に設定
			);
		}
		if (direction === "down") {
			setCursorYAxis((cursorYAxis) =>
				cursorYAxis + speed < window.innerHeight - 40
					? cursorYAxis + speed
					: window.innerHeight - 40,
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

	const RenderTakenokoRockets = ({
		takenokoGoal,
	}: { takenokoGoal: (takenokoRocketId: number) => void }) => {
		const goal = (takenokoRocketId: number) => {
			takenokoGoal(takenokoRocketId);
			setRockets((rockets) => {
				return rockets.filter(
					(rocket) => rocket.takenokoRocketId !== takenokoRocketId,
				);
			});
		};
		return (
			<TakenokoRockets
				takenokoRockets={rockets}
				explode={explode}
				goal={goal}
			/>
		);
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
