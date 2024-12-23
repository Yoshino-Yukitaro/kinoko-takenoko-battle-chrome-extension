import { useCallback, useEffect, useRef, useState } from "react";
import LimitBoard from "./LimitBoard";

const useLimitBoard = () => {
	const [startTimeStamp, setStartTimeStamp] = useState(0);
	const [nowTimeStamp, setNowTimeStamp] = useState(0);
	const [isStart, setIsStart] = useState(false);
	const animationFrameIdRef = useRef<number | null>(null);
	const LIMIT = 60000;

	const loop = useCallback(
		(timestamp: number) => {
			animationFrameIdRef.current = requestAnimationFrame(loop);
			if (!isStart) return;
			setNowTimeStamp(timestamp);

			if (startTimeStamp === 0) {
				setStartTimeStamp(timestamp);
				return;
			}
			if (timestamp - startTimeStamp > LIMIT) {
				setIsStart(false);
				setStartTimeStamp(timestamp);
			}
		},
		[startTimeStamp, isStart],
	);

	useEffect(() => {
		animationFrameIdRef.current = requestAnimationFrame(loop);
		return () => {
			cancelAnimationFrame(animationFrameIdRef.current as number);
		};
	}, [loop]);

	const start = useCallback(() => {
		setStartTimeStamp(0);
		setIsStart(true);
	}, []);

	const RenderLimitBoard = () => {
		return (
			<LimitBoard limitMiliSec={LIMIT - (nowTimeStamp - startTimeStamp)} />
		);
	};

	return { start, RenderLimitBoard };
};

export default useLimitBoard;
