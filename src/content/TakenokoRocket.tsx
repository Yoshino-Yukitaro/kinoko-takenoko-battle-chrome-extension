import { useCallback, useEffect } from "react";
import ExplosionManager from "./explosionManager";

interface TakenokoRocketProps {
	yAxis: number;
	startTime: number;
	timestamp: number;
	takenokoRocketId: number;
	exploded: boolean;
	explode: (takenokoRocketId: number) => void;
}

const TakenokoRocket = ({
	yAxis,
	startTime,
	timestamp,
	takenokoRocketId,
	exploded,
	explode,
}: TakenokoRocketProps) => {
	const maxWindowWidth = window.innerWidth;
	const explosionManager = ExplosionManager.getInstance();

	const calcXAxis = useCallback(() => {
		const xAxis = (timestamp - startTime) * 0.1;
		if (exploded) {
			return 0;
		}
		if (maxWindowWidth - 20 < xAxis) {
			return maxWindowWidth - 20;
		}
		return xAxis;
	}, [exploded, startTime, timestamp, maxWindowWidth]);

	useEffect(() => {
		if (explosionManager.judge(calcXAxis(), yAxis)) {
			explode(takenokoRocketId);
		}
	}, [calcXAxis, explode, explosionManager, takenokoRocketId, yAxis]);

	return (
		<div
			style={{
				position: "absolute",
				left: `calc(100vw - ${calcXAxis()}px)`,
				top: `${yAxis}px`,
			}}
		>
			あ
		</div>
	);
};

export default TakenokoRocket;
