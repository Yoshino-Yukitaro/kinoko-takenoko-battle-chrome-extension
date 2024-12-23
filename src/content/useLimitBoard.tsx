import { useCallback, useEffect, useRef, useState } from "react";
import LimitBoard from "./LimitBoard";

const useLimitBoard = () => {
	const [startTimeStamp, setStartTimeStamp] = useState(0);
	const [nowTimeStamp, setNowTimeStamp] = useState(0);
	const [isStart, setIsStart] = useState(false);
	const animationFrameIdRef = useRef<number | null>(null);

	const loop = useCallback(
		(timestamp: number) => {
			animationFrameIdRef.current = requestAnimationFrame(loop);
			if (!isStart) return;
			setNowTimeStamp(timestamp);

			if (startTimeStamp === 0) {
				setStartTimeStamp(timestamp);
				return;
			}
			if (timestamp - startTimeStamp > 30000) {
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

	const start = () => {
		setStartTimeStamp(0);
		setIsStart(true);
	};

	const RenderLimitBoard = () => {
		return (
			<LimitBoard limitMiliSec={30000 - (nowTimeStamp - startTimeStamp)} />
		);
	};

	return { start, RenderLimitBoard };
};

export default useLimitBoard;
