import KinokoRocket from "./KinokoRocket";

interface KinokoRocketProps {
	yAxis: number;
	startTime: number;
	timestamp: number;
	kinokoRocketId: number;
	exploded: boolean;
}

interface KinokoRocketsProps {
	kinokoRockets: KinokoRocketProps[];
	explode: (kinokoRocketId: number) => void;
	goal: (kinokoRocketId: number) => void;
}

const KinokoRockets = ({
	kinokoRockets,
	explode,
	goal,
}: KinokoRocketsProps) => {
	return (
		<>
			{kinokoRockets.map(
				({ yAxis, startTime, timestamp, exploded, kinokoRocketId }) => {
					return (
						<KinokoRocket
							key={kinokoRocketId}
							yAxis={yAxis}
							startTime={startTime}
							timestamp={timestamp}
							kinokoRocketId={kinokoRocketId}
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

export default KinokoRockets;
