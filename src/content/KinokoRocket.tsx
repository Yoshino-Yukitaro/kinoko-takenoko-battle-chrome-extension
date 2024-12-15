import { useCallback, useEffect } from "react";
import ExplosionManager from "./explosionManager";

interface KinokoRocketProps {
	yAxis: number;
	startTime: number;
	timestamp: number;
	kinokoRocketId: number;
	exploded: boolean;
	explode: (kinokoRocketId: number) => void;
}

const KinokoRocket = ({
	yAxis,
	startTime,
	timestamp,
	kinokoRocketId,
	exploded,
	explode,
}: KinokoRocketProps) => {
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
		if (explosionManager.judge(calcXAxis() + 80, yAxis, "kinoko")) {
			explode(kinokoRocketId);
		}
	}, [calcXAxis, explode, explosionManager, kinokoRocketId, yAxis]);

	return (
		<div
			style={{
				position: "absolute",
				left: `${calcXAxis()}px`,
				top: `${yAxis}px`,
				width: "80px",
				height: "40px",
			}}
		>
			<div
				style={{
					position: "absolute",
					top: "0",
					left: "0%",
					backgroundColor: "#F4D386",
					width: "70px",
					height: "15px",
					borderRadius: "16px",
				}}
			>
				<div
					style={{
						position: "absolute",
						top: "-12.5px",
						left: "40px",
						backgroundColor: "#392921",
						width: "30px",
						height: "40px",
						clipPath: "ellipse(40px 23px at -30% 50%)",
					}}
				/>
			</div>
		</div>
	);
};

export default KinokoRocket;
