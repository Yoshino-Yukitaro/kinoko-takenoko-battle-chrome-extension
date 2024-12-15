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
		if (explosionManager.judge(calcXAxis(), yAxis, "takenoko")) {
			explode(takenokoRocketId);
		}
	}, [calcXAxis, explode, explosionManager, takenokoRocketId, yAxis]);

	return (
		<div
			style={{
				position: "absolute",
				left: `calc(100vw - ${calcXAxis() + 80}px)`,
				top: `${yAxis}px`,
				backgroundColor: "#F4D386",
				width: "80px",
				height: "40px",
				clipPath: "ellipse(70px 20px at 100% 50%)",
			}}
		>
			<div
				style={{
					position: "absolute",
					top: "0",
					left: "0%",
					backgroundColor: "#392921",
					width: "70px",
					height: "40px",
					paddingLeft: "20px",
				}}
			/>
		</div>
	);
};

export default TakenokoRocket;
