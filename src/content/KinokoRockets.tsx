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
}

const KinokoRockets = ({ kinokoRockets, explode }: KinokoRocketsProps) => {
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
						/>
					);
				},
			)}
		</>
	);
};

export default KinokoRockets;
