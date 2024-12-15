import TakenokoRocket from "./TakenokoRocket";

interface TakenokoRocketProps {
	yAxis: number;
	startTime: number;
	timestamp: number;
	takenokoRocketId: number;
	exploded: boolean;
}

interface TakenokoRocketsProps {
	takenokoRockets: TakenokoRocketProps[];
	explode: (takenokoRocketId: number) => void;
	goal: (takenokoRocketId: number) => void;
}

const TakenokoRockets = ({
	takenokoRockets,
	explode,
	goal,
}: TakenokoRocketsProps) => {
	return (
		<>
			{takenokoRockets.map(
				({ yAxis, startTime, timestamp, exploded, takenokoRocketId }) => {
					return (
						<TakenokoRocket
							key={takenokoRocketId}
							yAxis={yAxis}
							startTime={startTime}
							timestamp={timestamp}
							takenokoRocketId={takenokoRocketId}
							exploded={exploded}
							explode={explode}
							goal={goal}
						/>
					);
				},
			)}
		</>
	);
};

export default TakenokoRockets;
