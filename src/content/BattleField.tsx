import useTalenokoBazooka from "./useTakenokoBazooka";

const BattleField = () => {
	const moveTakenokoBazooka = (e: React.MouseEvent) => {
		takenokoBazookaUpdateCursorYAxis(e.clientY);
	};
	const {
		activate: takenokoBazookaActivate,
		deactivate: takenokoBazookaDeactivate,
		updateCursorYAxis: takenokoBazookaUpdateCursorYAxis,
		RenderTakenokoBazooka,
		RenderTakenokoRockets,
		launchTakenokoRockets,
	} = useTalenokoBazooka();
	const onClickHandler = (e: React.MouseEvent) => {
		launchTakenokoRockets();
	};
	return (
		<div
			style={{
				position: "absolute",
				width: "100vw",
				height: "100vh",
				top: 0,
				left: 0,
				backgroundColor: "rgba(0, 0, 0, 0.5)",
			}}
			onClick={onClickHandler}
			onMouseMove={moveTakenokoBazooka}
		>
			<RenderTakenokoBazooka />
			<RenderTakenokoRockets />
		</div>
	);
};

export default BattleField;
