interface TakenokoRocketProps {
	yAxis: number;
	startTime: number;
	timestamp: number;
}

const TakenokoRocket = ({
	yAxis,
	startTime,
	timestamp,
}: TakenokoRocketProps) => {
	const maxWindowWidth = window.innerWidth;

	const calcXAxis = () => {
		const xAxis = (timestamp - startTime) * 0.1;
		if (maxWindowWidth - 20 < xAxis) {
			return maxWindowWidth - 20;
		}
		return xAxis;
	};

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
