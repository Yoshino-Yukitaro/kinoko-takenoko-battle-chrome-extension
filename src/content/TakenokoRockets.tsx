import TakenokoRocket from "./TakenokoRocket";

interface TakenokoRocketProps {
	yAxis: number;
	startTime: number;
	timestamp: number;
}

interface TakenokoRocketsProps {
	takenokoRockets: TakenokoRocketProps[];
}

const TakenokoRockets = ({ takenokoRockets }: TakenokoRocketsProps) => {
	return (
		<>
			{takenokoRockets.map(({ yAxis, startTime, timestamp }) => {
				return (
					<TakenokoRocket
						key={startTime}
						yAxis={yAxis}
						startTime={startTime}
						timestamp={timestamp}
					/>
				);
			})}
		</>
	);
};

export default TakenokoRockets;
